/* Standalone Medscribe SD/Wasm app using the real paperOS public SDK. */
#include "paper_ui_components.h"
#include <string.h>
#include "logo.h"
#include "timer-font.h"

enum { HOME, CARD, CONNECT, PAIRING };
enum { RECORD=1, STOP, OPEN_CARD, OPEN_PHONE, BACK, NEXT, PREVIOUS, SHOW_QR };
static unsigned page = CARD, card_page, record_handle;
static paper_sdk_companion_status companion;
static paper_recording_result recording;
static char notice[96];
static unsigned wave_step;

/* Use native SDK bitmap fonts and measured controls at a larger size. */
static void text(paper_stack *s,const char *value,unsigned font) {
    int32_t size[2]={0};
    int width=s->width-28;
    paper_widget(34,0,(int)(uintptr_t)value,font,width,(int)(uintptr_t)size);
    paper_text_block(value,s->x+14,s->y,width,size[1],font);
    s->y+=size[1]+s->gap;
}
static void button(paper_stack *s,const char *label,int action,int enabled,paper_icon_symbol icon) {
    int y=s->y;
    int handle=paper_stack_control(s,label,action,enabled,1);
    if(!handle)return;
    int label_handle=paper_widget(11,handle,0,0,0,0);
    paper_widget(10,label_handle,6,PAPER_FONT_LARGE,0,0);
    paper_widget(9,label_handle,-2,-1,0,0);
    paper_widget(9,handle,-2,88,0,0);
    paper_widget(31,handle,icon,0,0,0);
    s->y=y+paper_widget(15,handle,0,0,0,0)+s->gap;
}
static void card_logo(int x,int y) {
    for(unsigned i=0;i<sizeof logo_spans/sizeof logo_spans[0];i++) {
        int span=paper_widget(1,1,0,0,0,0);
        paper_widget(19,span,0,0,0,0);
        paper_widget(8,span,x+logo_spans[i][0],y+logo_spans[i][1],0,0);
        paper_widget(9,span,logo_spans[i][2],1,0,0);
        paper_widget(10,span,0,0,0,0);
        paper_widget(10,span,1,255,0,0);
    }
}
/* Regular outline-font glyphs rasterized directly at their display size.
   Fixed ABI tiles overlap only whitespace and draw in reading order. */
static void large_timer(paper_stack *s,const char *value) {
    int x=s->x+14;
    for(const char *c=value;*c;c++) {
        if((*c<'0'||*c>'9')&&*c!=':')continue;
        unsigned glyph=*c==':'?10:*c-'0';
        int image=paper_widget(4,1,0,0,0,0);
        paper_widget(29,image,(int)(uintptr_t)timer_images[glyph],PAPER_READER_COVER_BYTES,120,180);
        paper_widget(8,image,x,s->y,0,0);
        x+=timer_advances[glyph];
    }
    s->y+=90;
}
/* Companion card pages remain plain UTF-8. Optional # section lines add
   hierarchy; legacy unstructured pages still render without dropping content. */
