import "mathlive"
import { renderMathInElement } from "mathlive";
import 'katex/dist/katex.min.css';
import katex from 'katex';
const fraction_button_const = document.getElementById('fraction_button') as HTMLButtonElement;

const superscript_button_const = document.getElementById('superscript_button') as HTMLButtonElement;
const subscript_button_const = document.getElementById('subscript_button') as HTMLButtonElement;
const sub_and_super_script_button_const = document.getElementById('sub_and_super_script_button') as HTMLButtonElement;
const left_superscript_button_const = document.getElementById('left_superscript_button') as HTMLButtonElement;
const left_subscript_button_const = document.getElementById('left_subscript_button') as HTMLButtonElement;
const left_sub_and_super_script_button_const = document.getElementById('left_sub_and_super_script_button') as HTMLButtonElement;
const root_button_const = document.getElementById('root_button') as HTMLButtonElement;
const root_2_button_const = document.getElementById('root_2_button') as HTMLButtonElement;
const root_3_button_const = document.getElementById('root_3_button') as HTMLButtonElement;
const root_universal_button_const = document.getElementById('root_universal_button') as HTMLButtonElement;


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