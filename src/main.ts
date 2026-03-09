import './style.css';
import 'mathlive';
import {MathfieldElement} from 'mathlive';
const main_field_const = document.getElementById('main_field') as HTMLDivElement;
const test_insert_button_const = document.getElementById('test_insert_button') as HTMLButtonElement;
let insertMode = false;
let isDragging = false;
test_insert_button_const.addEventListener('click', () => {
  insertMode = true;
  main_field_const.style.cursor = 'crosshair';
});
main_field_const.addEventListener('click', (event) => {
  if (insertMode) {
    const mathfield = new MathfieldElement();
    mathfield.classList.add('function_field');
    const Xcoordinate = event.offsetX;
    const Ycoordinate = event.offsetY;
    mathfield.style.position = 'absolute';
    mathfield.style.left = `${Xcoordinate}px`;
    mathfield.style.top = `${Ycoordinate}px`;
    main_field_const.appendChild(mathfield);
    mathfield.focus();
    insertMode = false;
}});
// function_field.addEventListener('mousedown', () => {
//   if (CtrllKey) {
//     isDragging = true;
//   alert('dragging started');
// }});
// function_field.addEventListener('mouseup', () => {
//   if (CtrllKey) {
//     isDragging = false;
//   alert('dragging stopped');
// }});