static void card_content(paper_stack *s,char *content) {
    char *line=content;
    int first=1, panel=0, panel_y=0;
    while(*line) {
        char *end=line;while(*end && *end!='\n')end++;if(!*end)end=0;
        if(end)*end=0;
        if(line[0]=='#' && line[1]==' ') {
            if(panel) paper_widget(9,panel,s->width,s->y-panel_y+6,0,0);
            paper_stack_gap(s,10);
            panel_y=s->y;
            panel=paper_widget(1,1,0,0,0,0);
            paper_widget(19,panel,0,0,0,0);
            paper_widget(8,panel,s->x,panel_y,0,0);
            paper_widget(10,panel,1,0,0,0);
            paper_widget(10,panel,3,1,0,0);
            paper_widget(10,panel,4,10,0,0);
            s->y+=7;
            int gap=s->gap;s->gap=4;
            char heading[64];unsigned i=0;
            for(;line[i+2] && i<sizeof heading-1;i++) {
                char c=line[i+2];heading[i]=(c>='a' && c<='z')?c-'a'+'A':c;
            }
            heading[i]=0;
            paper_icon(!strcmp(heading,"ALLERGIES")?PAPER_ICON_BLOCKS:
                       !strcmp(heading,"MEDICATIONS")?PAPER_ICON_PLUS:
                       !strcmp(heading,"CONDITIONS")?PAPER_ICON_NOTE:
                       !strcmp(heading,"CARE CONTACT")?PAPER_ICON_PHONE:
                       !strcmp(heading,"WHAT HELPS ME")?PAPER_ICON_SMILE:PAPER_ICON_CARD,
                       s->x+14,s->y+2,20);
            paper_text_block(heading,s->x+44,s->y,s->width-58,28,PAPER_FONT_TITLE);
            s->y+=28+s->gap;
            s->gap=gap;
        } else if(*line) {
            int gap=s->gap;s->gap=0;
            if(first) {
                int32_t size[2]={0};int width=s->width-28;
                paper_widget(34,0,(int)(uintptr_t)line,PAPER_FONT_LARGE,width,(int)(uintptr_t)size);
                paper_text_block(line,s->x+14+(width-size[0])/2,s->y,size[0],size[1],PAPER_FONT_LARGE);
                s->y+=size[1]+s->gap;
            } else text(s,line,PAPER_FONT_TITLE);
            s->gap=gap;
        } else paper_stack_gap(s,8);
        first=0;
        if(!end)break;
        line=end+1;
    }
    if(panel) paper_widget(9,panel,s->width,s->y-panel_y+6,0,0);
}
#ifdef MEDSCRIBE_WAVEFORM_DEMO
/* Demonstration data only. Never presented as measured microphone amplitude. */
static void waveform(paper_stack *s) {
    static const unsigned levels[]={12,18,10,26,42,20,56,76,44,92,66,35,50,24,16,30,62,88,54,38,72,100,58,32,18,46,68,40,22,12,34,60,84,48,70,96,52,28,42,20,10,24,50,74,44,30,16,8};
    int pitch=(s->width-28)/48, start=s->x+14;
    for(unsigned i=0;i<48;i++) {
        int height=(int)levels[(i+wave_step)%48];
        int bar=paper_widget(1,1,0,0,0,0);
        paper_widget(19,bar,0,0,0,0);
        paper_widget(8,bar,start+(int)i*pitch,s->y+(112-height)/2,0,0);
        paper_widget(9,bar,pitch>5?4:2,height,0,0);
        paper_widget(10,bar,0,0,0,0);
        paper_widget(10,bar,1,255,0,0);
        paper_widget(10,bar,4,2,0,0);
    }
    s->y+=132;
}
#endif

PAPER_EXPORT("paper_init") int init(int seed) { (void)seed; return 1; }

PAPER_EXPORT("paper_render") void render(int width, int height) {
    paper_read(PAPER_READ_COMPANION, 0, &companion, sizeof companion);
    paper_recording_status(&recording);
    if(record_handle && recording.session.handle == record_handle && recording.session.state == PAPER_SESSION_DONE) {
        page = CARD; card_page = 0; record_handle = 0;
        strcpy(notice, "Recording saved on this device. Import it into Medscribe to review.");
    }
    bool capturing = record_handle && recording.session.handle == record_handle && paper_session_active(recording.session.state);
    bool fullscreen = page == CARD || capturing;
    paper_mode(PAPER_TOP | (fullscreen ? PAPER_FULLSCREEN : PAPER_CONTENT_ONLY) | (page == CARD ? PAPER_DIRECT : 0));
    height = fullscreen ? paper_fullscreen_height(height) : paper_content_only_height(height);
    paper_stack s = paper_stack_make(width);
    if (page == CARD) {
        s.x = 14; s.width = width-28; s.y = 18;
        char card_text[1024] = {0}, count[24];
        snprintf(count,sizeof count,"%u / %u",card_page+1,companion.card_pages?companion.card_pages:1);
        int32_t title_size[2]={0};
        paper_widget(34,0,(int)(uintptr_t)"Know Me",PAPER_FONT_TITLE,220,(int)(uintptr_t)title_size);
        int brand_width=80+14+title_size[0],brand_x=(width-brand_width)/2;
        card_logo(brand_x,s.y+3);
        paper_text_block("Know Me",brand_x+94,s.y,title_size[0],title_size[1],PAPER_FONT_TITLE);
        if(companion.card_pages>1) paper_text_block(count,s.x+s.width-90,s.y+6,90,30,PAPER_FONT_TITLE);
        s.y+=58;
        paper_read(PAPER_READ_CARD,card_page,card_text,sizeof card_text);
        if(card_text[0]) card_content(&s,card_text);
        else text(&s,"No reviewed card on this device. Send one from the Medscribe app first.",PAPER_FONT_TITLE);
        return;
    }
    if (page == CONNECT || page == PAIRING) {
        text(&s, "Connect to Medscribe", PAPER_FONT_LARGE);
        if (page == PAIRING && companion.qr_visible) {
            paper_pairing_qr(s.x + (s.width - 192) / 2, s.y, 192);
            s.y += 208;
            text(&s, "Show this code privately to your iPhone. Do not photograph or share it.", PAPER_FONT_TITLE);
        } else {
            text(&s, "Open Medscribe on your iPhone, then choose Companion.\n\nImport recordings to review on your phone. Send your reviewed Know Me card back to this screen.", PAPER_FONT_TITLE);
        }
        unsigned actions = paper_actions_begin();
        if (page != PAIRING) button(&s, "Show pairing code", SHOW_QR, !companion.recording && !companion.busy, PAPER_ICON_PHONE);
        button(&s, "Back to Medscribe", BACK, 1, PAPER_ICON_BACK);
        paper_actions_end(actions, height);
        return;
    }
    if(capturing){card_logo(s.x+14,s.y+4);s.y+=48;}
    text(&s, capturing ? "Recording appointment" : "Your appointment companion", PAPER_FONT_LARGE);
    if (capturing) {
        char elapsed[48];
        snprintf(elapsed, sizeof elapsed, "%u:%02u", recording.session.position / 60000, (recording.session.position / 1000) % 60);
        large_timer(&s, elapsed);
#ifdef MEDSCRIBE_WAVEFORM_DEMO
        paper_stack_gap(&s,16);waveform(&s);
#endif
        text(&s, "Stay with the conversation.", PAPER_FONT_TITLE);
    } else text(&s, "Record here.\nReview in the Medscribe app.", PAPER_FONT_TITLE);
    if (notice[0]) text(&s, notice, PAPER_FONT_TITLE);
    unsigned actions = paper_actions_begin();
    paper_recording_device device = {0};
    paper_recording_device_read(&device);
    button(&s, capturing ? "Stop & save" : "Record appointment", capturing ? STOP : RECORD,
        capturing ? recording.session.state == PAPER_SESSION_RUNNING : device.available && !device.busy && !device.recording,
        capturing ? PAPER_ICON_STOP : PAPER_ICON_MIC);
    if(!capturing) {
        button(&s, "Know Me card", OPEN_CARD, 1, PAPER_ICON_CARD);
        button(&s, "Connect to phone", OPEN_PHONE, 1, PAPER_ICON_PHONE);
    }
    paper_actions_end(actions, height);
}

