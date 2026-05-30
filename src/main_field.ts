                        // Global variables/constants start
import html2canvas from 'html2canvas';
// import { image } from 'html2canvas/dist/types/css/types/image';
import jsPDF from 'jspdf';
                        // Global variables/constants end
                        // Conetxt menu constants start
const context_menu_mathfield_const = document.getElementById('context_menu_mathfield') as HTMLDivElement;
let current_element: any = null;
let element_to_move: any = null;
let element_move_mode = false;
let shift_key_pressed = false;
let ctrl_key_pressed = false;
const move_element_btn_const = document.getElementById('move_element_btn') as HTMLButtonElement;
                        // Context menu constants end
                        // Add/remove slide btns constants start
// let pointer_events_onslides = true;
const slide_controllers = new Map()
const slide_add_btn_const = document.getElementById('slide_add_btn') as HTMLButtonElement;
const slide_remove_btn_const = document.getElementById('slide_remove_btn') as HTMLButtonElement;
const all_slides: HTMLDivElement[] = Array.from(document.querySelectorAll('.main_field')) as HTMLDivElement[]; //Universe
let slide_removeMode = false;
let slidesToRemove: HTMLDivElement[] = [];
const main_field_const = document.getElementById('back_main_field') as HTMLDivElement;
                        // Add/remove slide btns constants end
                        // Add/remove/move mathfield btns constants start
import 'mathlive';
import {MathfieldElement} from 'mathlive';
const insert_mathfield_btn = document.getElementById('insert_mathfield_btn') as HTMLButtonElement;
let insert_mode_mathfield = false;
const mathfields: MathfieldElement[] = [];
const mathfield_slide_insert_controllers = new Map()
let current_slide: HTMLDivElement | null = null;
let X_coordinate_slide_click: number | null = null;    //Universe
let Y_coordinate_slide_click: number | null;    //Universe
const mathfield_remove_btn_const = document.getElementById('mathfield_remove_btn') as HTMLButtonElement;
let mathfield_to_remove_cover: HTMLDivElement | null = null;
let mathfield_to_remove: MathfieldElement | null = null;
const mathfield_move_btn_const = document.getElementById('mathfield_move_btn') as HTMLButtonElement;
import { renderMathInElement } from 'mathlive';
let all_temporary_mathfield_content_render_elements: HTMLDivElement[] = [];
                        // Add/remove/move mathfield btns constants end
                        // Add/remove/move textfield btns constants end
const insert_textfield_btn_const = document.getElementById('insert_textfield_btn') as HTMLButtonElement;
const context_menu_textfield_const = document.getElementById('context_menu_textfield') as HTMLDivElement;
const textfields: HTMLParagraphElement [] = [];
const textfield_insert_controllers = new Map ();
let mousedown_slide: HTMLDivElement | null = null;
let mouseup_slide: HTMLDivElement | null = null;
let X_mousedown: number | null = null;
let Y_mousedown: number | null = null;
let X_mouseup: number | null = null;
let Y_mouseup: number | null = null;
let textfield_insert_mode = false;
const remove_textfield_btn_const = document.getElementById('textfield_remove_btn') as HTMLButtonElement;
const move_textfield_btn_const = document.getElementById('textfield_move_btn') as HTMLButtonElement;
const resize_textfield_btn_const = document.getElementById('textfield_resize_btn') as HTMLButtonElement;
let slide_with_to_resize_textfield: HTMLDivElement | null = null;
                        // Add/remove/move textfield btns constants end
                        // Add/remove/move pictures btns constants start
//
const upload_picture_button_const = document.getElementById('upload_picture_button') as HTMLButtonElement;
const pictures_insert_panel_back_const = document.getElementById('pictures_insert_panel_back') as HTMLDivElement;
let picture_to_insert: HTMLImageElement | null = null;
const all_pictures_demonstrated: HTMLImageElement[] = [];
const all_pictures_on_slides: HTMLImageElement[] = [];
const picture_upload_input_const = document.getElementById('picture_upload_input') as HTMLInputElement;
let picture_insert_mode = false;
const context_menu_picture_const = document.getElementById('context_menu_picture') as HTMLDivElement;
const remove_picture_btn_const = document.getElementById('picture_remove_btn') as HTMLButtonElement;
const move_picture_btn_const = document.getElementById('picture_move_btn') as HTMLButtonElement;
const resize_picture_btn_const = document.getElementById('picture_resize_btn') as HTMLButtonElement;
let slide_with_to_resize_picture: HTMLDivElement | null = null;
                        // Add/remove/move pictures btns constants end
                        // Canvas constants start
const all_canvas_fields: HTMLCanvasElement[] = [];
let drawing_mode = false;
let drawing_mode_general = false;
let pencil_size = 2;
let eraser_size = 10;
// let line_size = 2;
const activate_drawing_btn_const = document.getElementById('activate_drawing_btn') as HTMLButtonElement;
let pencil_mode = false;
let eraser_mode = false;
let line_mode = false;
let pen_er_mode = false;
const pencil_btn_const = document.getElementById('pencil_btn') as HTMLButtonElement;
const eraser_btn_const = document.getElementById('eraser_btn') as HTMLButtonElement;
const line_btn_const = document.getElementById('line_btn') as HTMLButtonElement;
const pencil_range_input_const = document.getElementById('pencil_range_input') as HTMLInputElement;
const eraser_range_input_const = document.getElementById('eraser_range_input') as HTMLInputElement;
const line_range_input_const = document.getElementById('line_range_input') as HTMLInputElement;
                        // Canvas constants end
                        // Export/import/save constants start
const export_btn_const = document.getElementById('export_btn') as HTMLButtonElement;
const save_btn_const = document.getElementById('save_btn') as HTMLButtonElement;
const upload_file_btn_const = document.getElementById('upload_file_btn') as HTMLButtonElement;
const file_upload_input_const = document.getElementById('file_upload_input') as HTMLInputElement;
                        // Export/import/save constants end
                        // Context menus functions start
//.
                        // Context menus functions end










                        // Add/remove slide btns functions start
function style_not_allowed_cursor (slide_cursor_change: HTMLDivElement){
    slide_cursor_change.style.cursor = "not-allowed"
}
function style_default_cursor (slide_cursor_change: HTMLDivElement) {
    slide_cursor_change.style.cursor = "default"
}
function control_and_style_slide_to_remove (slide: HTMLDivElement){
    const index_to_remove = slidesToRemove.indexOf(slide)
    if (index_to_remove ===-1){
        slidesToRemove.push(slide);
        slide.style.backgroundColor = "#CCCCFC"
        slide.style.borderColor = "#7878B3"
    } else {
        slidesToRemove.splice(index_to_remove, 1);
        slide.style.backgroundColor = "white"
        slide.style.borderColor = "#BAB6B6"
    };
};
function slides_remove(){
    slidesToRemove.forEach(slide => {
        Array.from(slide.children).forEach((element_on_slide) =>{
            if (element_on_slide.firstElementChild instanceof MathfieldElement) {
                const index_mathfield_on_deleted_slide = mathfields.indexOf(element_on_slide.firstElementChild as MathfieldElement)
                mathfields.splice(index_mathfield_on_deleted_slide, 1);
            };
            if (element_on_slide instanceof HTMLParagraphElement) {
                const index_textfield_on_deleted_slide = textfields.indexOf(element_on_slide)
                textfields.splice(index_textfield_on_deleted_slide, 1);
            };
            if (element_on_slide instanceof HTMLImageElement) {
                const index_picture_on_deleted_slide = all_pictures_on_slides.indexOf(element_on_slide)
                all_pictures_on_slides.splice(index_picture_on_deleted_slide, 1);
            };
            if (element_on_slide.firstElementChild instanceof HTMLCanvasElement) {
                const index_canvas_on_deleted_slide = all_canvas_fields.indexOf(element_on_slide.firstElementChild)
                all_canvas_fields.splice(index_canvas_on_deleted_slide, 1);
            };

        });
        slide.remove();
        const index_all_slides_to_remove = all_slides.indexOf(slide)
        all_slides.splice(index_all_slides_to_remove, 1);
        slide_controllers.delete(slide);
    });
    slidesToRemove.length = 0;
};
function slides_removeMode_off(){
    all_slides.forEach(slide =>{
        const control_and_style_slide_to_remove_const2 = slide_controllers.get(slide)
        if (control_and_style_slide_to_remove_const2 !== undefined) {
            slide.removeEventListener('click', control_and_style_slide_to_remove_const2);
            style_default_cursor(slide)
        };
        slide.style.backgroundColor = "white"
        slide.style.borderColor = "#BAB6B6"
    });
    slide_removeMode = false;
    slidesToRemove.length = 0;
    slide_remove_btn_const.style.backgroundColor = "#bababa";
    mathfields.forEach((mathfield) => {
        mathfield.style.display = 'inline-block';
    });
};
function new_slide_add_listeners(slide: HTMLDivElement){
    const slide_width = slide.getBoundingClientRect().width;
    const slide_height = slide.getBoundingClientRect().height;
    slide.addEventListener('click', (event) =>{
        const slide_X_click = event.offsetX
        const slide_Y_click = event.offsetY
        if (slide_X_click >= -5 && slide_Y_click >= -5 && slide_X_click <= slide_width && slide_Y_click <= slide_height){
            X_coordinate_slide_click = slide_X_click
            Y_coordinate_slide_click = slide_Y_click
            current_slide = slide;
        };
        if (element_to_move !== null) {
            move_element_to()
            all_slides_onslide_elements_pointer_events_on();
        };
    });
    slide.addEventListener('mousedown', (event) =>{
        const slide_Y_mousedown = event.offsetY
        const slide_X_mousedown = event.offsetX
        if (slide_X_mousedown >= -5 && slide_Y_mousedown >= -5 && slide_X_mousedown <= slide_width && slide_Y_mousedown <= slide_height){
            X_mousedown = slide_X_mousedown
            Y_mousedown = slide_Y_mousedown
            mousedown_slide = slide;
        };
    });
    slide.addEventListener('mouseup', (event) =>{
        const slide_X_mouseup = event.offsetX
        const slide_Y_mouseup = event.offsetY
        if (slide_X_mouseup >= -5 && slide_Y_mouseup >= -5 && slide_X_mouseup <= slide_width && slide_Y_mouseup <= slide_height){
            X_mouseup = slide_X_mouseup
            Y_mouseup = slide_Y_mouseup
            mouseup_slide = slide;
        };
    });
    const new_canvas = document.createElement('canvas');
    new_canvas.width = slide_width;
    new_canvas.height = slide_height;
    all_canvas_fields.push(new_canvas);
    slide.appendChild(new_canvas);
    add_free_drawing_listeners(new_canvas);
};
                        // Add/remove slide btns functions end


                        // Move field functions start
