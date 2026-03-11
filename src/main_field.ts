import 'mathlive';
import {MathfieldElement} from 'mathlive';
const insert_mathfield_btn = document.getElementById('insert_mathfield_btn') as HTMLButtonElement;
let insert_mode_mathfield = false;
const mathfields: MathfieldElement[] = [];
                        // Add/remove btns functions & constants start
const slidecontrollers = new Map()
const slide_add_btn_const = document.getElementById('slide_add_btn') as HTMLButtonElement;
const slide_remove_btn_const = document.getElementById('slide_remove_btn') as HTMLButtonElement;
const all_slides: HTMLDivElement[] = Array.from(document.querySelectorAll('.main_field')) as HTMLDivElement[];
let removeMode = false;
let slidesToRemove: HTMLDivElement[] = [];

function style_not_allowed_cursor (slide_cursor_change){
    slide_cursor_change.style.cursor = "not-allowed"
}
function style_default_cursor (slide_cursor_change) {
    slide_cursor_change.style.cursor = "default"
}
function control_and_style_slide_to_remove (slide){
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
                        // Add/remove btns functions & constants end
                        // Add slide btn start
slide_add_btn_const.addEventListener('click', () => {
    insert_mode_mathfield = false
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    const main_field_const = document.getElementById('back_main_field') as HTMLDivElement;
    main_field_const.appendChild(slide);
    all_slides.push(slide);
});
                        // Add slide btn end
                        // Remove slide btn start
slide_remove_btn_const.addEventListener('click', () => {
    insert_mode_mathfield = false
    all_slides.forEach(slide => {
        style_not_allowed_cursor(slide)
        if (!removeMode) {
            const control_and_style_slide_to_remove_const1 = control_and_style_slide_to_remove.bind(null, slide);
            slidecontrollers.set(slide, control_and_style_slide_to_remove_const1);
            slide.addEventListener('click', control_and_style_slide_to_remove_const1);
        } else {
            const control_and_style_slide_to_remove_const2 = slidecontrollers.get(slide)
            slide.removeEventListener('click', control_and_style_slide_to_remove_const2);
            style_default_cursor(slide)
        };
    });
    if (!removeMode){
        removeMode = true;
    } else {
        removeMode = false;
        slidesToRemove.forEach(slide => {
            slide.remove();
            const index_all_slides_to_remove = all_slides.indexOf(slide)
            all_slides.splice(index_all_slides_to_remove, 1);
        });
        slidesToRemove.length = 0;
    }
});



insert_mathfield_btn.addEventListener('click', () =>{
    const all_main_fields = document.querySelectorAll('.main_field')
    if (!insert_mode_mathfield){
        insert_mode_mathfield = true;
    all_main_fields.forEach(field => {
        if (insert_mode_mathfield) {
            field.addEventListener('click', (click_mathfielf_insert)=>{
            const new_mathfield = new MathfieldElement();
            new_mathfield.classList.add('function_field');
            const Xcoordinate = click_mathfielf_insert.offsetX;
            const Ycoordinate = click_mathfielf_insert.offsetY;
            new_mathfield.style.position = 'absolute';
            new_mathfield.style.left = `${Xcoordinate}px`;
            new_mathfield.style.top = `${Ycoordinate}px`;
            field.appendChild(new_mathfield);
            new_mathfield.focus();
            insert_mode_mathfield = false;
        })}
    });
    } else {
        insert_mode_mathfield = false;
    }
});