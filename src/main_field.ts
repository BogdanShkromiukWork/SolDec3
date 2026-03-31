// setTimeout(() => {
//     alert('test');
// }, 0);
                        // Conetxt menu constants start
const context_menu_mathfield_const = document.getElementById('context_menu_mathfield') as HTMLDivElement;
let current_element: any = null;
let element_to_move: any = null;
let element_move_mode = false;
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
let mathfield_to_remove: MathfieldElement | null = null;
const mathfield_move_btn_const = document.getElementById('mathfield_move_btn') as HTMLButtonElement;
                        // Add/remove/move mathfield btns constants end
                        // Add/remove/move textfield btns constants end
//
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
let mousedown_test: boolean = false;
let mousedown_marker: HTMLDivElement | null = null;
                        // Add/remove/move textfield btns constants end
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
}
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
}
                        // Add/remove slide btns functions end


                        // Move field functions start
function move_element_to(){
    element_to_move.style.left = `${X_coordinate_slide_click}px`
    element_to_move.style.top =  `${Y_coordinate_slide_click}px`
    if (current_slide !== null){
        current_slide.appendChild(element_to_move)
        element_to_move = null;
        all_slides.forEach((slide) =>{
            style_default_cursor(slide);
            element_move_mode = false;
            move_element_btn_const.style.backgroundColor = '#bababa';
            slide.classList.remove('intercept_mode_child_off');
        });
    }
};
function element_move_mode_off(){
    element_to_move = null;
    if(element_move_mode){
        all_slides.forEach((slide) =>{
            style_default_cursor(slide)
            slide.classList.remove('intercept_mode_child_off');
        });
    };
    element_move_mode = false;
    move_element_btn_const.style.backgroundColor = '#bababa';
};
                        // Move field functions end


                        // Add/remove/move mathfield btns functions start
function style_crosshair_cursor (slide_cursor_change: any){
    slide_cursor_change.style.cursor = "crosshair"
};
function add_mathfield (slide: HTMLDivElement){
    const new_mathfield = new MathfieldElement();
    new_mathfield.style.position='absolute';
    new_mathfield.style.left = `${X_coordinate_slide_click}px`;
    new_mathfield.style.top = `${Y_coordinate_slide_click}px`;
    mathfields.push(new_mathfield)
    insert_mode_mathfield = false;
    new_mathfield.addEventListener('contextmenu', (context_menu_click) => {
        context_menu_click.stopPropagation();
        context_menu_click.preventDefault();
        context_menu_mathfield_const.style.display = 'flex';
        context_menu_mathfield_const.style.left = `${context_menu_click.pageX}px`;
        context_menu_mathfield_const.style.top = `${context_menu_click.pageY}px`;
        current_element = new_mathfield
    });
    new_mathfield.addEventListener('click', (event: MouseEvent) =>{
        event.stopPropagation();
        current_element = new_mathfield
        if (element_move_mode){
            element_to_move = current_element
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });

        };
    });
    slide.appendChild(new_mathfield);
    new_mathfield.classList.add('mathfield_default')
    new_mathfield.focus();
    mathfield_insert_mode_off()
};
function mathfield_insert_mode_off (){
    insert_mode_mathfield = false;
    all_slides.forEach(slide => {
        const slide_to_turn_off_mathfield_insert_mode = mathfield_slide_insert_controllers.get(slide)
        slide.removeEventListener('click', slide_to_turn_off_mathfield_insert_mode)
        style_default_cursor(slide)
        slide.classList.remove('intercept_mode_child_off');
    });
    insert_mathfield_btn.style.backgroundColor = "#bababa";
};

                        // Add/remove/move mathfield btns functions end
                        // Add/remove/move textfield btns functions start
function textfield_insert(){
    if (mousedown_slide === mouseup_slide && mousedown_slide !== null && textfield_insert_mode){
        const new_textfield = document.createElement('p');
        new_textfield.contentEditable = "true";
        new_textfield.style.position='absolute';
        new_textfield.style.border = "1px solid black";
        const X_textfield = Math.min(X_mousedown!, X_mouseup!) - 5;
        const Y_textfield = Math.min(Y_mousedown!, Y_mouseup!) - 5;
        const width_textfield = Math.abs(X_mousedown! - X_mouseup!) + 5;
        const height_textfield = Math.abs(Y_mousedown! - Y_mouseup!) + 5;
        new_textfield.style.width = `${width_textfield}px`;
        new_textfield.style.height = `${height_textfield}px`;
        new_textfield.style.left = `${X_textfield}px`;
        new_textfield.style.top = `${Y_textfield}px`;
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
            };
        });
        new_textfield.addEventListener('contextmenu', (context_menu_click) => {
            context_menu_click.stopPropagation();
            context_menu_click.preventDefault();
            context_menu_textfield_const.style.display = 'flex';
            context_menu_textfield_const.style.left = `${context_menu_click.pageX}px`;
            context_menu_textfield_const.style.top = `${context_menu_click.pageY}px`;
            current_element = new_textfield
        }, true);
        textfields.push(new_textfield)
        textfield_insert_mode = false;
        textfield_insert_mode_off();
    };
};
function textfield_insert_mode_off() {
    all_slides.forEach((slide) =>{
        const textfield_insert_const = textfield_insert_controllers.get(slide)
        if (textfield_insert_const !== undefined) {
            slide.removeEventListener('mouseup', textfield_insert_const)
        }
        style_default_cursor(slide)
        slide.classList.remove('intercept_mode_child_off');
    });
    textfield_insert_mode = false;
    insert_textfield_btn_const.style.backgroundColor = "#bababa";
};
                        // Add/remove/move textfield btns functions end










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
    all_slides.forEach(slide =>{
        if (!slide.contains(window_mouseup.target as Node)){
            textfield_insert_mode_off();
            mousedown_test = false;
        }
    });
});
document.addEventListener('contextmenu', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target && target.closest('math-field')) {
    e.preventDefault();
  }
}, true);
                        // Window listener end










                        // Add slide btn start
