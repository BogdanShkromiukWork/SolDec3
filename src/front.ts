document.addEventListener("DOMContentLoaded", () => {
const functions_top_panel_const = document.getElementById('functions_top_panel') as HTMLDivElement;
const simplification_top_panel_const = document.getElementById('simplification_top_panel') as HTMLDivElement;
const drawing_top_panel_const = document.getElementById('drawing_top_panel') as HTMLDivElement;
const home_top_panel_const = document.getElementById('home_top_panel') as HTMLDivElement;
const text_top_panel_const = document.getElementById('text_top_panel') as HTMLDivElement;

const home_panel_btn_const = document.getElementById('home_panel_btn') as HTMLButtonElement;
const functions_panel_btn_const = document.getElementById('functions_panel_btn') as HTMLButtonElement;
const simplification_panel_btn_const = document.getElementById('simplification_panel_btn') as HTMLButtonElement;
const drawing_panel_btn_const = document.getElementById('drawing_panel_btn') as HTMLButtonElement;
const text_panel_btn_const = document.getElementById('text_panel_btn') as HTMLButtonElement;

const functions_bottom_panel_back_const = document.getElementById('functions_bottom_panel_back') as HTMLDivElement;
const text_bottom_panel_back_const = document.getElementById('text_bottom_panel_back') as HTMLDivElement;

home_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'block';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'none';
  text_top_panel_const.style.display = 'none';
  functions_bottom_panel_back_const.style.display = 'none';
  text_bottom_panel_back_const.style.display = 'none';
});

functions_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'block';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'none';
  text_top_panel_const.style.display = 'none';
  functions_bottom_panel_back_const.style.display = 'block';
  text_bottom_panel_back_const.style.display = 'none';
});
simplification_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'block';
  drawing_top_panel_const.style.display = 'none';
  text_top_panel_const.style.display = 'none';
  functions_bottom_panel_back_const.style.display = 'none';
  text_bottom_panel_back_const.style.display = 'none';
});
drawing_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'block';
  text_top_panel_const.style.display = 'none';
  functions_bottom_panel_back_const.style.display = 'none';
  text_bottom_panel_back_const.style.display = 'none';
});
text_panel_btn_const.addEventListener('click', () => {
  home_top_panel_const.style.display = 'none';
  functions_top_panel_const.style.display = 'none';
  simplification_top_panel_const.style.display = 'none';
  drawing_top_panel_const.style.display = 'none';
  text_top_panel_const.style.display = 'block';
  functions_bottom_panel_back_const.style.display = 'none';
  text_bottom_panel_back_const.style.display = 'block';
});
});

const slide_panel_btn_const = document.getElementById('slide_panel_btn') as HTMLButtonElement;
const picture_panel_btn_const = document.getElementById('picture_panel_btn') as HTMLButtonElement;
const picture_upload_button_const = document.getElementById('upload_picture_button') as HTMLButtonElement;
const pictures_insert_panel_back_const = document.getElementById('pictures_insert_panel_back') as HTMLDivElement;
picture_panel_btn_const.addEventListener('click', () => {
  pictures_insert_panel_back_const.style.display = 'block';
});
slide_panel_btn_const.addEventListener('click', () => {
  pictures_insert_panel_back_const.style.display = 'none';
});
picture_upload_button_const.addEventListener('click', () => {
  pictures_insert_panel_back_const.style.display = 'block';
});