import './libraries/katex/katex.min.css';
// import katex from '../public/libraries/katex/katex.min.js';
import katex from 'katex';
function render_latex(latex: string, button: string) {
    const button_to_render = document.getElementById(button) as HTMLButtonElement;
    katex.render(latex, button_to_render, {
            throwOnError: false,
    });
};
render_latex('\\frac{a}{b}', "fraction_button");
render_latex(`{a}^{n}`, "superscript_button")
render_latex(`{a}_{m}`, "subscript_button")
render_latex(`{a}^{n}_{m}`, "sub_and_super_script_button")
render_latex(`{}^{n}a`, "left_superscript_button")
render_latex(`{}_{m}{a}`, "left_subscript_button")
render_latex(`{}^{n}_{m}{a}`, "left_sub_and_super_script_button")
render_latex(`\\sqrt{a}`, "root_button")
render_latex(`\\sqrt[2]{a}`, "root_2_button")
render_latex(`\\sqrt[3]{a}`, "root_3_button")
render_latex(`\\sqrt[n]{a}`, "root_universal_button")