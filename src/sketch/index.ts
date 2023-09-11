import { actions } from './sketchStore/sketchStore.js';

const numPixels = 9 * 2 * 19 * 2;
const body = document.querySelector('body');
const board = document.querySelector('#sketchBoard');
const clearBtn = document.querySelector('#sketchClearBtn');
const eraserBtn = document.querySelector('#sketchEraserBtn');
const pencilBtn = document.querySelector('#sketchPencilBtn');
const redBtn = document.querySelector('#sketchRedBtn');
const orangeBtn = document.querySelector('#sketchOrangeBtn');
const yellowBtn = document.querySelector('#sketchYellowBtn');
const greenBtn = document.querySelector('#sketchGreenBtn');
const blueBtn = document.querySelector('#sketchBlueBtn');
const purpleBtn = document.querySelector('#sketchPurpleBtn');
const blackBtn = document.querySelector('#sketchBlackBtn');

for (let i = 0; i < numPixels; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.addEventListener('mousemove', actions.draw);
  board?.appendChild(pixel);
}

body?.addEventListener('mouseup', () => actions.setMouseDown(false));
board?.addEventListener('mousedown', () => actions.setMouseDown(true));

clearBtn?.addEventListener('click', () => actions.clearBoard());
eraserBtn?.addEventListener('click', () => actions.setDrawTool('eraser'));
pencilBtn?.addEventListener('click', () => actions.setDrawTool('pencil'));

redBtn?.addEventListener('click', () => actions.setColor('#f43f5e'));
orangeBtn?.addEventListener('click', () => actions.setColor('#f97316'));
yellowBtn?.addEventListener('click', () => actions.setColor('#eab308'));
greenBtn?.addEventListener('click', () => actions.setColor('#22c55e'));
blueBtn?.addEventListener('click', () => actions.setColor('#0ea5e9'));
purpleBtn?.addEventListener('click', () => actions.setColor('#8b5cf6'));
blackBtn?.addEventListener('click', () => actions.setColor('#0f172a'));

const sketchApp = document.querySelector('#sketchApp');
const topBar = document.querySelector('#topBar');
document.querySelector('#sketchHomeBtn')?.addEventListener('click', () => {
  topBar?.classList.remove('top-bar--dark');
  sketchApp?.classList.add('sketch--hide');
});
