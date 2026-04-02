import "mathlive"
import { renderMathInElement } from "mathlive";
const fraction_button_const = document.getElementById('fraction_button') as HTMLButtonElement;

function render_latex(latex: string, button: HTMLButtonElement) {
    button.textContent = `\\(${latex}\\)`
    renderMathInElement(button);
};
render_latex('\\frac{a}{b}', fraction_button_const);