#define _POSIX_C_SOURCE 200809L
#include "paper_app.h"
#include "paper_wasm.h"
#include "sd_host.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#ifdef MEDSCRIBE_INTERACTIVE
#include <SDL.h>
#endif

#define CHECK(x) do { if (!(x)) { fprintf(stderr,"CHECK %s:%d: %s\n",__FILE__,__LINE__,#x); exit(1); } } while (0)
static bk_board *board;
static paper_os *os;
static paper_sd_store *store;
static unsigned char frame[200 * 200];
static paper_companion_status companion = {.available=true,.card_ready=true,.card_pages=1};

static bool companion_read(void *ctx, paper_companion_status *out) { (void)ctx; *out=companion; return true; }
static bool card(void *ctx,unsigned page,char *out,unsigned cap) {
    (void)ctx;
    if(page)return false;
    snprintf(out,cap,"Alex Morgan\n# Allergies\nPenicillin - hives\nLatex - skin rash\n# Medications\nBudesonide inhaler\nNext dose: Oct 15 at 8:00 PM\nAlbuterol inhaler - as needed\nNo scheduled dose\n# Conditions\nAsthma; osteoarthritis\n# Care contact\nJamie Morgan - family caregiver\n(617) 555-0142\n# What helps me\nWalking aid. Time to answer.\nSpeak directly. Written next steps.\n# My care team\nDr. Jordan Lee - primary care\n(617) 555-0168");
    return true;
}
static bk_result command(void *ctx,paper_companion_command op) {
    (void)ctx;
    if(op==PAPER_COMPANION_START){companion.recording=true;companion.seconds=74;}
    if(op==PAPER_COMPANION_STOP){companion.recording=false;companion.recordings++;}
    return BK_OK;
}
static void flush(lv_display_t *display,const lv_area_t *area,uint8_t *pixels) {
    const uint16_t *src=(const uint16_t *)pixels;
    int width=lv_display_get_horizontal_resolution(display);
    for(int y=area->y1;y<=area->y2;y++)for(int x=area->x1;x<=area->x2;x++){
        uint16_t c=*src++;
        CHECK(x>=0&&x<200&&y>=0&&y<200);
        frame[y*width+x]=(((c>>11)&31)*60+((c>>5)&63)*59+(c&31)*22)>=3129?255:0;
    }
    lv_display_flush_ready(display);
}
static void advance(unsigned ms) {
    for(unsigned i=0;i<ms;i+=20){
        paper_sd_store_work_at(store,true,bk_get_stats(board).time_ms);
        paper_os_advance(os,20);
        struct timespec pause={0,1000000};nanosleep(&pause,NULL);
        paper_sd_store_work_at(store,true,bk_get_stats(board).time_ms);
    }
}
static lv_obj_t *named(lv_obj_t *o,const char *text) {
    if(lv_obj_check_type(o,&lv_button_class)&&lv_obj_get_user_data(o)&&!strcmp(lv_obj_get_user_data(o),text))return o;
    if(lv_obj_check_type(o,&lv_label_class)&&!strcmp(lv_label_get_text(o),text))return o;
    for(unsigned i=0;i<lv_obj_get_child_count(o);i++){lv_obj_t *found=named(lv_obj_get_child(o,i),text);if(found)return found;}
    return NULL;
}
static void dump(lv_obj_t *o) {
    if(lv_obj_check_type(o,&lv_label_class))fprintf(stderr,"UI: %s\n",lv_label_get_text(o));
    for(unsigned i=0;i<lv_obj_get_child_count(o);i++)dump(lv_obj_get_child(o,i));
}
static void settle(void) { advance(400);for(unsigned i=0;i<500&&paper_wasm_pending();i++)advance(20);CHECK(!paper_wasm_pending()); }
static void choose(const char *text) {
    settle();lv_obj_t *o=named(lv_screen_active(),text);
    if(!o)fprintf(stderr,"Missing %s\n",text);
    CHECK(o);
    while(o&&!lv_obj_check_type(o,&lv_button_class))o=lv_obj_get_parent(o);
    CHECK(o&&!lv_obj_has_state(o,LV_STATE_DISABLED));
    lv_group_focus_obj(o);CHECK(paper_os_input(os,BK_SELECT)==BK_OK);settle();
}
static void capture(const char *directory,const char *name) {
    settle();lv_obj_invalidate(lv_screen_active());paper_os_redraw(os);advance(100);
    char path[1024];snprintf(path,sizeof path,"%s/screen-%s.pgm",directory,name);
    FILE *f=fopen(path,"wb");CHECK(f);fprintf(f,"P5\n200 200\n255\n");CHECK(fwrite(frame,1,sizeof frame,f)==sizeof frame);CHECK(fclose(f)==0);
}
#ifdef MEDSCRIBE_INTERACTIVE
static void interactive(void) {
    if(!named(lv_screen_active(),"Know Me"))dump(lv_screen_active());CHECK(named(lv_screen_active(),"Know Me"));
    CHECK(SDL_Init(SDL_INIT_VIDEO|SDL_INIT_TIMER)==0);
    SDL_Window *window=SDL_CreateWindow("Medscribe pendant - hold Enter: help; Down: next",SDL_WINDOWPOS_CENTERED,SDL_WINDOWPOS_CENTERED,200,200,SDL_WINDOW_ALLOW_HIGHDPI);
    CHECK(window);
    SDL_Renderer *renderer=SDL_CreateRenderer(window,-1,SDL_RENDERER_ACCELERATED|SDL_RENDERER_PRESENTVSYNC);
    if(!renderer)renderer=SDL_CreateRenderer(window,-1,SDL_RENDERER_SOFTWARE);
    CHECK(renderer);
    SDL_Texture *texture=SDL_CreateTexture(renderer,SDL_PIXELFORMAT_ARGB8888,SDL_TEXTUREACCESS_STREAMING,200,200);CHECK(texture);
    uint32_t *pixels=malloc(200*200*sizeof *pixels);CHECK(pixels);
    uint32_t select_start=0;bool select_held=false;
    bool running=true;
    while(running){
        SDL_Event event;
        while(SDL_PollEvent(&event)){
            if(event.type==SDL_QUIT)running=false;
            if(event.type==SDL_KEYUP && event.key.keysym.sym==SDLK_RETURN)select_start=0;
            if(event.type==SDL_KEYDOWN&&!event.key.repeat){
                if(event.key.keysym.sym==SDLK_RETURN){select_start=SDL_GetTicks();select_held=false;}
                bk_input key;
                switch(event.key.keysym.sym){
                    case SDLK_UP:key=BK_UP;break;case SDLK_DOWN:key=BK_DOWN;break;
                    case SDLK_RETURN:key=BK_SELECT;break;case SDLK_ESCAPE:key=BK_BACK;break;
                    default:continue;
                }
                paper_os_input(os,key);
            }
        }
        advance(20);
        if(select_start&&!select_held&&SDL_GetTicks()-select_start>=800){paper_os_input(os,BK_SELECT_HOLD);select_held=true;settle();}
        for(unsigned i=0;i<200*200;i++)pixels[i]=0xff000000u|((uint32_t)frame[i]*0x010101u);
        SDL_UpdateTexture(texture,NULL,pixels,200*sizeof *pixels);
        SDL_RenderClear(renderer);SDL_RenderCopy(renderer,texture,NULL,NULL);SDL_RenderPresent(renderer);SDL_Delay(16);
    }
    free(pixels);SDL_DestroyTexture(texture);SDL_DestroyRenderer(renderer);SDL_DestroyWindow(window);SDL_Quit();
}
#endif
int main(int argc,char **argv) {
    const char *sd_directory,*output_directory;
#ifdef MEDSCRIBE_INTERACTIVE
    sd_directory=argc>1?argv[1]:MEDSCRIBE_DEFAULT_SD_DIR;
    output_directory=argc>2?argv[2]:MEDSCRIBE_DEFAULT_OUT_DIR;
#else
    CHECK(argc==3);sd_directory=argv[1];output_directory=argv[2];
#endif
    board=bk_create(bk_default_config());CHECK(board);bk_set_instant_refresh(board,true);
    store=bk_alloc(board,BK_PSRAM,sizeof *store);CHECK(store);
    paper_sd_store_init(store,sd_directory,NULL,NULL,NULL);paper_sd_store_work(store,true);
    paper_sim_services fixture;paper_services services=paper_sim_services_init(&fixture,board);
    paper_service_ops ops=*services.ops;paper_sd_host_bind(&ops,&fixture,store);services.ops=&ops;
    ops.companion_read=companion_read;ops.companion_card_page=card;ops.companion_command=command;
    paper_datetime date={2026,10,15,10,24,0};CHECK(ops.calendar_write(services.context,&date)==BK_OK);
    os=paper_os_create_with_services(board,&services);CHECK(os);advance(1200);
    lv_display_set_resolution(lv_display_get_default(),200,200);
    lv_display_set_flush_cb(lv_display_get_default(),flush);advance(100);
    fprintf(stderr,"Catalog count=%u message=%s\n",store->status.count,store->status.message);
    CHECK(store->status.count==1);
    choose("All apps");choose("Medscribe");
    CHECK(store->status.loaded==1&&store->status.module_bytes>0);
    CHECK(named(lv_screen_active(),"Know Me"));CHECK(named(lv_screen_active(),"Alex Morgan"));
    capture(output_directory,"card");
    const char *titles[]={"Medications","Care contacts","What helps me","Conditions"};
    const char *names[]={"medications","contacts","preferences","conditions"};
    for(unsigned i=0;i<4;i++){
        CHECK(paper_os_input(os,BK_DOWN)==BK_OK);settle();
        CHECK(named(lv_screen_active(),titles[i]));capture(output_directory,names[i]);
    }
    CHECK(paper_os_input(os,BK_DOWN)==BK_OK);settle();CHECK(named(lv_screen_active(),"Alex Morgan"));
    CHECK(paper_os_input(os,BK_SELECT)==BK_OK);settle();CHECK(!named(lv_screen_active(),"Caregiver help"));
    CHECK(paper_os_input(os,BK_SELECT_HOLD)==BK_OK);settle();CHECK(named(lv_screen_active(),"Caregiver help"));
    CHECK(named(lv_screen_active(),"Waiting for phone"));capture(output_directory,"request");
    CHECK(paper_os_input(os,BK_DOWN)==BK_OK);settle();CHECK(named(lv_screen_active(),"Waiting for phone"));
    CHECK(paper_os_input(os,BK_SELECT)==BK_OK);settle();CHECK(named(lv_screen_active(),"Alex Morgan"));
    /* Cancelling help returns to the same card page, including after a hold. */
    CHECK(paper_os_input(os,BK_DOWN)==BK_OK);settle();
    CHECK(paper_os_input(os,BK_SELECT_HOLD)==BK_OK);settle();
    CHECK(paper_os_input(os,BK_SELECT)==BK_OK);settle();CHECK(named(lv_screen_active(),"Medications"));
    for(unsigned i=0;i<4;i++){CHECK(paper_os_input(os,BK_DOWN)==BK_OK);settle();}
    CHECK(named(lv_screen_active(),"Alex Morgan"));
    printf("PASS: real 200x200 SD app; five pages, wrap, upper help hold/cancel, lower next, pending guard, restored page. No delivery transport.\n");
#ifdef MEDSCRIBE_INTERACTIVE
    if(argc==1||(argc==4&&!strcmp(argv[3],"--interactive")))interactive();
#endif
    paper_os_destroy(os);bk_destroy(board);return 0;
}
