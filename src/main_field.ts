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
let X_coordinate_slide_click:any = null;    //Universe
let Y_coordinate_slide_click:any = null;    //Universe
                        // Add/remove mathfield btns constants end
                        // Add/remove btns functions start
function style_not_allowed_cursor (slide_cursor_change: any){
    slide_cursor_change.style.cursor = "not-allowed"
}
function style_default_cursor (slide_cursor_change: any) {
    slide_cursor_change.style.cursor = "default"
}
function control_and_style_slide_to_remove (slide: any){
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
        slide.remove();
        const index_all_slides_to_remove = all_slides.indexOf(slide)
        all_slides.splice(index_all_slides_to_remove, 1);
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
}
                        // Add/remove slide btns functions end
                        // Add/remove mathfield btns functions start
//.
function style_crosshair_cursor (slide_cursor_change: any){
    slide_cursor_change.style.cursor = "crosshair"
};
function add_mathfield (slide: any){
    const new_mathfield = new MathfieldElement();
    new_mathfield.style.position='absolute';
    new_mathfield.style.left = `${X_coordinate_slide_click}px`;
    new_mathfield.style.top = `${Y_coordinate_slide_click}px`;
    slide.appendChild(new_mathfield);
    mathfields.push(new_mathfield)
    insert_mode_mathfield = false;
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
};
                        // Add/remove mathfield btns functions end
                        // Add slide btn start
all_slides.forEach(slide =>{
    slide.addEventListener('click', (event) =>{
        X_coordinate_slide_click = event.offsetX
        Y_coordinate_slide_click = event.offsetY
    });
})
slide_add_btn_const.addEventListener('click', () => {
    slides_removeMode_off();
    insert_mode_mathfield = false
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    slide.addEventListener('click', (event) =>{
        X_coordinate_slide_click = event.offsetX
        Y_coordinate_slide_click = event.offsetY
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
    } else {
        slide_removeMode = false;
        slides_remove()
    }
});
                        // Remove slide btn end
                        // Add mathfield btn start
insert_mathfield_btn.addEventListener('click', ()=>{
    slides_removeMode_off();
    all_slides.forEach(slide =>{
        if (!insert_mode_mathfield) {
            style_crosshair_cursor(slide)
            slide.classList.add('intercept_mode_child_off');
            const add_mathfield_const1 = add_mathfield.bind(null, slide);
            mathfield_slide_insert_controllers.set(slide, add_mathfield_const1)
            slide.addEventListener('click', add_mathfield_const1);
        }
    });
    if (!insert_mode_mathfield) {
        insert_mode_mathfield = true;
    } else {
        mathfield_insert_mode_off()
    }
});
                        // Add mathfield btn end