all_slides.forEach(slide =>{
    slide.addEventListener('click', (event) =>{
        X_coordinate_slide_click = event.offsetX
        Y_coordinate_slide_click = event.offsetY
        current_slide = slide;
        if (element_to_move !== null) {
            move_element_to()
        };
    });
    slide.addEventListener('mousedown', (event) =>{
        X_mousedown = event.offsetX
        Y_mousedown = event.offsetY
        mousedown_slide = slide;
        mousedown_test = true;
    });
    slide.addEventListener('mouseup', (event) =>{
        X_mouseup = event.offsetX
        Y_mouseup = event.offsetY
        mouseup_slide = slide;
        mousedown_test = false;
    });
});
slide_add_btn_const.addEventListener('click', () => {
    slides_removeMode_off();
    element_move_mode_off();
    textfield_insert_mode_off();
    insert_mode_mathfield = false
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    slide.addEventListener('click', (event) =>{
        X_coordinate_slide_click = event.offsetX
        Y_coordinate_slide_click = event.offsetY
        current_slide = slide;
        if (element_to_move !== null) {
            move_element_to()
        };
    });
    slide.addEventListener('mousedown', (event) =>{
        X_mousedown = event.offsetX
        Y_mousedown = event.offsetY
        mousedown_slide = slide;
    });
    slide.addEventListener('mouseup', (event) =>{
        X_mouseup = event.offsetX
        Y_mouseup = event.offsetY
        mouseup_slide = slide;
    });
    const main_field_const = document.getElementById('back_main_field') as HTMLDivElement;
    main_field_const.appendChild(slide);
    all_slides.push(slide);
    mathfield_insert_mode_off()
});
                        // Add slide btn end


                        // Remove slide btn start
slide_remove_btn_const.addEventListener('click', () => {
    mathfield_insert_mode_off()
    element_move_mode_off()
    textfield_insert_mode_off()
    insert_mode_mathfield = false
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
        slide_removeMode = true;
        slide_remove_btn_const.style.backgroundColor = "#858585";
    } else {
        slide_removeMode = false;
        slides_remove()
        slide_remove_btn_const.style.backgroundColor = "#bababa";
    }
});
                        // Remove slide btn end


                        // Move mode start
move_element_btn_const.addEventListener('click', ()=>{
    if (!element_move_mode){
        element_move_mode = true;
        mathfield_insert_mode_off();
        slides_removeMode_off();
        move_element_btn_const.style.backgroundColor = '#858585';
    } else {
        element_to_move = null;
        element_move_mode_off();
        mathfield_insert_mode_off();
        slides_removeMode_off();
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
            slide.classList.add('intercept_mode_child_off');
            const add_mathfield_const1 = add_mathfield.bind(null, slide);
            mathfield_slide_insert_controllers.set(slide, add_mathfield_const1)
            slide.addEventListener('click', add_mathfield_const1);
            insert_mathfield_btn.style.backgroundColor = "#858585";
        };
    });
    if (!insert_mode_mathfield) {
        insert_mode_mathfield = true;
    } else {
        mathfield_insert_mode_off()
    }
});
                        // Add mathfield btn end


                        // Remove mathfield btn start
mathfield_remove_btn_const.addEventListener('click', ()=>{
    mathfield_to_remove = current_element;
    if (mathfield_to_remove !== null){
        mathfield_to_remove.remove();
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
    all_slides.forEach((slide) =>{
        if (!textfield_insert_mode) {
            style_crosshair_cursor(slide)
            slide.classList.add('intercept_mode_child_off');
            const textfield_insert_const = textfield_insert.bind(null)
            textfield_insert_controllers.set(slide, textfield_insert_const)
            slide.addEventListener('mouseup', textfield_insert_const);
            insert_textfield_btn_const.style.backgroundColor = "#858585";
        };
    });
    if (!textfield_insert_mode){
        textfield_insert_mode = true;
    } else {
        textfield_insert_mode_off();
    };
});
                        // Add textfield end
                        // Remove textfield start
remove_textfield_btn_const.addEventListener('click', () => {
    const textfield_to_remove = current_element;
    if (textfield_to_remove !== null){
        textfield_to_remove.remove();
        const textfield_to_remove_index = textfields.indexOf(textfield_to_remove)
        textfields.splice(textfield_to_remove_index, 1)
        context_menu_textfield_const.style.display = 'none';
    };
});
                        // Remove textfield end
                        // Move textfield start
move_textfield_btn_const.addEventListener('click', () => {
    if (!element_move_mode){
        element_to_move = current_element;
        all_slides.forEach((slide) => {
            style_crosshair_cursor(slide)
            slide.classList.add('intercept_mode_child_off');
    });};
    element_move_mode = true;
    move_element_btn_const.style.backgroundColor = '#858585';
    context_menu_textfield_const.style.display = 'none';
});
                        // Move textfield end
//