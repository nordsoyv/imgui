import { button } from './button';
import { slider } from './slider';
import { uiState } from './uiState';
import { setCtx } from './util';

import { IMouseInfo } from '../types';

const sliderOneValue = uiState.widgetState.push({value : 100}) -1;

const sliderTwoValue = uiState.widgetState.push({value : 100})-1;
const sliderThreeValue = uiState.widgetState.push({value : 100})-1;

function beginUI() {
  uiState.hotItem = 0;
}

function endUI() {
  if (uiState.mouseDown === false) {
    uiState.activeItem = 0;
  } else {
    if (uiState.activeItem === 0) {
      uiState.activeItem = -1;
    }
  }
}

export function drawUi(c : CanvasRenderingContext2D, mouseinfo :  IMouseInfo) {
  uiState.mouseX = mouseinfo.xPos;
  uiState.mouseY = mouseinfo.yPos;
  uiState.mouseDown = mouseinfo.leftButton;
  beginUI();
  setCtx(c);
  button(1, 50, 50);
  button(2, 150, 50);
  if (button(3, 50, 150)) {
    // tslint:disable-next-line 
    console.log("Button 3 pressed");
  }
  if (button(4, 150, 150)) {
    // tslint:disable-next-line 
    console.log("Button 4 pressed")
  }

  slider(5, 500, 40, 255, sliderOneValue)
  slider(6, 550, 40, 255, sliderTwoValue)
  slider(7, 600, 40, 255, sliderThreeValue)

  // drawRect(uiState.mouseX, uiState.mouseY, 50, 50, uiState.mouseDown ? 'blue' : 'green')
  endUI();
}