function move_element_to(){
    if (current_slide !== null && element_to_move !== null){
        const current_slide_width = current_slide.clientWidth;
        const current_slide_height = current_slide.clientHeight;
        const element_to_move_width = element_to_move.getBoundingClientRect().width;
        const element_to_move_height = element_to_move.getBoundingClientRect().height;
        if (element_to_move !== null && X_coordinate_slide_click !== null && Y_coordinate_slide_click !== null){
            if (element_to_move.firstElementChild?.tagName === "MATH-FIELD"){
                if (X_coordinate_slide_click >= 0){
                    if (X_coordinate_slide_click <= current_slide_width){
                        element_to_move.style.left = `${X_coordinate_slide_click}px`
                    } else {
                        element_to_move.style.left = `${current_slide_width}px`
                    };
                } else {
                    element_to_move.style.left = `0px`
                };
                if (Y_coordinate_slide_click >= 0){
                    if (Y_coordinate_slide_click <= current_slide_height){
                        element_to_move.style.top = `${Y_coordinate_slide_click}px`
                    } else {
                        element_to_move.style.top = `${current_slide_height}px`
                    };
                } else {
                    element_to_move.style.top = `0px`
                };
            } else {
                if (X_coordinate_slide_click >= 0){
                    if (X_coordinate_slide_click + element_to_move_width <= current_slide_width){
                        element_to_move.style.left = `${X_coordinate_slide_click}px`
                    } else {
                        element_to_move.style.left = `${current_slide_width - element_to_move_width}px`
                    }
                } else {
                    element_to_move.style.left = `0px`
                };
                if (Y_coordinate_slide_click >= 0){
                    if (Y_coordinate_slide_click + element_to_move_height <= current_slide_height){
                        element_to_move.style.top = `${Y_coordinate_slide_click}px`
                    } else {
                        if (current_slide_height - element_to_move_height >= 0){
                            element_to_move.style.top = `${current_slide_height - element_to_move_height}px`
                        } else {
                            element_to_move.style.top = `0px`
                        };
                    }
                } else {
                    element_to_move.style.top = `0px`
                };
            };
        };
    };
    if (current_slide !== null){
        current_slide.appendChild(element_to_move)
        element_to_move = null;
        all_slides.forEach((slide) =>{
            style_default_cursor(slide);
            element_move_mode = false;
            move_element_btn_const.style.backgroundColor = '#bababa';
            all_slides_onslide_elements_pointer_events_on();
        });
    };
};
function element_move_mode_off(){
    element_to_move = null;
    if(element_move_mode){
        all_slides.forEach((slide) =>{
            style_default_cursor(slide)
        });
        all_slides_onslide_elements_pointer_events_on();
    };
    element_move_mode = false;
    move_element_btn_const.style.backgroundColor = '#bababa';
        mathfields.forEach((mathfield) => {
        mathfield.style.display = 'inline-block';
    });
};
                        // Move field functions end

                        // Slide children pointer events turn on turn off functions start
//
function all_slides_onslide_elements_except_drawings_pointer_events_off(){
    mathfields.forEach((mathfield: MathfieldElement) => {
        const mathfield_size = mathfield.getBoundingClientRect();
        const mathfield_cover = mathfield.parentElement as HTMLDivElement;
        if (mathfield.parentElement !== null && mathfield.parentElement.children.length === 1) {
            mathfield_cover.style.width = `${mathfield_size.width}px`;
            mathfield_cover.style.height = `${mathfield_size.height}px`;
            mathfield_cover.classList.add('mathfield_cover_active_status');
            const mathfield_content_latex = mathfield.getValue('latex');
            const mathfield_content_to_render = document.createElement('div');
            mathfield_content_to_render.textContent = `\\(${mathfield_content_latex }\\)`;
            mathfield_content_to_render.style.paddingLeft = "6px";
            mathfield_content_to_render.style.pointerEvents = "none";
            all_temporary_mathfield_content_render_elements.push(mathfield_content_to_render);
            renderMathInElement(mathfield_content_to_render);
            mathfield_cover.appendChild(mathfield_content_to_render);
            mathfield.classList.add('mathfield_hidden');
        };
    });
    all_slides.forEach((slide) =>{
        Array.from(slide.children).forEach((child: any) =>{
            if (!(child instanceof HTMLCanvasElement)){
                child.style.pointerEvents = 'none';
            };
        });
        if (all_pictures_on_slides.length > 0){
            all_pictures_on_slides.forEach((picture: HTMLImageElement) =>{
                picture.style.pointerEvents = 'none';
            });
        };
    });
};
function all_slides_onslide_elements_except_drawings_pointer_events_on(){
    mathfields.forEach((mathfield) => {
        mathfield.classList.remove('mathfield_hidden');
        const mathfield_cover = mathfield.parentElement as HTMLDivElement;
        mathfield_cover.classList.remove('mathfield_cover_active_status');
        mathfield_cover.style.width = `auto`;
        mathfield_cover.style.height = `auto`;
    });
    all_slides.forEach((slide) =>{
        Array.from(slide.children).forEach((child: any) =>{
            if (!(child instanceof HTMLCanvasElement)){
                child.style.pointerEvents = 'auto';
            };
        });
    });
    all_temporary_mathfield_content_render_elements.forEach((element) =>{
        if (element !== null){
            element.remove();
        };
    });
    all_temporary_mathfield_content_render_elements = [];
};
function all_slides_onslide_elements_pointer_events_off(){
    all_slides_onslide_elements_except_drawings_pointer_events_off()
    all_canvas_fields.forEach((canvas) =>{
        canvas.style.pointerEvents = 'none';
    });
};
function all_slides_onslide_elements_pointer_events_on(){
    all_slides_onslide_elements_except_drawings_pointer_events_on()
};
                        // Slide children pointer events turn on turn off functions start

                        // Add/remove/move mathfield btns functions start
function style_crosshair_cursor (slide_cursor_change: any){
    slide_cursor_change.style.cursor = "crosshair"
};
function add_mathfield (slide: HTMLDivElement){
    const new_mathfield = new MathfieldElement();
    mathfields.push(new_mathfield)
    insert_mode_mathfield = false;
    new_mathfield.addEventListener('contextmenu', (context_menu_click: MouseEvent) => {
        context_menu_click.stopPropagation();
        context_menu_click.preventDefault();
        context_menu_mathfield_const.style.display = 'flex';
        context_menu_mathfield_const.style.left = `${context_menu_click.pageX}px`;
        context_menu_mathfield_const.style.top = `${context_menu_click.pageY}px`;
        current_element = (context_menu_click.target as HTMLElement).closest('.mathfield_cover');
        context_menu_textfield_const.style.display = 'none';
        context_menu_picture_const.style.display = 'none';
    });
    new_mathfield.addEventListener('click', (event: MouseEvent) =>{
        current_element = (event.target as HTMLElement).closest('.mathfield_cover');
        if (element_move_mode){
            all_slides_onslide_elements_pointer_events_off();
            event.stopPropagation();
            element_to_move = current_element
            all_slides.forEach((slide_1) =>{
                style_crosshair_cursor(slide_1);
            });
        };
    });
    if (current_slide !== null){
        const current_slide_width = current_slide.clientWidth;
        const current_slide_height = current_slide.clientHeight;
        const new_mathfield_cover: HTMLDivElement = document.createElement('div');
        new_mathfield_cover.classList.add('mathfield_cover');
        new_mathfield_cover.style.position='absolute';
        if (X_coordinate_slide_click !== null && X_coordinate_slide_click >= 0){
            if (X_coordinate_slide_click <= current_slide_width){
                new_mathfield_cover.style.left = `${X_coordinate_slide_click}px`;
            } else {
                new_mathfield_cover.style.left = `${current_slide_width}px`;
            };
        } else {
            new_mathfield_cover.style.left = `0px`;
        };
        if (Y_coordinate_slide_click !== null && Y_coordinate_slide_click >= 0){
            if (Y_coordinate_slide_click <= current_slide_height){
                new_mathfield_cover.style.top = `${Y_coordinate_slide_click}px`;
            } else {
                new_mathfield_cover.style.top = `${current_slide_height}px`;
            };
        } else {
            new_mathfield_cover.style.top = `0px`;
        };
        new_mathfield_cover.appendChild(new_mathfield);
        slide.appendChild(new_mathfield_cover);
        new_mathfield_cover.style.zIndex = "0";
        new_mathfield.classList.add('mathfield_default')
        new_mathfield.focus();
        if (!shift_key_pressed){
            mathfield_insert_mode_off()
            all_slides_onslide_elements_pointer_events_on();
        } else {
            all_slides.forEach((slide_1) =>{
                style_crosshair_cursor(slide_1);
            });
            all_slides_onslide_elements_except_drawings_pointer_events_on();
            all_slides_onslide_elements_except_drawings_pointer_events_off();
        };
    };
};
function mathfield_insert_mode_off (){
    insert_mode_mathfield = false;
    all_slides.forEach(slide => {
        const slide_to_turn_off_mathfield_insert_mode = mathfield_slide_insert_controllers.get(slide)
        slide.removeEventListener('click', slide_to_turn_off_mathfield_insert_mode)
        style_default_cursor(slide)
    });
    mathfields.forEach((mathfield) => {
        mathfield.style.display = 'inline-block';
    });
    insert_mathfield_btn.style.backgroundColor = "#bababa";
};

                        // Add/remove/move mathfield btns functions end
                        // Add/remove/move textfield btns functions start
