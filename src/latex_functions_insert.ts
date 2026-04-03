import "mathlive"
import { MathfieldElement } from "mathlive";

function insert_latex(latex: string) {
    const active_element = document.activeElement as HTMLElement;
    if (active_element.tagName === 'MATH-FIELD') {
        const active_mathfield = active_element as MathfieldElement;
        active_mathfield.insert(latex, {
            focus: true,
            feedback: true,
            mode: 'math'
        });
    };
};
function add_standart_listeners(button: string, latex: string){
    const button_to_add_listeners = document.getElementById(button) as HTMLButtonElement;
    button_to_add_listeners.addEventListener('mousedown', (event: Event) =>{
        event.preventDefault();
    });
    button_to_add_listeners.addEventListener('click', () => {
        insert_latex(latex)
    });
};
add_standart_listeners("fraction_button", '\\frac{#?}{\\placeholder{}}')
add_standart_listeners("linear_fraction_button", "/")

add_standart_listeners("superscript_button", `\{}^{#?}`)
add_standart_listeners("subscript_button", `\{}_{#?}`)
add_standart_listeners("sub_and_super_script_button", `{}^{\\placeholder{#?}}_{\\placeholder{}}`)
add_standart_listeners("left_superscript_button", `{}^{\\placeholder{}} {#?}`)
add_standart_listeners("left_subscript_button", `{}_{\\placeholder{}} {#?}`)
add_standart_listeners("left_sub_and_super_script_button", `{#?}^{\\placeholder{}}_{\\placeholder{}}`)
add_standart_listeners("root_button", `\sqrt{#?}`)
