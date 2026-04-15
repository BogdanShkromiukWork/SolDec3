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
        insert_latex(latex);
    });
};
function add_smart_selection_listeners(button: string, latex_empty: string, latex_filled: string){
    const button_to_add_listeners = document.getElementById(button) as HTMLButtonElement;
    button_to_add_listeners.addEventListener('mousedown', (event: Event) =>{
        event.preventDefault();
    });
    button_to_add_listeners.addEventListener('click', () => {
    const active_element = document.activeElement as HTMLElement;
        if (active_element.tagName === 'MATH-FIELD') {
            const active_mathfield = active_element as MathfieldElement;
            if (active_mathfield.selectionIsCollapsed){
                insert_latex(latex_empty);
            } else {
                insert_latex(latex_filled);
            };
        };
    });
};
window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code === "Space") {
        const active_element = document.activeElement as HTMLElement;
        if (active_element.tagName === 'MATH-FIELD') {
                event.preventDefault();
                insert_latex('\\:');
            };
    };
});
add_smart_selection_listeners("text_insert_mathfield_button", `\\text{\\kern 0pt #?}{}`, `\\text{\\kern 0pt #@}{}`)
add_standart_listeners("fraction_button", `\\frac{#?}{\\placeholder{}}`)
add_standart_listeners("linear_fraction_button", "/")
add_standart_listeners("superscript_button", `\{}^{#?}`)
add_standart_listeners("subscript_button", `\{}_{#?}`)
add_standart_listeners("sub_and_super_script_button", `{}^{\\placeholder{#?}}_{\\placeholder{}}`)
add_standart_listeners("left_superscript_button", `{}^{\\placeholder{}} {#?}`)
add_standart_listeners("left_subscript_button", `{}_{\\placeholder{}} {#?}`)
add_standart_listeners("left_sub_and_super_script_button", `{}^{\\placeholder{}}_{\\placeholder{}}{#?}`)
add_standart_listeners("root_button", `\\sqrt{#?}`)
add_standart_listeners("root_2_button", `\\sqrt[2]{#?}`)
add_standart_listeners("root_3_button", `\\sqrt[3]{#?}`)
add_standart_listeners("root_universal_button", `\\sqrt[#?]{\\placeholder{}}`)
add_standart_listeners("undefined_integral_button", `\\int_{\\kern 0pt}^{\\kern 0pt}{#?}\\:d{\\placeholder{}}`)
add_standart_listeners("defined_integral_button", `\\int^{\\placeholder{}}_{\\placeholder{}}{#?}d{\\placeholder{}}`)
add_standart_listeners("undefined_double_integral_button", `\\iint^{\\kern 0pt}_{\\kern 0pt}{#?} \\:d{\\placeholder{}}`)
add_standart_listeners("undefined_triple_integral_button", `\\iiint^{\\kern 0pt}_{\\kern 0pt}{#?}\\:d{\\placeholder{}}`)
add_standart_listeners("undefined_surface_integral_button", `\\oint^{\\kern 0pt}_{\\kern 0pt}{#?}\\:d{\\placeholder{}}`)
add_standart_listeners("defined_surface_integral_button", `\\oint^{\\placeholder{}}_{\\placeholder{}}{#?}d{\\placeholder{}}`)
add_standart_listeners("undefined_double_surface_integral_button", `\\oiint^{\\kern 0pt}_{\\kern 0pt}{#?}\\:d{\\placeholder{}}`)
add_standart_listeners("d_dx_button", `\\frac{d \\placeholder{#?}}{dx}`)
add_standart_listeners("d_d_button", `\\frac{d \\placeholder{#?}}{d \\placeholder{}}`)
add_standart_listeners("dy_dx_button", `\\frac{dy}{dx} \\placeholder{#?}`)
add_standart_listeners("d2_dx2_button", `\\frac{d^{2} \\placeholder{#?}}{dx}`)
add_standart_listeners("d2_d2_button", `\\frac{d^{2} \\placeholder{#?}}{d \\placeholder{}^{2}}`)
add_standart_listeners("d2y_dx2_button", `\\frac{d^{2}y}{dx^{2}} \\placeholder{#?}`)
add_standart_listeners("sin_button", `sin{(#?)}`)
add_standart_listeners("cos_button", `cos{(#?)}`)
add_standart_listeners("tan_button", `tan{(#?)}`)
add_standart_listeners("cot_button", `cot{(#?)}`)
add_standart_listeners("sec_button", `sec{(#?)}`)
add_standart_listeners("csc_button", `csc{(#?)}`)
add_standart_listeners("arcsin_button", `sin^{-1}{(#?)}`)
add_standart_listeners("arccos_button", `cos^{-1}{(#?)}`)
add_standart_listeners("arctan_button", `tan^{-1}{(#?)}`)
add_standart_listeners("arccot_button", `cot^{-1}{(#?)}`)
add_standart_listeners("arcsec_button", `sec^{-1}{(#?)}`)
add_standart_listeners("arccsc_button", `csc^{-1}{(#?)}`)
add_smart_selection_listeners("brackets_circle_button", `(#?)`, `(#@)`)
add_smart_selection_listeners("brackets_module_button", `|#?|`, `|#@|`)
add_smart_selection_listeners("brackets_figure_button", `\\{ #? \\}`, `\\{ #@ \\}`)
add_smart_selection_listeners("brackets_square_button", `[#?]`, `[#@]`)
add_smart_selection_listeners("brackets_angle_button", `\\langle #? \\rangle`, `\\langle #@ \\rangle`)
add_standart_listeners("less_button", `<`)
add_standart_listeners("more_button", `>`)
add_standart_listeners("equal_button", `=`)
add_standart_listeners("less_equal_button", `\\leq`)
add_standart_listeners("more_equal_button", `\\geq`)
add_standart_listeners("not_equal_button", `\\neq`)
add_standart_listeners("right_arrow_button", `\\rightarrow`)
add_standart_listeners("left_arrow_button", `\\leftarrow`)
add_standart_listeners("double_arrow_button", `\\leftrightarrow`)