PAPER_EXPORT("paper_action") void action(int a) {
    paper_mode(PAPER_FOCUS);
    notice[0] = 0;
    if (a == RECORD) {
        /* The OS owns consent and persists it before enabling capture. */
        record_handle = paper_recording_start();
        if (!record_handle) strcpy(notice, "Microphone is busy or unavailable. Try again when the device is ready.");
    } else if (a == STOP) {
        if (!paper_recording_control(record_handle, PAPER_SESSION_STOP)) strcpy(notice, "Cannot stop yet. Try again.");
    } else if (a == OPEN_CARD) { page = CARD; card_page = 0; }
    else if (a == OPEN_PHONE) page = CONNECT;
    else if (a == BACK) { if (page == PAIRING) paper_pairing_hide(); page = page == HOME ? CARD : HOME; }
    else if (a == NEXT && card_page + 1 < companion.card_pages) card_page++;
    else if (a == PREVIOUS && card_page) card_page--;
    else if (a == SHOW_QR && paper_pairing_show() == 0) page = PAIRING;
}

PAPER_EXPORT("paper_input") int input(int key) {
    if (page == CARD) {
        if (key == PAPER_INPUT_SELECT) { page = HOME; return 1; }
        if (key == PAPER_INPUT_DOWN || key == PAPER_INPUT_DOWN_HOLD) { action(NEXT); return 1; }
        if (key == PAPER_INPUT_UP || key == PAPER_INPUT_UP_HOLD) { action(PREVIOUS); return 1; }
        return 0;
    }
    if (key == PAPER_INPUT_BACK) { action(BACK); return 1; }
    return 0;
}
PAPER_EXPORT("paper_tick") int tick(int low, int high) {
    (void)high;
    paper_recording_result next = {0};
    paper_sdk_companion_status status = {0};
    paper_recording_status(&next);
    paper_read(PAPER_READ_COMPANION, 0, &status, sizeof status);
    int changed = memcmp(&recording, &next, sizeof next) || memcmp(&companion, &status, sizeof status);
#ifdef MEDSCRIBE_WAVEFORM_DEMO
    if(next.session.state==PAPER_SESSION_RUNNING && wave_step != (unsigned)low/1000%48) {
        wave_step=(unsigned)low/1000%48;changed=1;
    }
#else
    (void)low;
#endif
    if (record_handle && next.session.handle == record_handle && next.session.state == PAPER_SESSION_DONE && recording.session.state != PAPER_SESSION_DONE)
    {
        strcpy(notice, "Recording saved on this device. Import it into Medscribe to review.");
        page = CARD; card_page = 0;
    }
    recording = next; companion = status;
    return changed;
}
PAPER_EXPORT("paper_quick") void quick(void) {
    if (record_handle && recording.session.state == PAPER_SESSION_RUNNING) paper_quick_entry_icon("Stop & save", STOP, 1, 0, PAPER_ICON_STOP);
}