function textfield_insert(){
    if (mousedown_slide === mouseup_slide && mousedown_slide !== null && mouseup_slide !== null && textfield_insert_mode){
        const new_textfield = document.createElement('p');
        new_textfield.classList.add('textfield_on_slide');
        new_textfield.contentEditable = "true";
        new_textfield.style.zIndex = "0";
        let X_textfield = Math.min(X_mousedown!, X_mouseup!);
        let Y_textfield = Math.min(Y_mousedown!, Y_mouseup!);
        let width_textfield = Math.abs(X_mousedown! - X_mouseup!);
        let height_textfield = Math.abs(Y_mousedown! - Y_mouseup!);
        if (X_textfield >= 0){
            new_textfield.style.left = `${X_textfield}px`;
        } else {
            X_textfield = 0;
            new_textfield.style.left = `${X_textfield}px`;
        };
        if (Y_textfield >= 0){
            new_textfield.style.top = `${Y_textfield}px`;
        } else {
            Y_textfield = 0;
            new_textfield.style.top = `${Y_textfield}px`;
        };
        if ((width_textfield + X_textfield) <= mouseup_slide.clientWidth - 2){
            if (width_textfield >= 20){
                new_textfield.style.width = `${width_textfield}px`;
            } else {
                new_textfield.style.width = `20px`;
            };
        }
        if (width_textfield + X_textfield > mouseup_slide.clientWidth - 2){
            if (mouseup_slide.clientWidth - 2 - X_textfield >= 20){
                new_textfield.style.width = `${mouseup_slide.clientWidth - X_textfield - 2}px`;
            } else {
                new_textfield.style.width = `20px`;
                new_textfield.style.left = `${mouseup_slide.clientWidth - 22}px`;
            };
        };
        if (height_textfield + Y_textfield <= mouseup_slide.clientHeight - 2){
            if (height_textfield >= 20){
            new_textfield.style.minHeight = `${height_textfield}px`;
            } else {
            new_textfield.style.minHeight = `20px`;
            };
        };
        if (height_textfield + Y_textfield > mouseup_slide.clientHeight - 2){
            if (mouseup_slide.clientHeight - 2 - Y_textfield >= 20){
                new_textfield.style.minHeight = `${mouseup_slide.clientHeight - Y_textfield - 2}px`;
            } else {
                new_textfield.style.minHeight = `20px`;
                new_textfield.style.top = `${mouseup_slide.clientHeight - 22}px`;
            };
        };
        mousedown_slide.appendChild(new_textfield);
        new_textfield.focus();
        new_textfield.addEventListener('click', (event: MouseEvent) =>{
            current_element = new_textfield
            event.stopPropagation();
            if (element_move_mode){
                element_to_move = current_element
                all_slides.forEach((slide) =>{
                    style_crosshair_cursor(slide);
                });
                all_slides_onslide_elements_pointer_events_off();
            };
        });
        new_textfield.addEventListener('contextmenu', (context_menu_click) => {
            context_menu_click.stopPropagation();
            context_menu_click.preventDefault();
            context_menu_textfield_const.style.display = 'flex';
            context_menu_textfield_const.style.left = `${context_menu_click.pageX}px`;
            context_menu_textfield_const.style.top = `${context_menu_click.pageY}px`;
            current_element = new_textfield
            context_menu_mathfield_const.style.display = 'none';
            context_menu_picture_const.style.display = 'none';
        }, true);
        textfields.push(new_textfield)
        new_textfield.focus();
        if (!shift_key_pressed){
            textfield_insert_mode_off();
            all_slides_onslide_elements_pointer_events_on();
        } else {
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });
            all_slides_onslide_elements_except_drawings_pointer_events_on();
            all_slides_onslide_elements_except_drawings_pointer_events_off();
        };
    };
};
function textfield_insert_mode_off() {
    all_slides.forEach((slide) =>{
        const textfield_insert_const = textfield_insert_controllers.get(slide)
        if (textfield_insert_const !== undefined) {
            slide.removeEventListener('mouseup', textfield_insert_const)
        }
        style_default_cursor(slide)
    });
    textfield_insert_mode = false;
    insert_textfield_btn_const.style.backgroundColor = "#bababa";
    mathfields.forEach((mathfield) => {
        mathfield.style.display = 'inline-block';
    });
};
function resize_textfield(){
    if (slide_with_to_resize_textfield !== null && current_slide !== null && current_slide === slide_with_to_resize_textfield && X_coordinate_slide_click !== null && Y_coordinate_slide_click !== null){
        if (current_element !== null) {
            const current_textfield = current_element as HTMLParagraphElement;
            const x_current_textfield = current_textfield.offsetLeft;
            const y_current_textfield = current_textfield.offsetTop;
            const current_textfield_width = current_textfield.clientWidth;
            const current_textfield_height = current_textfield.clientHeight;
            const current_slide_width = current_slide.clientWidth;
            const current_slide_height = current_slide.clientHeight;
            if (X_coordinate_slide_click >= x_current_textfield){
                const new_width = X_coordinate_slide_click - x_current_textfield;
                if (x_current_textfield + new_width <= current_slide_width - 2){
                    if (new_width >= 20){
                        current_element.style.width = `${new_width}px`;
                    } else {
                        current_element.style.width = `20px`;
                    };
                } else {
                    current_element.style.width = `${current_slide_width - 2 - x_current_textfield}px`;
                };
            } else {
                if (X_coordinate_slide_click >= 0){
                    current_element.style.left = `${X_coordinate_slide_click}px`;
                    current_element.style.width = `${x_current_textfield - X_coordinate_slide_click + current_textfield_width}px`;
                } else {
                    current_element.style.left = `0px`;
                    current_element.style.width = `${x_current_textfield + current_textfield_width}px`;
                };
            };
            if (Y_coordinate_slide_click >= y_current_textfield){
                const new_height = Y_coordinate_slide_click - y_current_textfield;
                if (y_current_textfield + new_height <= current_slide_height - 2){
                    if (new_height >= 20){
                        current_element.style.minHeight = `${new_height}px`;
                    } else {
                        current_element.style.minHeight = `20px`;
                    };
                } else {
                    current_element.style.minHeight = `${current_slide_height - 2 - y_current_textfield}px`;
                };
            } else {
                if (Y_coordinate_slide_click >= 0){
                    current_element.style.top = `${Y_coordinate_slide_click}px`;
                    current_element.style.minHeight = `${y_current_textfield - Y_coordinate_slide_click + current_textfield_height}px`;
                } else {
                    current_element.style.top = `0px`;
                    current_element.style.minHeight = `${y_current_textfield + current_textfield_height}px`;
                };
            };
        };
    };
    resize_textfield_mode_off();
    all_slides_onslide_elements_pointer_events_on();
};
function resize_textfield_mode_off(){
    slide_with_to_resize_textfield?.removeEventListener('click', resize_textfield);
    if (slide_with_to_resize_textfield !== null){
        style_default_cursor(slide_with_to_resize_textfield);
    };
    // all_slides_onslide_elements_pointer_events_on();
    slide_with_to_resize_textfield = null;
};
                        // Add/remove/move textfield btns functions end
                        // Add/remove/move pictures btns functions start
