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
                        // Add/remove mathfield btns constants start
//.
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
                        // Add/remove mathfield btns constants end
                        // Context menus functions start
//.
                        // Context menus functions end
                        // Add/remove/move slide btns functions start
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
                        // Add/remove/move slide btns functions end
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
        });
    }
};
function element_move_mode_off(){
    element_to_move = null;
    if(element_move_mode){
        all_slides.forEach((slide) =>{
            style_default_cursor(slide)
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
    slide.appendChild(new_mathfield);
    mathfields.push(new_mathfield)
    insert_mode_mathfield = false;
    new_mathfield.addEventListener('contextmenu', (context_menu_click) => {
        context_menu_click.preventDefault();
        context_menu_mathfield_const.style.display = 'flex';
        context_menu_mathfield_const.style.left = `${context_menu_click.pageX}px`;
        context_menu_mathfield_const.style.top = `${context_menu_click.pageY}px`;
        current_element = new_mathfield
    });
    new_mathfield.addEventListener('click', () =>{
        current_element = new_mathfield
        if (element_move_mode){
            element_to_move = current_element
            all_slides.forEach((slide) =>{
                style_crosshair_cursor(slide);
            });
        };
    });
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
                        // Window functions start
window.addEventListener('click', (window_click) =>{
    if (!context_menu_mathfield_const.contains(window_click.target as Node)) {
        context_menu_mathfield_const.style.display = 'none';
        mathfield_to_remove = null;
    };
});
                        // Window functions end
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
})
slide_add_btn_const.addEventListener('click', () => {
    slides_removeMode_off();
    element_move_mode_off();
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