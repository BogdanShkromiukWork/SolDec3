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
const slide_controllers = new Map()
const slide_add_btn_const = document.getElementById('slide_add_btn') as HTMLButtonElement;
const slide_remove_btn_const = document.getElementById('slide_remove_btn') as HTMLButtonElement;
const all_slides: HTMLDivElement[] = Array.from(document.querySelectorAll('.main_field')) as HTMLDivElement[]; //Universe
let slide_removeMode = false;
let slidesToRemove: HTMLDivElement[] = [];
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
                        // Add/remove/move pictures btns constants end
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
            if (element_on_slide instanceof MathfieldElement) {
                const index_mathfield_on_deleted_slide = mathfields.indexOf(element_on_slide)
                mathfields.splice(index_mathfield_on_deleted_slide, 1);
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
                        // Add/remove slide btns functions end


                        // Move field functions start
function move_element_to(){
    if (current_slide !== null && element_to_move !== null){
        const current_slide_width = current_slide.getBoundingClientRect().width - 10;
        const current_slide_height = current_slide.getBoundingClientRect().height - 10;
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
            (mathfield).style.display = 'none';
    });
    all_slides.forEach((slide) =>{
        Array.from(slide.children).forEach((child: any) =>{
            if (!(child instanceof HTMLCanvasElement)){
                child.style.pointerEvents = 'none';
            };
    });
});
};
function all_slides_onslide_elements_except_drawings_pointer_events_on(){
    mathfields.forEach((mathfield) => {
        mathfield.style.display = 'inline-block';
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
        const current_slide_width = current_slide.getBoundingClientRect().width - 10;
        const current_slide_height = current_slide.getBoundingClientRect().height - 10;
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
        new_textfield.contentEditable = "true";
        new_textfield.style.position='absolute';
        new_textfield.style.border = "1px solid black";
        new_textfield.style.margin = "0px";
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
        if ((width_textfield + X_textfield) <= mouseup_slide.getBoundingClientRect().width-12){
            if (width_textfield >= 20){
                new_textfield.style.width = `${width_textfield}px`;
            } else {
                new_textfield.style.width = `20px`;
            };
        }
        if (width_textfield + X_textfield > mouseup_slide.getBoundingClientRect().width - 12){
            if (mouseup_slide.getBoundingClientRect().width - 12 - X_textfield >= 20){
                new_textfield.style.width = `${mouseup_slide.getBoundingClientRect().width - X_textfield-12}px`;
            } else {
                new_textfield.style.width = `20px`;
                new_textfield.style.left = `${mouseup_slide.getBoundingClientRect().width - 32}px`;
            };
        };
        if (height_textfield + Y_textfield <= mouseup_slide.getBoundingClientRect().height - 12){
            if (height_textfield >= 20){
            new_textfield.style.minHeight = `${height_textfield}px`;
            } else {
            new_textfield.style.minHeight = `20px`;
            };
        };
        if (height_textfield + Y_textfield > mouseup_slide.getBoundingClientRect().height - 12){
            if (mouseup_slide.getBoundingClientRect().height - 12 - Y_textfield >= 20){
                new_textfield.style.minHeight = `${mouseup_slide.getBoundingClientRect().height - Y_textfield-12}px`;
            } else {
                new_textfield.style.minHeight = `20px`;
                new_textfield.style.top = `${mouseup_slide.getBoundingClientRect().height - 32}px`;
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
            const current_textfield_width = current_textfield.getBoundingClientRect().width - 2;
            const current_textfield_height = current_textfield.getBoundingClientRect().height - 2;
            const current_slide_width = current_slide.getBoundingClientRect().width - 10;
            const current_slide_height = current_slide.getBoundingClientRect().height - 10;
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
};
function resize_textfield_mode_off(){
    slide_with_to_resize_textfield?.removeEventListener('click', resize_textfield);
    if (slide_with_to_resize_textfield !== null){
        style_default_cursor(slide_with_to_resize_textfield);
    };
    all_slides_onslide_elements_pointer_events_on();
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
        };
        if (click.isTrusted && picture_in_insert_mode && !picture_in_insert_mode_inside_check){
            pictures_insert_mode_off();
            picture_in_insert_mode_inside_check = true;
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
            if ((width_picture + X_picture) <= mouseup_slide.getBoundingClientRect().width-10){
                if (width_picture >= 20){
                    new_picture_on_slide.style.width = `${width_picture}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    height_picture = 20 * height_to_width_ratio;
                };
            }
            if (width_picture + X_picture > mouseup_slide.getBoundingClientRect().width - 10){
                if (mouseup_slide.getBoundingClientRect().width - 10 - X_picture >= 20){
                    X_picture = mouseup_slide.getBoundingClientRect().width - X_picture-10;
                    if (X_picture >= 0){
                        new_picture_on_slide.style.width = `${X_picture}px`;
                    } else {
                        X_picture = 0;
                        new_picture_on_slide.style.width = `${X_picture}px`;
                        width_picture = mouseup_slide.getBoundingClientRect().width - 10;
                        height_picture = width_picture * height_to_width_ratio;
                    };
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    new_picture_on_slide.style.left = `${mouseup_slide.getBoundingClientRect().width - 30}px`;
                    height_picture = 20 * height_to_width_ratio;
                };
            };
            if (height_picture + Y_picture <= mouseup_slide.getBoundingClientRect().height - 10){
                new_picture_on_slide.style.height = `${height_picture}px`;
            };
            if (height_picture + Y_picture > mouseup_slide.getBoundingClientRect().height - 10){
                Y_picture = mouseup_slide.getBoundingClientRect().height - height_picture - 10;
                if (Y_picture >= 0){
                    new_picture_on_slide.style.height = `${height_picture}px`;
                    new_picture_on_slide.style.top = `${Y_picture}px`;
                } else {
                    Y_picture = 0;
                    new_picture_on_slide.style.top = `${Y_picture}px`;
                    new_picture_on_slide.style.height = `${mouseup_slide.getBoundingClientRect().height - 10}px`;
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
            if ((width_picture + X_picture) <= mouseup_slide.getBoundingClientRect().width-12){
                if (width_picture >= 20){
                    new_picture_on_slide.style.width = `${width_picture}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                };
            }
            if (width_picture + X_picture > mouseup_slide.getBoundingClientRect().width - 12){
                if (mouseup_slide.getBoundingClientRect().width - 12 - X_picture >= 20){
                    new_picture_on_slide.style.width = `${mouseup_slide.getBoundingClientRect().width - X_picture-12}px`;
                } else {
                    new_picture_on_slide.style.width = `20px`;
                    new_picture_on_slide.style.left = `${mouseup_slide.getBoundingClientRect().width - 32}px`;
                };
            };
            if (height_picture + Y_picture <= mouseup_slide.getBoundingClientRect().height - 12){
                if (height_picture >= 20){
                new_picture_on_slide.style.height = `${height_picture}px`;
                } else {
                new_picture_on_slide.style.minHeight = `20px`;
                };
            };
            if (height_picture + Y_picture > mouseup_slide.getBoundingClientRect().height - 12){
                if (mouseup_slide.getBoundingClientRect().height - 12 - Y_picture >= 20){
                    new_picture_on_slide.style.minHeight = `${mouseup_slide.getBoundingClientRect().height - Y_picture-12}px`;
                } else {
                    new_picture_on_slide.style.minHeight = `20px`;
                    new_picture_on_slide.style.top = `${mouseup_slide.getBoundingClientRect().height - 32}px`;
                };
            };
        };
        mousedown_slide.appendChild(new_picture_on_slide);
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
}

                        // Add/remove/move pictures btns functions end










                        // Window lidtener start
window.addEventListener('click', (window_click) =>{
    if (!context_menu_mathfield_const.contains(window_click.target as Node)) {
        context_menu_mathfield_const.style.display = 'none';
        mathfield_to_remove = null;
    };
    if (!context_menu_textfield_const.contains(window_click.target as Node)) {
        context_menu_textfield_const.style.display = 'none';
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
    if (clickedOutsideAllSlides && clicked_out_all_buttons) {
        slides_removeMode_off();
        element_move_mode_off();
        textfield_insert_mode_off();
        mathfield_insert_mode_off();
        all_slides_onslide_elements_pointer_events_on();
    };
    if (clicked_out_all_demonstrated_pictures && clickedOutsideAllSlides){
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
                        // Window listener end










                        // Add slide btn start
all_slides.forEach(slide =>{
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
});
slide_add_btn_const.addEventListener('click', () => {
    slides_removeMode_off();
    element_move_mode_off();
    textfield_insert_mode_off();
    mathfield_insert_mode_off()
    all_slides_onslide_elements_pointer_events_on();
    insert_mode_mathfield = false
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    const main_field_const = document.getElementById('back_main_field') as HTMLDivElement;
    main_field_const.appendChild(slide);
    all_slides.push(slide);
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
            all_slides_onslide_elements_pointer_events_on();
            move_element_to()
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
});
                        // Add slide btn end


                        // Remove slide btn start
slide_remove_btn_const.addEventListener('click', () => {
    mathfield_insert_mode_off()
    element_move_mode_off()
    textfield_insert_mode_off()
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
        move_element_btn_const.style.backgroundColor = '#858585';
    } else {
        element_to_move = null;
        element_move_mode_off();
        mathfield_insert_mode_off();
        slides_removeMode_off();
        all_slides_onslide_elements_pointer_events_on();
    };
});
                        // Move mode end


                        // Add mathfield btn start
insert_mathfield_btn.addEventListener('click', ()=>{
    textfield_insert_mode_off();
    slides_removeMode_off();
    element_move_mode_off();
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
    if (mathfield_to_remove_cover !== null && mathfield_to_remove_cover.firstElementChild instanceof MathfieldElement && mathfield_to_remove !== null){
        mathfield_to_remove_cover.remove();
        mathfield_slide_insert_controllers.delete(mathfield_to_remove);
        const mathfield_to_remove_index = mathfields.indexOf(mathfield_to_remove)
        mathfields.splice(mathfield_to_remove_index, 1)
        mathfield_to_remove = null;
        context_menu_mathfield_const.style.display = 'none';
    };
});
                        // Remove mathfield btn end


                        // Mathfield move btn start
mathfield_move_btn_const.addEventListener('click', ()=>{
    if (!element_move_mode){
        mathfield_insert_mode_off();
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
    mathfield_insert_mode_off();
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
    const textfield_to_remove = current_element;
    if (textfield_to_remove !== null && textfield_to_remove instanceof HTMLParagraphElement){
        textfield_to_remove.remove();
        const textfield_to_remove_index = textfields.indexOf(textfield_to_remove)
        textfields.splice(textfield_to_remove_index, 1)
        context_menu_textfield_const.style.display = 'none';
    };
});
                        // Remove textfield end
                        // Move textfield start
move_textfield_btn_const.addEventListener('click', (event) => {
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
    context_menu_textfield_const.style.display = 'none';
});
                        // Move textfield end
                        // Resize textfield start
//
resize_textfield_btn_const.addEventListener('click', (event) => {
    const textfield_to_resize = current_element;
    context_menu_textfield_const.style.display = 'none';
    if (textfield_to_resize !== null){
        event.stopPropagation();
        all_slides_onslide_elements_pointer_events_off();
        slide_with_to_resize_textfield = textfield_to_resize.parentElement;
        if (slide_with_to_resize_textfield !== null){
            style_crosshair_cursor(slide_with_to_resize_textfield);
            slide_with_to_resize_textfield.addEventListener('click', resize_textfield);
        };
    };
});
                        // Resize textfield end
                        // Picture insert btn start
upload_picture_button_const.addEventListener('click', () => {
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
    const picture_to_remove = current_element;
    if (picture_to_remove !== null && picture_to_remove instanceof HTMLImageElement){
        picture_to_remove.remove();
        const picture_to_remove_index = all_pictures_on_slides.indexOf(picture_to_remove)
        all_pictures_on_slides.splice(picture_to_remove_index, 1)
        context_menu_picture_const.style.display = 'none';
    };
});

                        // Picture insert btn end