function uploaded_picture_demonstrate(picture: string){
    const new_picture_demonstrated_back = document.createElement('div');
    const new_picture_demonstrated = document.createElement('img');
    const new_picture_demonstrated_cover = document.createElement('div');
    new_picture_demonstrated_back.classList.add('picture_demonstration_back');
    new_picture_demonstrated.classList.add('picture_demonstration');
    new_picture_demonstrated_cover.classList.add('picture_demonstrated_active_cover');
    new_picture_demonstrated.src = picture;
    new_picture_demonstrated_back.appendChild(new_picture_demonstrated);
    new_picture_demonstrated_back.appendChild(new_picture_demonstrated_cover);
    pictures_insert_panel_back_const.appendChild(new_picture_demonstrated_back);
    all_pictures_demonstrated.push(new_picture_demonstrated);
    let picture_in_insert_mode = false;
    new_picture_demonstrated_back.addEventListener('click', (click) =>{
        if (!picture_insert_mode && click.isTrusted){
            element_move_mode_off();
            slides_removeMode_off();
            pictures_insert_mode_off();
            mathfield_insert_mode_off();
            resize_textfield_mode_off();
            textfield_insert_mode_off();
            drawing_mode_off();
            all_slides_onslide_elements_pointer_events_off();
        };
        if (picture_insert_mode && click.isTrusted){
            all_slides_onslide_elements_except_drawings_pointer_events_on();
        };
        let picture_in_insert_mode_inside_check = false;
        if (picture_to_insert !== null && click.isTrusted){
            const current_picture_to_insert_back = picture_to_insert.parentElement;
            if (current_picture_to_insert_back !== null && picture_to_insert !== new_picture_demonstrated){
                current_picture_to_insert_back.click()
            };
        };
        if (!click.isTrusted && picture_in_insert_mode){
            new_picture_demonstrated_cover.style.display = 'none';
            picture_to_insert = null;
            picture_in_insert_mode = false;
        };
        if (click.isTrusted && !picture_in_insert_mode && picture_insert_mode && !picture_in_insert_mode_inside_check){
            new_picture_demonstrated_cover.style.display = 'block';
            picture_to_insert = new_picture_demonstrated;
            picture_in_insert_mode = true;
            picture_in_insert_mode_inside_check = true;
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });
        };
        if (click.isTrusted && !picture_in_insert_mode && !picture_insert_mode && !picture_in_insert_mode_inside_check){
            new_picture_demonstrated_cover.style.display = 'block';
            picture_to_insert = new_picture_demonstrated;
            picture_in_insert_mode = true;
            picture_insert_mode_on();
            picture_in_insert_mode_inside_check = true;
            picture_insert_mode = true;
        };
        if (click.isTrusted && picture_in_insert_mode && !picture_in_insert_mode_inside_check){
            pictures_insert_mode_off();
            picture_in_insert_mode_inside_check = true;
            picture_insert_mode = false;
        };
        picture_in_insert_mode_inside_check = false;
    });
};
function pictures_insert_mode_off(){
    if (picture_to_insert !== null){
        const current_picture_to_insert_back = picture_to_insert.parentElement;
        if (current_picture_to_insert_back !== null){
            current_picture_to_insert_back.click();
        };
    };
    all_slides.forEach((slide) =>{
        style_default_cursor(slide);
        slide.removeEventListener('click', insert_picture_const);
    });
    picture_insert_mode = false;
};
function insert_picture(){
    if (mousedown_slide === mouseup_slide && mousedown_slide !== null && mouseup_slide !== null && picture_insert_mode && picture_to_insert !== null){
        const new_picture_on_slide = picture_to_insert.cloneNode(true) as HTMLImageElement;
        new_picture_on_slide.removeAttribute('class');
        new_picture_on_slide.removeAttribute('id');
        new_picture_on_slide.classList.add('picture_on_slide');
        new_picture_on_slide.style.position = 'absolute';
        if (!ctrl_key_pressed){
            const height_to_width_ratio = picture_to_insert.naturalHeight / picture_to_insert.naturalWidth;
            let X_picture = Math.min(X_mousedown!, X_mouseup!);
            let Y_picture = Math.min(Y_mousedown!, Y_mouseup!);
            let width_picture = Math.abs(X_mousedown! - X_mouseup!);
            let height_picture = width_picture * height_to_width_ratio;
            if (X_picture >= 0){
                new_picture_on_slide.style.left = `${X_picture}px`;
            } else {
                X_picture = 0;
                new_picture_on_slide.style.left = `${X_picture}px`;
            };
            if (Y_picture >= 0){
                new_picture_on_slide.style.top = `${Y_picture}px`;
            } else {
                Y_picture = 0;
                new_picture_on_slide.style.top = `${Y_picture}px`;
            };
            if ((width_picture + X_picture) <= mouseup_slide.clientWidth){
                if (width_picture >= 20){
                    new_picture_on_slide.style.width = `${width_picture}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    height_picture = 20 * height_to_width_ratio;
                };
            }
            if (width_picture + X_picture > mouseup_slide.clientWidth){
                if (mouseup_slide.clientWidth - X_picture >= 20){
                    X_picture = mouseup_slide.clientWidth - X_picture;
                    if (X_picture >= 0){
                        new_picture_on_slide.style.width = `${X_picture}px`;
                    } else {
                        X_picture = 0;
                        new_picture_on_slide.style.width = `${X_picture}px`;
                        width_picture = mouseup_slide.clientWidth;
                        height_picture = width_picture * height_to_width_ratio;
                    };
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    new_picture_on_slide.style.left = `${mouseup_slide.clientWidth - 20}px`;
                    height_picture = 20 * height_to_width_ratio;
                };
            };
            if (height_picture + Y_picture <= mouseup_slide.clientHeight){
                new_picture_on_slide.style.height = `${height_picture}px`;
            };
            if (height_picture + Y_picture > mouseup_slide.clientHeight){
                Y_picture = mouseup_slide.clientHeight - height_picture;
                if (Y_picture >= 0){
                    new_picture_on_slide.style.height = `${height_picture}px`;
                    new_picture_on_slide.style.top = `${Y_picture}px`;
                } else {
                    Y_picture = 0;
                    new_picture_on_slide.style.top = `${Y_picture}px`;
                    new_picture_on_slide.style.height = `${mouseup_slide.clientHeight}px`;
                };
            };
        } else {
            let X_picture = Math.min(X_mousedown!, X_mouseup!);
            let Y_picture = Math.min(Y_mousedown!, Y_mouseup!);
            let width_picture = Math.abs(X_mousedown! - X_mouseup!);
            let height_picture = Math.abs(Y_mousedown! - Y_mouseup!);
            if (X_picture >= 0){
                new_picture_on_slide.style.left = `${X_picture}px`;
            } else {
                X_picture = 0;
                new_picture_on_slide.style.left = `${X_picture}px`;
            };
            if (Y_picture >= 0){
                new_picture_on_slide.style.top = `${Y_picture}px`;
            } else {
                Y_picture = 0;
                new_picture_on_slide.style.top = `${Y_picture}px`;
            };
            if ((width_picture + X_picture) <= mouseup_slide.clientWidth - 2){
                if (width_picture >= 20){
                    new_picture_on_slide.style.width = `${width_picture}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                };
            }
            if (width_picture + X_picture > mouseup_slide.clientWidth - 2){
                if (mouseup_slide.clientWidth - 2 - X_picture >= 20){
                    new_picture_on_slide.style.width = `${mouseup_slide.clientWidth - X_picture - 2}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    new_picture_on_slide.style.left = `${mouseup_slide.clientWidth - 22}px`;
                };
            };
            if (height_picture + Y_picture <= mouseup_slide.clientHeight - 2){
                if (height_picture >= 20){
                new_picture_on_slide.style.height = `${height_picture}px`;
                } else {
                new_picture_on_slide.style.minHeight = `20px`;
                };
            };
            if (height_picture + Y_picture > mouseup_slide.clientHeight - 2){
                if (mouseup_slide.clientHeight - 2 - Y_picture >= 20){
                    new_picture_on_slide.style.minHeight = `${mouseup_slide.clientHeight - Y_picture-2}px`;
                } else {
                    new_picture_on_slide.style.minHeight = `20px`;
                    new_picture_on_slide.style.top = `${mouseup_slide.clientHeight - 2}px`;
                };
            };
        };
        new_picture_on_slide.style.pointerEvents = 'none';
        mousedown_slide.appendChild(new_picture_on_slide);
        new_picture_on_slide.style.zIndex = "0";
        all_pictures_on_slides.push(new_picture_on_slide);
        new_picture_on_slide.addEventListener('click', (event: MouseEvent) =>{
            current_element = new_picture_on_slide
            event.stopPropagation();
            if (element_move_mode){
                element_to_move = current_element
                all_slides.forEach((slide) =>{
                    style_crosshair_cursor(slide);
                });
                all_slides_onslide_elements_pointer_events_off();
            };
        });
        new_picture_on_slide.addEventListener('contextmenu', (context_menu_click) => {
            context_menu_click.stopPropagation();
            context_menu_click.preventDefault();
            context_menu_picture_const.style.display = 'flex';
            context_menu_picture_const.style.left = `${context_menu_click.pageX}px`;
            context_menu_picture_const.style.top = `${context_menu_click.pageY}px`;
            current_element = new_picture_on_slide
            context_menu_mathfield_const.style.display = 'none';
            context_menu_textfield_const.style.display = 'none';
        }, true);
        if (!shift_key_pressed){
            pictures_insert_mode_off();
            all_slides_onslide_elements_pointer_events_on();
        } else {
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });
            all_slides_onslide_elements_except_drawings_pointer_events_on();
            all_slides_onslide_elements_except_drawings_pointer_events_off();
        };
    };
};
const insert_picture_const = () => {
    insert_picture();
};
function picture_insert_mode_on(){
    element_move_mode_off();
    slides_removeMode_off();
    textfield_insert_mode_off();
    mathfield_insert_mode_off();
    picture_insert_mode = true;
    all_slides.forEach((slide) =>{
        style_crosshair_cursor(slide);
        slide.addEventListener('click', insert_picture_const);
    });
};
function resize_picture(){
    const current_picture_to_resize = current_element as HTMLImageElement;
    const current_slide_with_picture_to_resize = current_picture_to_resize.parentElement as HTMLDivElement;
    const x_current_picture = current_picture_to_resize.offsetLeft;
    const y_current_picture = current_picture_to_resize.offsetTop;
    const current_picture_width = current_picture_to_resize.getBoundingClientRect().width;
    const current_picture_height = current_picture_to_resize.getBoundingClientRect().height;
    const current_slide_width = current_slide_with_picture_to_resize.clientWidth;
    const current_slide_height = current_slide_with_picture_to_resize.clientHeight;
    if (X_coordinate_slide_click !== null && Y_coordinate_slide_click !== null && current_element !== null && current_slide === current_slide_with_picture_to_resize){
        let new_final_picture_X: number | null = null;
        let new_final_picture_Y: number | null = null;
        let new_final_picture_Width: number | null = null;
        let new_final_picture_Height: number | null = null;
        if (true){
            if (X_coordinate_slide_click >= x_current_picture){
                new_final_picture_X = x_current_picture;
                if (X_coordinate_slide_click <= current_slide_width){
                    new_final_picture_Width = X_coordinate_slide_click - x_current_picture;
                } else {
                    new_final_picture_Width = current_slide_width - x_current_picture;
                };
            } else {
                if (X_coordinate_slide_click >= 0){
                    new_final_picture_X = X_coordinate_slide_click;
                    new_final_picture_Width = x_current_picture - X_coordinate_slide_click + current_picture_width;
                } else {
                    new_final_picture_X = 0;
                    new_final_picture_Width = x_current_picture + current_picture_width;
                };
            }
        }
        if (!ctrl_key_pressed){
            new_final_picture_Height = new_final_picture_Width! * (current_picture_to_resize.naturalHeight / current_picture_to_resize.naturalWidth);
            if (Y_coordinate_slide_click >= y_current_picture){
                if (new_final_picture_Height + y_current_picture <= current_slide_height){
                    new_final_picture_Y = y_current_picture;
                } else {
                    if (current_slide_height - new_final_picture_Height >= 0){
                        new_final_picture_Y = current_slide_height - new_final_picture_Height;
                    } else {
                        new_final_picture_Y = 0;
                        new_final_picture_Height = current_slide_height;
                    }
                };
            } else {
                if (current_slide_height - new_final_picture_Height >= 0){
                    if (Y_coordinate_slide_click >= 0){
                        if (new_final_picture_Height + Y_coordinate_slide_click <= current_slide_height){
                            new_final_picture_Y = Y_coordinate_slide_click;
                        } else {
                            new_final_picture_Y = current_slide_height - new_final_picture_Height;
                        };
                    } else {
                        new_final_picture_Y = 0;
                    }
                } else {
                    new_final_picture_Y = 0;
                    new_final_picture_Height = current_slide_height;
                }
            }
        } else {
            if (Y_coordinate_slide_click >= y_current_picture){
                if (Y_coordinate_slide_click <= current_slide_height){
                    new_final_picture_Height = Y_coordinate_slide_click - y_current_picture;
                } else {
                    new_final_picture_Height = current_slide_height - y_current_picture;
                };
            } else {
                if (Y_coordinate_slide_click >= 0){
                    new_final_picture_Y = Y_coordinate_slide_click;
                    new_final_picture_Height = y_current_picture - Y_coordinate_slide_click + current_picture_height;
                } else {
                    new_final_picture_Y = 0;
                    new_final_picture_Height = y_current_picture + current_picture_height;
                };
            }
        }
        if (new_final_picture_X !== null && new_final_picture_Y !== null && new_final_picture_Width !== null && new_final_picture_Height !== null){
            current_element.style.left = `${new_final_picture_X}px`;
            current_element.style.top = `${new_final_picture_Y}px`;
            current_element.style.width = `${new_final_picture_Width}px`;
            current_element.style.height = `${new_final_picture_Height}px`;
        };
    };
    resize_picture_mode_off();
    all_slides_onslide_elements_pointer_events_on();
}
const resize_picture_const = () => {
    resize_picture();
};
function resize_picture_mode_off(){
    slide_with_to_resize_picture?.removeEventListener('click', resize_picture_const);
    if (slide_with_to_resize_picture !== null){
        style_default_cursor(slide_with_to_resize_picture);
    };
    slide_with_to_resize_picture = null;
}
                        // Add/remove/move pictures btns functions end
                        // Drawing functions start
function drawing_mode_on(){
    element_move_mode_off();
    slides_removeMode_off();
    textfield_insert_mode_off();
    mathfield_insert_mode_off();
    pictures_insert_mode_off();
    all_slides_onslide_elements_except_drawings_pointer_events_off();
    if (all_canvas_fields.length > 0){
        all_canvas_fields.forEach((canvas) =>{
            canvas.style.pointerEvents = 'auto';
        });
    };
    activate_drawing_btn_const.style.backgroundColor = '#858585';
};
function add_free_drawing_listeners(canvas: HTMLCanvasElement){
    canvas.classList.add('canvas_on_slide');
    const content = canvas.getContext('2d')
    let current_drawing_coordinate_X: number | null = null;
    let current_drawing_coordinate_Y: number | null = null;
    if (content !== null){
        content.lineCap = 'round';
    };
    canvas.addEventListener('mousedown', (mouse_down) =>{
        if (content!== null && pencil_mode){
            content.globalCompositeOperation = 'source-over';
            content.lineWidth = pencil_size;
        } else if (content!== null && eraser_mode){
            content.globalCompositeOperation = 'destination-out';
            content.lineWidth = eraser_size;
        };
        if (pencil_mode || eraser_mode){
            pen_er_mode = true;
        };
        // current_canvas = canvas;
        drawing_mode = true;
        if (mouse_down.target === canvas){
            current_drawing_coordinate_X = mouse_down.offsetX;
            current_drawing_coordinate_Y = mouse_down.offsetY;
        };
        if (content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.beginPath();
            content.moveTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
        };
    });
    canvas.addEventListener('mousemove', (mouse_movement) =>{
        if (mouse_movement.target === canvas){
            current_drawing_coordinate_X = mouse_movement.offsetX;
            current_drawing_coordinate_Y = mouse_movement.offsetY;
        };
        if (pen_er_mode && drawing_mode && content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.lineTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
            content.stroke();
        };
    });
    canvas.addEventListener('mouseup', (mouse_up) =>{
        if (mouse_up.target === canvas){
            current_drawing_coordinate_X = mouse_up.offsetX;
            current_drawing_coordinate_Y = mouse_up.offsetY;
        };
        if (pen_er_mode && drawing_mode && content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.lineTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
            content.stroke();
        };
        drawing_mode = false;
        pen_er_mode = false;
        // current_canvas = null;
    });
    canvas.addEventListener('mouseleave', () =>{
        drawing_mode = false;
        // current_canvas = null;
    });
    canvas.style.pointerEvents = 'none';
};
function drawing_mode_off(){
    if (all_canvas_fields.length > 0){
        all_canvas_fields.forEach((canvas) =>{
            canvas.style.pointerEvents = 'none';
        });
    };
    all_slides_onslide_elements_except_drawings_pointer_events_on();
    activate_drawing_btn_const.style.backgroundColor = '#bababa';
    pen_er_mode = false;
    pencil_mode = false;
    eraser_mode = false;
    line_mode = false;
    pencil_btn_const.style.backgroundColor = '#bababa';
    eraser_btn_const.style.backgroundColor = '#bababa';
    line_btn_const.style.backgroundColor = '#bababa';
};

                        // Drawing functions end
                        // Export/import/save functions start
// function save_editable_file(){
//     const file_name = prompt("Enter file name");
// };
async function export_as_pdf(){
    all_slides_onslide_elements_pointer_events_off();
    document.fonts.ready.then(async function() {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: `a4`
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        for (let i = 0; i < all_slides.length; i++){
            const slide = all_slides[i];
            slide.style.border = 'none';
            const onslide_content = await html2canvas(slide, {
                scale: 2,
                useCORS: true,
                logging: false,
            });
            slide.style.border = '';
            const imgData = onslide_content.toDataURL('image/jpeg', 1.0);
            if (i > 0) {
                pdf.addPage();
            };
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }
        const file_name = prompt("Enter file name") || 'export';
        pdf.save(file_name + '.pdf');
    });
}
// async function save_editable_file(){
    
// }
function imported_slide_add_listeners(slide: HTMLDivElement){
    const slide_width = slide.getBoundingClientRect().width;
    const slide_height = slide.getBoundingClientRect().height;
    slide.addEventListener('click', (event) =>{
        const slide_X_click = event.offsetX
        const slide_Y_click = event.offsetY
        if (slide_X_click >= -5 && slide_Y_click >= -5 && slide_X_click <= slide_width && slide_Y_click <= slide_height){
            X_coordinate_slide_click = slide_X_click
            Y_coordinate_slide_click = slide_Y_click
            current_slide = slide;
        };
        if (element_to_move !== null) {
            move_element_to()
            all_slides_onslide_elements_pointer_events_on();
        };
    });
    slide.addEventListener('mousedown', (event) =>{
        const slide_Y_mousedown = event.offsetY
        const slide_X_mousedown = event.offsetX
        if (slide_X_mousedown >= -5 && slide_Y_mousedown >= -5 && slide_X_mousedown <= slide_width && slide_Y_mousedown <= slide_height){
            X_mousedown = slide_X_mousedown
            Y_mousedown = slide_Y_mousedown
            mousedown_slide = slide;
        };
    });
    slide.addEventListener('mouseup', (event) =>{
        const slide_X_mouseup = event.offsetX
        const slide_Y_mouseup = event.offsetY
        if (slide_X_mouseup >= -5 && slide_Y_mouseup >= -5 && slide_X_mouseup <= slide_width && slide_Y_mouseup <= slide_height){
            X_mouseup = slide_X_mouseup
            Y_mouseup = slide_Y_mouseup
            mouseup_slide = slide;
        };
    });
};
function add_free_drawing_listeners_imported_canvas(canvas: HTMLCanvasElement, imported_content_base64: string | null){
    const content = canvas.getContext('2d')
    canvas.classList.add('canvas_on_slide');
    let current_drawing_coordinate_X: number | null = null;
    let current_drawing_coordinate_Y: number | null = null;
    if (content !== null){
        content.lineCap = 'round';
    };
    canvas.addEventListener('mousedown', (mouse_down) =>{
        if (content!== null && pencil_mode){
            content.globalCompositeOperation = 'source-over';
            content.lineWidth = pencil_size;
        } else if (content!== null && eraser_mode){
            content.globalCompositeOperation = 'destination-out';
            content.lineWidth = eraser_size;
        };
        if (pencil_mode || eraser_mode){
            pen_er_mode = true;
        };
        // current_canvas = canvas;
        drawing_mode = true;
        if (mouse_down.target === canvas){
            current_drawing_coordinate_X = mouse_down.offsetX;
            current_drawing_coordinate_Y = mouse_down.offsetY;
        };
        if (content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.beginPath();
            content.moveTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
        };
    });
    canvas.addEventListener('mousemove', (mouse_movement) =>{
        if (mouse_movement.target === canvas){
            current_drawing_coordinate_X = mouse_movement.offsetX;
            current_drawing_coordinate_Y = mouse_movement.offsetY;
        };
        if (pen_er_mode && drawing_mode && content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.lineTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
            content.stroke();
        };
    });
    canvas.addEventListener('mouseup', (mouse_up) =>{
        if (mouse_up.target === canvas){
            current_drawing_coordinate_X = mouse_up.offsetX;
            current_drawing_coordinate_Y = mouse_up.offsetY;
        };
        if (pen_er_mode && drawing_mode && content !== null && current_drawing_coordinate_X !== null && current_drawing_coordinate_Y !== null){
            content.lineTo(current_drawing_coordinate_X, current_drawing_coordinate_Y);
            content.stroke();
        };
        drawing_mode = false;
        pen_er_mode = false;
    });
    canvas.addEventListener('mouseleave', () =>{
        drawing_mode = false;
    });
    if (imported_content_base64 !== null && content !== null){
        const imported_canvas_content = new Image();
        imported_canvas_content.onload = function() {
            content.drawImage(imported_canvas_content, 0, 0);
        };
        imported_canvas_content.src = imported_content_base64;
    };
    canvas.style.pointerEvents = 'none';
};
function add_listeners_imported_textfield(textfield: HTMLParagraphElement, X_textfield: number, Y_textfield: number, width_textfield: number, height_textfield: number, content: string){
        textfield.style.zIndex = "0";
        textfield.addEventListener('click', (event: MouseEvent) =>{
            current_element = textfield
            event.stopPropagation();
            if (element_move_mode){
                element_to_move = current_element
                all_slides.forEach((slide) =>{
                    style_crosshair_cursor(slide);
                });
                all_slides_onslide_elements_pointer_events_off();
            };
        });
        textfield.addEventListener('contextmenu', (context_menu_click) => {
            context_menu_click.stopPropagation();
            context_menu_click.preventDefault();
            context_menu_textfield_const.style.display = 'flex';
            context_menu_textfield_const.style.left = `${context_menu_click.pageX}px`;
            context_menu_textfield_const.style.top = `${context_menu_click.pageY}px`;
            current_element = textfield
            context_menu_mathfield_const.style.display = 'none';
            context_menu_picture_const.style.display = 'none';
        }, true);
        textfield.style.left = `${X_textfield}px`;
        textfield.style.top = `${Y_textfield}px`;
        textfield.style.width = `${width_textfield}px`;
        textfield.style.minHeight = `${height_textfield}px`;
        textfield.textContent = content;
        textfield.classList.add('textfield_on_slide');
        textfield.contentEditable = "true";
        textfields.push(textfield);
};
function add_listeners_imported_mathfield(slide: HTMLDivElement, mathfield: MathfieldElement, X_mathfield: number, Y_mathfield: number, content: string){
    mathfields.push(mathfield);
    mathfield.addEventListener('contextmenu', (context_menu_click: MouseEvent) => {
        context_menu_click.stopPropagation();
        context_menu_click.preventDefault();
        context_menu_mathfield_const.style.display = 'flex';
        context_menu_mathfield_const.style.left = `${context_menu_click.pageX}px`;
        context_menu_mathfield_const.style.top = `${context_menu_click.pageY}px`;
        current_element = (context_menu_click.target as HTMLElement).closest('.mathfield_cover');
        context_menu_textfield_const.style.display = 'none';
        context_menu_picture_const.style.display = 'none';
    });
    mathfield.addEventListener('click', (event: MouseEvent) =>{
        current_element = (event.target as HTMLElement).closest('.mathfield_cover');
        if (element_move_mode){
            all_slides_onslide_elements_pointer_events_off();
            event.stopPropagation();
            element_to_move = current_element
            all_slides.forEach((slide_1) =>{
                style_crosshair_cursor(slide_1);
            });
        };
    });
    const new_mathfield_cover: HTMLDivElement = document.createElement('div');
    new_mathfield_cover.classList.add('mathfield_cover');
    new_mathfield_cover.style.position='absolute';
    new_mathfield_cover.style.left = `${X_mathfield}px`;
    new_mathfield_cover.style.top = `${Y_mathfield}px`;
    new_mathfield_cover.appendChild(mathfield);
    mathfield.value = content;
    mathfield.classList.add('mathfield_default')
    slide.appendChild(new_mathfield_cover);
};
function add_listeners_imported_picture(slide: HTMLDivElement, image: HTMLImageElement, X_image: number, Y_image: number, width_image: number, height_image: number, url_image: string){
    image.classList.add('picture_on_slide');
    image.style.position = 'absolute';
    image.style.left = `${X_image}px`;
    image.style.top = `${Y_image}px`;
    image.style.width = `${width_image}px`;
    image.style.height = `${height_image}px`;
    image.style.zIndex = "0";
    all_pictures_on_slides.push(image);
    image.addEventListener('click', (event: MouseEvent) =>{
        current_element = image
        event.stopPropagation();
        if (element_move_mode){
            element_to_move = current_element
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });
            all_slides_onslide_elements_pointer_events_off();
        };
    });
    image.addEventListener('contextmenu', (context_menu_click) => {
        context_menu_click.stopPropagation();
        context_menu_click.preventDefault();
        context_menu_picture_const.style.display = 'flex';
        context_menu_picture_const.style.left = `${context_menu_click.pageX}px`;
        context_menu_picture_const.style.top = `${context_menu_click.pageY}px`;
        current_element = image
        context_menu_mathfield_const.style.display = 'none';
        context_menu_textfield_const.style.display = 'none';
    }, true);
    image.src = url_image;
    slide.appendChild(image);
};
function read_file(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file){
        return;
    };
    const reader = new FileReader();
    reader.onload = function(e){
        const data = JSON.parse(e.target?.result as string);
        render_imported_data(data);
    };
    reader.readAsText(file);
};
function render_imported_data(data: any){
    if (data.slides !== undefined){
        for (const slide_ID in data.slides){
            const slide = document.createElement('div');
            slide.classList.add('main_field');
            main_field_const.appendChild(slide);
            all_slides.push(slide);
            imported_slide_add_listeners(slide);
            const slide_data = data.slides[slide_ID];
            const slide_width = slide.clientWidth;
            const slide_height = slide.clientHeight;
            alert(slide_height);
            const base64_canvas = (slide_data.canvas.url) ? slide_data.canvas.url : null;
            const imported_slide_canvas = document.createElement('canvas');
            imported_slide_canvas.width = slide_width;
            imported_slide_canvas.height = slide_height;
            add_free_drawing_listeners_imported_canvas(imported_slide_canvas, base64_canvas);
            all_canvas_fields.push(imported_slide_canvas);
            slide.appendChild(imported_slide_canvas);
            for (const textfield_ID in slide_data.textfields){
                const textfield_data = slide_data.textfields[textfield_ID];
                const X_textfield = textfield_data.X_textfield;
                const Y_textfield = textfield_data.Y_textfield;
                const width_textfield = textfield_data.width_textfield;
                const height_textfield = textfield_data.height_textfield;
                const textfield_content = textfield_data.content;
                const new_textfield = document.createElement('p');
                add_listeners_imported_textfield(new_textfield, X_textfield, Y_textfield, width_textfield, height_textfield, textfield_content);
                slide.appendChild(new_textfield);
                textfields.push(new_textfield);
            };
            for (const mathfield_ID in slide_data.mathfields){
                const mathfield_data = slide_data.mathfields[mathfield_ID];
                const X_mathfield = mathfield_data.X_mathfield;
                const Y_mathfield = mathfield_data.Y_mathfield;
                const mathfield_content = mathfield_data.content;
                const mathfield = document.createElement('math-field') as MathfieldElement;
                add_listeners_imported_mathfield(slide, mathfield, X_mathfield, Y_mathfield, mathfield_content);
            };
            for (const image_ID in slide_data.images){
                const image_data = slide_data.images[image_ID];
                const X_image = image_data.X_image;
                const Y_image = image_data.Y_image;
                const width_image = image_data.width_image;
                const height_image = image_data.height_image;
                const url_image = image_data.url_image;
                const imported_image = new Image();
                add_listeners_imported_picture(slide, imported_image, X_image, Y_image, width_image, height_image, url_image);
            };
        };
    };
};
function convert_image_url_to_base64(image: HTMLImageElement) {
    const temporary_canvas = document.createElement('canvas');
    const ctx = temporary_canvas.getContext('2d');
    temporary_canvas.width = image.width;
    temporary_canvas.height = image.height;
    if (ctx === null){
        return '';
    };
    ctx.drawImage(image, 0, 0, temporary_canvas.width, temporary_canvas.height);
    return temporary_canvas.toDataURL();
    temporary_canvas.remove();
};
function export_as_json(){
    const save_data: any = {
        slides: {}
    };
    all_slides.forEach((slide, index) =>{
        const slide_ID = `slide_${index+1}`;
        save_data.slides[slide_ID] = {
            id: slide_ID,
            textfields: {},
            mathfields: {},
            images: {},
            canvas: {}
        };
        const current_slide_data = save_data.slides[slide_ID];
        const textfields_on_slide = slide.querySelectorAll('.textfield_on_slide') as NodeListOf<HTMLParagraphElement>;
        textfields_on_slide.forEach((textfield, textfield_index) =>{
            const textfield_ID = `textfield_${textfield_index+1}`;
            current_slide_data.textfields[textfield_ID] = {
                X_textfield: parseFloat(textfield.style.left) || 0,
                Y_textfield: parseFloat(textfield.style.top) || 0,
                width_textfield: parseFloat(textfield.style.width) || 0,
                height_textfield: parseFloat(textfield.style.minHeight) || 0,
                content: textfield.textContent || ""
            };
        });
        const mathfield_covers_on_slide = slide.querySelectorAll('.mathfield_cover') as NodeListOf<HTMLDivElement>;
        mathfield_covers_on_slide.forEach((mathfield_cover, mathfield_index) =>{
            const mathfield_ID = `mathfield_${mathfield_index+1}`;
            const mathfield = mathfield_cover.firstElementChild as MathfieldElement;
            current_slide_data.mathfields[mathfield_ID] = {
                X_mathfield: parseFloat(mathfield_cover.style.left) || 0,
                Y_mathfield: parseFloat(mathfield_cover.style.top) || 0,
                content: mathfield.value || ""
            };
        });
        const images_on_slide = slide.querySelectorAll('.picture_on_slide') as NodeListOf<HTMLImageElement>;
        images_on_slide.forEach((image, image_index) =>{
            const image_ID = `image_${image_index+1}`;
            current_slide_data.images[image_ID] = {
                X_image: parseFloat(image.style.left) || 0,
                Y_image: parseFloat(image.style.top) || 0,
                width_image: parseFloat(image.style.width) || 0,
                height_image: parseFloat(image.style.height) || 0,
                url_image: convert_image_url_to_base64(image) || ""
            };
        });
        const canvas_on_slide = slide.querySelector('.canvas_on_slide') as HTMLCanvasElement;
        if (canvas_on_slide !== null){
            current_slide_data.canvas = {
                url: canvas_on_slide.toDataURL()
            };
        };
    });
    const JSON_data = JSON.stringify(save_data);
    const blob = new Blob([JSON_data], {type: 'application/json'});
    const temporary_link = document.createElement('a');
    temporary_link.href = URL.createObjectURL(blob);
    const file_name = prompt("Enter file name") || 'export';
    temporary_link.download = file_name + '.json';
    document.body.appendChild(temporary_link);
    temporary_link.click();
    document.body.removeChild(temporary_link);
    URL.revokeObjectURL(temporary_link.href);
}

                        // Export/import/save functions end










                        // Window lidtener start
window.addEventListener('click', (window_click) =>{
    if (!context_menu_mathfield_const.contains(window_click.target as Node)) {
        context_menu_mathfield_const.style.display = 'none';
        mathfield_to_remove = null;
    };
    if (!context_menu_textfield_const.contains(window_click.target as Node)) {
        context_menu_textfield_const.style.display = 'none';
    };
    if (!context_menu_picture_const.contains(window_click.target as Node)) {
        context_menu_picture_const.style.display = 'none';
    };
});
window.addEventListener('mouseup', (window_mouseup) =>{
    const clickedOutsideAllSlides = all_slides.every(slide => 
        !slide.contains(window_mouseup.target as Node)
    );
    const all_buttons: HTMLButtonElement[] = Array.from(document.querySelectorAll('button'))
    const clicked_out_all_buttons = all_buttons.every(button => 
        !button.contains(window_mouseup.target as Node)
    )
    const clicked_out_all_demonstrated_pictures = all_pictures_demonstrated.every(picture => {
        const picture_back = picture.parentElement;
        if (picture_back !== null) {
            return !picture_back.contains(window_mouseup.target as Node);
        };
    });
    if (clickedOutsideAllSlides && clicked_out_all_buttons && clicked_out_all_demonstrated_pictures && !drawing_mode_general) {
        slides_removeMode_off();
        element_move_mode_off();
        textfield_insert_mode_off();
        mathfield_insert_mode_off();
        resize_textfield_mode_off();
        all_slides_onslide_elements_pointer_events_on();
    };
    if (clicked_out_all_demonstrated_pictures && clickedOutsideAllSlides && !drawing_mode_general){
        pictures_insert_mode_off();
    };
});
document.addEventListener('contextmenu', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target && target.closest('math-field')) {
    e.preventDefault();
  };
}, true);
window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        shift_key_pressed = true;
    }
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
        ctrl_key_pressed = true;
    }
});
window.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        shift_key_pressed = false;
    }
});
window.addEventListener('keyup', (event) => {
    if (event.key === 'Control') {
        ctrl_key_pressed = false;
    }
});
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = true; 
});
                        // Window listener end










                        // Add slide btn start
all_slides.forEach(slide =>{
    new_slide_add_listeners(slide);
});
slide_add_btn_const.addEventListener('click', () => {
    slides_removeMode_off();
    element_move_mode_off();
    textfield_insert_mode_off();
    mathfield_insert_mode_off();
    drawing_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    all_slides_onslide_elements_pointer_events_on();
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    main_field_const.appendChild(slide);
    all_slides.push(slide);
    new_slide_add_listeners(slide);
});
                        // Add slide btn end


                        // Remove slide btn start
slide_remove_btn_const.addEventListener('click', () => {
    drawing_mode_off();
    mathfield_insert_mode_off()
    element_move_mode_off()
    textfield_insert_mode_off()
    resize_textfield_mode_off()
    resize_picture_mode_off()
    pictures_insert_mode_off()
    all_slides.forEach(slide => {
        style_not_allowed_cursor(slide)
        if (!slide_removeMode) {
            const control_and_style_slide_to_remove_const1 = control_and_style_slide_to_remove.bind(null, slide);
            slide_controllers.set(slide, control_and_style_slide_to_remove_const1);
            slide.addEventListener('click', control_and_style_slide_to_remove_const1);
        } else {
            const control_and_style_slide_to_remove_const2 = slide_controllers.get(slide)
            if (control_and_style_slide_to_remove_const2 !== undefined) {
                slide.removeEventListener('click', control_and_style_slide_to_remove_const2);
                style_default_cursor(slide)
            };
        };
    });
    if (!slide_removeMode){
        all_slides_onslide_elements_pointer_events_off();
        slide_removeMode = true;
        slide_remove_btn_const.style.backgroundColor = "#858585";
    } else {
        all_slides_onslide_elements_pointer_events_on();
        slide_removeMode = false;
        slides_remove()
        slide_remove_btn_const.style.backgroundColor = "#bababa";
    };
});
                        // Remove slide btn end


                        // Move mode start
move_element_btn_const.addEventListener('click', ()=>{
    if (!element_move_mode){
        element_move_mode = true;
        mathfield_insert_mode_off();
        slides_removeMode_off();
        textfield_insert_mode_off();
        pictures_insert_mode_off();
        resize_textfield_mode_off();
        drawing_mode_off();
        resize_picture_mode_off();
        slides_removeMode_off();
        move_element_btn_const.style.backgroundColor = '#858585';
    } else {
        element_to_move = null;
        element_move_mode_off();
        mathfield_insert_mode_off();
        slides_removeMode_off();
        textfield_insert_mode_off();
        pictures_insert_mode_off();
        resize_textfield_mode_off();
        drawing_mode_off();
        resize_picture_mode_off();
        all_slides_onslide_elements_pointer_events_on();
    };
});
                        // Move mode end


                        // Add mathfield btn start
insert_mathfield_btn.addEventListener('click', ()=>{
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    resize_textfield_mode_off();
    textfield_insert_mode_off();
    drawing_mode_off();
    resize_picture_mode_off();
    all_slides.forEach(slide =>{
        if (!insert_mode_mathfield) {
            style_crosshair_cursor(slide)
            const add_mathfield_const1 = add_mathfield.bind(null, slide);
            mathfield_slide_insert_controllers.set(slide, add_mathfield_const1)
            slide.addEventListener('click', add_mathfield_const1);
            insert_mathfield_btn.style.backgroundColor = "#858585";
        };
    });
    if (!insert_mode_mathfield) {
        all_slides_onslide_elements_pointer_events_off();
        insert_mode_mathfield = true;
    } else {
        mathfield_insert_mode_off()
        all_slides_onslide_elements_pointer_events_on();
    }
});
                        // Add mathfield btn end


                        // Remove mathfield btn start
mathfield_remove_btn_const.addEventListener('click', ()=>{
    mathfield_to_remove_cover = current_element;
    mathfield_to_remove = mathfield_to_remove_cover?.firstElementChild as MathfieldElement || null;
    if (mathfield_to_remove_cover !== null && mathfield_to_remove_cover.firstElementChild instanceof MathfieldElement && mathfield_to_remove !== null && shift_key_pressed){
        mathfield_to_remove_cover.remove();
        mathfield_slide_insert_controllers.delete(mathfield_to_remove);
        const mathfield_to_remove_index = mathfields.indexOf(mathfield_to_remove)
        mathfields.splice(mathfield_to_remove_index, 1)
        mathfield_to_remove = null;
        context_menu_mathfield_const.style.display = 'none';
    };
    if(mathfield_to_remove_cover !== null && mathfield_to_remove_cover.firstElementChild instanceof MathfieldElement && mathfield_to_remove !== null && !shift_key_pressed){
    alert("Hold Shift and click 'Remove' to delete the mathfield");
    };
});
                        // Remove mathfield btn end


                        // Mathfield move btn start
mathfield_move_btn_const.addEventListener('click', ()=>{
    if (!element_move_mode){
        mathfield_insert_mode_off();
        pictures_insert_mode_off();
        textfield_insert_mode_off();
        resize_textfield_mode_off();
        drawing_mode_off();
        resize_picture_mode_off();
        slides_removeMode_off();
        all_slides_onslide_elements_pointer_events_off();
        element_to_move = current_element;
        all_slides.forEach((slide) => {
            style_crosshair_cursor(slide)
    });
    element_move_mode = true;
    move_element_btn_const.style.backgroundColor = '#858585';
    };
    context_menu_mathfield_const.style.display = 'none';
});
                        // Mathfield move btn end


                        // Add textfield start
insert_textfield_btn_const.addEventListener('click', ()=>{
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    drawing_mode_off();
    resize_picture_mode_off();
    all_slides_onslide_elements_pointer_events_off();
    all_slides.forEach((slide: HTMLDivElement) =>{
        if (!textfield_insert_mode) {
            style_crosshair_cursor(slide)
            const textfield_insert_const = textfield_insert.bind(slide);
            textfield_insert_controllers.set(slide, textfield_insert_const)
            slide.addEventListener('mouseup', textfield_insert_const);
            insert_textfield_btn_const.style.backgroundColor = "#858585";
        };
    });
    if (!textfield_insert_mode){
        textfield_insert_mode = true;
    } else {
        textfield_insert_mode_off();
        all_slides_onslide_elements_pointer_events_on();
    };
});
                        // Add textfield end
                        // Remove textfield start
remove_textfield_btn_const.addEventListener('click', () => {
    if (shift_key_pressed){
        const textfield_to_remove = current_element;
        if (textfield_to_remove !== null && textfield_to_remove instanceof HTMLParagraphElement){
            textfield_to_remove.remove();
            const textfield_to_remove_index = textfields.indexOf(textfield_to_remove)
            textfields.splice(textfield_to_remove_index, 1)
            context_menu_textfield_const.style.display = 'none';
        };
    } else {
        const textfield_to_remove = current_element
        if (textfield_to_remove !== null && textfield_to_remove instanceof HTMLParagraphElement){
            alert("Hold Shift and click 'Remove' to delete the textfield");
        };
    };
});
                        // Remove textfield end
                        // Move textfield start
move_textfield_btn_const.addEventListener('click', (event) => {
    if (!element_move_mode){
        slides_removeMode_off();
        pictures_insert_mode_off();
        mathfield_insert_mode_off();
        resize_textfield_mode_off();
        drawing_mode_off();
        resize_picture_mode_off();
        textfield_insert_mode_off();
        element_to_move = current_element;
        event.stopPropagation();
        all_slides_onslide_elements_pointer_events_off();
        all_slides.forEach((slide) => {
            style_crosshair_cursor(slide)
        });
    };
    element_move_mode = true;
    move_element_btn_const.style.backgroundColor = '#858585';
    context_menu_textfield_const.style.display = 'none';
});
                        // Move textfield end
                        // Resize textfield start
//
resize_textfield_btn_const.addEventListener('click', (event) => {
        if (current_element !== null && current_element instanceof HTMLParagraphElement){
        const textfield_to_resize = current_element;
        context_menu_textfield_const.style.display = 'none';
        if (textfield_to_resize !== null){
            event.stopPropagation();
            all_slides_onslide_elements_pointer_events_off();
            slide_with_to_resize_textfield = textfield_to_resize.parentElement as HTMLDivElement || null;
            if (slide_with_to_resize_textfield !== null){
                style_crosshair_cursor(slide_with_to_resize_textfield);
                slide_with_to_resize_textfield.addEventListener('click', resize_textfield);
            };
        };
    };
});
                        // Resize textfield end
                        // Picture insert btn start
upload_picture_button_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    textfield_insert_mode_off();
    drawing_mode_off();
    resize_picture_mode_off();
    picture_upload_input_const.click();
});
picture_upload_input_const.addEventListener('change', () => {
    const pictures_input = picture_upload_input_const.files;
    if (pictures_input !== null && pictures_input.length > 0){
        Array.from(pictures_input).forEach((picture_input) => {
            const picture_url = URL.createObjectURL(picture_input);
            uploaded_picture_demonstrate(picture_url);
        });
    };
});
move_picture_btn_const.addEventListener('click', (event) => {
    if (!element_move_mode){
        element_to_move = current_element;
        event.stopPropagation();
        all_slides_onslide_elements_pointer_events_off();
        all_slides.forEach((slide) => {
            style_crosshair_cursor(slide)
        });
    };
    element_move_mode = true;
    move_element_btn_const.style.backgroundColor = '#858585';
    context_menu_picture_const.style.display = 'none';
});
remove_picture_btn_const.addEventListener('click', () => {
    if (shift_key_pressed){
        const picture_to_remove = current_element;
        if (picture_to_remove !== null && picture_to_remove instanceof HTMLImageElement){
            picture_to_remove.remove();
            const picture_to_remove_index = all_pictures_on_slides.indexOf(picture_to_remove)
            all_pictures_on_slides.splice(picture_to_remove_index, 1)
            context_menu_picture_const.style.display = 'none';
        };
    } else {
        const picture_to_remove = current_element;
        if (picture_to_remove !== null && picture_to_remove instanceof HTMLImageElement){
            alert("Hold Shift and click 'Remove' to delete the picture");
        }
    }

});
resize_picture_btn_const.addEventListener('click', (event) => {
    if (current_element !== null && current_element instanceof HTMLImageElement){
        slide_with_to_resize_picture = current_element?.parentElement as HTMLDivElement || null;
    }
    context_menu_picture_const.style.display = 'none';
    if (slide_with_to_resize_picture !== null){
        event.stopPropagation();
        all_slides_onslide_elements_pointer_events_off();
        style_crosshair_cursor(slide_with_to_resize_picture);
        slide_with_to_resize_picture.addEventListener('click', resize_picture_const);
    };
});
                        // Picture insert btn end
                        // Drawing btn start
activate_drawing_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    } else {
        drawing_mode_off();
        activate_drawing_btn_const.style.backgroundColor = '#bababa';
        drawing_mode_general = false;
    };
});
pencil_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    if (!pencil_mode){
        pencil_mode = true;
        eraser_mode = false;
        line_mode = false;
        pencil_btn_const.style.backgroundColor = '#858585';
        eraser_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#bababa';
    } else {
        pencil_mode = true;
        eraser_mode = false;
        line_mode = false;
        pencil_btn_const.style.backgroundColor = '#bababa';
        eraser_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#bababa';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
eraser_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    if (!eraser_mode){
        pencil_mode = false;
        eraser_mode = true;
        line_mode = false;
        pencil_btn_const.style.backgroundColor = '#bababa';
        eraser_btn_const.style.backgroundColor = '#858585';
        line_btn_const.style.backgroundColor = '#bababa';
    } else {
        pencil_mode = false;
        eraser_mode = false;
        line_mode = false;
        eraser_btn_const.style.backgroundColor = '#bababa';
        pencil_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#bababa';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
line_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    if (!line_mode){
        pencil_mode = false;
        eraser_mode = false;
        line_mode = true;
        pencil_btn_const.style.backgroundColor = '#bababa';
        eraser_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#858585';
    } else {
        pencil_mode = false;
        eraser_mode = false;
        line_mode = false;
        eraser_btn_const.style.backgroundColor = '#bababa';
        pencil_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#bababa';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
line_range_input_const.addEventListener('input', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    // line_size = parseInt(line_range_input_const.value);
    if (!line_mode){
        pencil_mode = false;
        eraser_mode = false;
        line_mode = true;
        pencil_btn_const.style.backgroundColor = '#bababa';
        eraser_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#858585';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
pencil_range_input_const.addEventListener('input', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    pencil_size = parseInt(pencil_range_input_const.value);
    if (!pencil_mode){
        pencil_mode = true;
        eraser_mode = false;
        line_mode = false;
        pencil_btn_const.style.backgroundColor = '#858585';
        eraser_btn_const.style.backgroundColor = '#bababa';
        line_btn_const.style.backgroundColor = '#bababa';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
eraser_range_input_const.addEventListener('input', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    eraser_size = parseInt(eraser_range_input_const.value);
    if (!eraser_mode){
        pencil_mode = false;
        eraser_mode = true;
        line_mode = false;
        pencil_btn_const.style.backgroundColor = '#bababa';
        eraser_btn_const.style.backgroundColor = '#858585';
        line_btn_const.style.backgroundColor = '#bababa';
    };
    if (!drawing_mode_general){
        drawing_mode_on();
        drawing_mode_general = true;
    };
});
                        // Drawing btn end
                        // Export/import/save btns start
export_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    export_as_pdf();
    all_slides_onslide_elements_pointer_events_on();
});
                        // Export/import/save btns end
save_btn_const.addEventListener('click', () => {
    textfield_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    element_move_mode_off();
    pictures_insert_mode_off();
    drawing_mode_off();
    slides_removeMode_off();
    all_slides_onslide_elements_pointer_events_on();
    export_as_json();
});
upload_file_btn_const.addEventListener('click', () => {
    element_move_mode_off();
    slides_removeMode_off();
    pictures_insert_mode_off();
    mathfield_insert_mode_off();
    resize_textfield_mode_off();
    resize_picture_mode_off();
    textfield_insert_mode_off();
    file_upload_input_const.click();
});
file_upload_input_const.addEventListener('change', (event) => {
    all_slides.forEach(slide => {
        slide.remove();
    });
    all_slides.length = 0;
    read_file(event);
});