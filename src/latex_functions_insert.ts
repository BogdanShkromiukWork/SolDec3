import "mathlive"
import { MathfieldElement } from "mathlive";
const fraction_button_const = document.getElementById('fraction_button') as HTMLButtonElement;

function insert_latex(latex: string) {
    const active_element = document.activeElement as HTMLElement;
    if (active_element.tagName === 'MATH-FIELD') {
        const active_mathfield = active_element as MathfieldElement;
        active_mathfield.executeCommand('insert', latex);
        active_mathfield.focus();
    };
};
fraction_button_const.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
fraction_button_const.addEventListener('click', () => {
    insert_latex('\\frac{#?}{}');
});
