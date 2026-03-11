document.addEventListener("DOMContentLoaded", () => {
const functions_top_panel_const = document.getElementById('functions_top_panel') as HTMLDivElement;
const simplification_top_panel_const = document.getElementById('simplification_top_panel') as HTMLDivElement;
const drawing_top_panel_const = document.getElementById('drawing_top_panel') as HTMLDivElement;
const home_top_panel_const = document.getElementById('home_top_panel') as HTMLDivElement;

const home_panel_btn_const = document.getElementById('home_panel_btn') as HTMLButtonElement;
const functions_panel_btn_const = document.getElementById('functions_panel_btn') as HTMLButtonElement;
const simplification_panel_btn_const = document.getElementById('simplification_panel_btn') as HTMLButtonElement;
const drawing_panel_btn_const = document.getElementById('drawing_panel_btn') as HTMLButtonElement;

home_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'block';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'none';
});

functions_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'block';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'none';
});
simplification_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'block';
  drawing_top_panel_const.style.display = 'none';
});
drawing_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'block';
});
});