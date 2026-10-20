/* 200x200 SD-app preview. Local reviewed-card fixture; no alert transport. */
#include "paper_ui_components.h"
#include "logo-small.h"
static int request, page;
static void label(const char *value,int x,int y,int w,int h,int font) {
    paper_text_block(value,x,y,w,h,font);
}
static void panel(int y,int h) {
    int o=paper_widget(1,1,0,0,0,0);
    paper_widget(19,o,0,0,0,0);
    paper_widget(8,o,8,y,0,0);paper_widget(9,o,184,h,0,0);
    paper_widget(10,o,1,0,0,0);paper_widget(10,o,3,1,0,0);
    paper_widget(10,o,4,8,0,0);
}
static void brand(void) {
    for(unsigned i=0;i<sizeof logo_spans/sizeof logo_spans[0];i++) {
        int span=paper_widget(1,1,0,0,0,0);
        paper_widget(19,span,0,0,0,0);
        paper_widget(8,span,10+logo_spans[i][0],12+logo_spans[i][1],0,0);
        paper_widget(9,span,logo_spans[i][2],1,0,0);
        paper_widget(10,span,0,0,0,0);paper_widget(10,span,1,255,0,0);
    }
    label("Know Me",43,4,112,24,PAPER_FONT_BODY);
}
static void centered(const char *value,int y) {
    int size[2]={0,0};paper_widget(34,0,(int)(uintptr_t)value,PAPER_FONT_TITLE,200,(int)(uintptr_t)size);
    label(value,(200-size[0])/2,y,size[0],28,PAPER_FONT_TITLE);
}
static void footer(void) {
    paper_icon(PAPER_ICON_BELL,10,184,12);
    label("Hold for help",29,179,130,20,PAPER_FONT_SMALL);
    paper_icon(PAPER_ICON_NOTE,178,183,14);
}
PAPER_EXPORT("paper_init") int init(int seed) {(void)seed;return 1;}
PAPER_EXPORT("paper_render") void render(int width,int height) {
    (void)width;(void)height;
    paper_mode(PAPER_TOP|PAPER_FULLSCREEN|PAPER_DIRECT);
    if(request) {
        label("Caregiver help",10,6,180,24,PAPER_FONT_BODY);
        label("Taylor Morgan",10,36,180,28,PAPER_FONT_TITLE);
        panel(72,60);
        paper_icon(PAPER_ICON_PHONE,16,88,22);
        label("Waiting for phone",45,80,140,46,PAPER_FONT_BODY);
        label("No delivery confirmed",10,139,184,20,PAPER_FONT_SMALL);
        label("Upper key: cancel",10,174,184,22,PAPER_FONT_SMALL);
        return;
    }
    brand();
    char count[12];snprintf(count,sizeof count,"%d / 5",page+1);
    label(count,155,7,44,20,PAPER_FONT_SMALL);
    if(page==0) {
        centered("Alex Morgan",35);
        panel(72,62);
        label("ALLERGIES",16,75,168,20,PAPER_FONT_SMALL);
        label("Penicillin: hives",16,96,168,23,PAPER_FONT_BODY);

        label("Taylor - partner",10,138,184,19,PAPER_FONT_SMALL);
        label("617-555-0140",10,155,184,23,PAPER_FONT_BODY);
    } else if(page==1) {
        label("Medications",10,31,184,28,PAPER_FONT_TITLE);
        label("Metformin 500 mg",10,61,184,18,PAPER_FONT_SMALL);
        label("Breakfast & dinner",10,79,184,18,PAPER_FONT_SMALL);
        label("Lisinopril 10 mg",10,98,184,18,PAPER_FONT_SMALL);
        label("Morning",10,116,184,18,PAPER_FONT_SMALL);
        label("Atorvastatin 20 mg",10,135,184,18,PAPER_FONT_SMALL);
        label("Evening",10,153,184,18,PAPER_FONT_SMALL);
    } else if(page==2) {
        label("Care contacts",10,31,184,28,PAPER_FONT_TITLE);
        label("Taylor Morgan",10,62,184,24,PAPER_FONT_BODY);
        label("Partner",10,84,184,18,PAPER_FONT_SMALL);
        label("617-555-0140",10,103,184,23,PAPER_FONT_BODY);
        label("Dr. Jordan Lee",10,128,184,17,PAPER_FONT_SMALL);
        label("617-555-0168",10,145,184,16,PAPER_FONT_SMALL);
    } else if(page==3) {
        label("What helps me",10,31,184,28,PAPER_FONT_TITLE);
        label("Walking aid. Time to",10,68,184,20,PAPER_FONT_SMALL);
        label("answer. Speak directly.",10,90,184,20,PAPER_FONT_SMALL);
        label("Please write down",10,119,184,20,PAPER_FONT_SMALL);
        label("my next steps.",10,141,184,20,PAPER_FONT_SMALL);
    } else {
        label("Conditions",10,31,184,28,PAPER_FONT_TITLE);
        panel(68,78);
        label("Type 2 diabetes",16,79,168,18,PAPER_FONT_SMALL);
        label("Hypertension",16,97,168,18,PAPER_FONT_SMALL);
        label("High cholesterol",16,115,168,18,PAPER_FONT_SMALL);
        label("Knee arthritis",16,133,168,18,PAPER_FONT_SMALL);
    }
    footer();
}
PAPER_EXPORT("paper_input") int input(int key) {
    if(key==PAPER_INPUT_SELECT_HOLD){request=1;return 1;}
    if(key==PAPER_INPUT_SELECT){if(request)request=0;return 1;}
    if(key==PAPER_INPUT_DOWN || key==PAPER_INPUT_DOWN_HOLD){if(!request)page=(page+1)%5;return 1;}
    return 0;
}
PAPER_EXPORT("paper_action") void action(int value) {(void)value;}
PAPER_EXPORT("paper_quick") void quick(void) {}
