import { button,textButton } from './button';
import { ids } from './ids';
import { slider } from './slider';
import { getUiState } from './uiState';
import { setCtx,  } from './util';

import { IKeyInfo,IMouseInfo  } from '../types';
const uiState = getUiState();
uiState.widgetState[ids.SLIDER_1] = { value: 100 };
uiState.widgetState[ids.SLIDER_2] = { value: 100 };
uiState.widgetState[ids.SLIDER_3] = { value: 100 };

function beginUI() {
  const uiState2 = getUiState();
  uiState2.hotItem = 0;
}

function endUI() {
  const uiState2 = getUiState();
  if (uiState2.mouseDown === false) {
    uiState2.activeItem = 0;
  } else {
    if (uiState2.activeItem === 0) {
      uiState2.activeItem = -1;
    }
  }
}

export function drawUi(c: CanvasRenderingContext2D, mouseinfo: IMouseInfo, keyInfo : IKeyInfo) {
  const uiState2 = getUiState();
  uiState2.mouseX = mouseinfo.xPos;
  uiState2.mouseY = mouseinfo.yPos;
  uiState2.mouseDown = mouseinfo.leftButton;
  uiState2.keyEntered =keyInfo.key;  
  beginUI();
  setCtx(c);
  const red = 255 -uiState2.widgetState[ids.SLIDER_1].value;
  const green = 255 -uiState2.widgetState[ids.SLIDER_2].value;
  const blue = 255 -uiState2.widgetState[ids.SLIDER_3].value;
  c.fillStyle = `rgb(${red},${green},${blue})`;
  c.fillRect(0, 0, 1200, 800)
  button(ids.BUTTON_1, 50, 50);
  button(ids.BUTTON_2, 150, 50);
  if (button(ids.BUTTON_3, 50, 150)) {
    // tslint:disable-next-line 
    console.log("Button 3 pressed");
  }
  if (textButton(ids.BUTTON_4, "Button 4", 150, 150,100,50)) {
    // tslint:disable-next-line 
    console.log("Button 4 pressed")
  }

  slider(ids.SLIDER_1, 500, 40, 255)
  slider(ids.SLIDER_2, 550, 40, 255)
  slider(ids.SLIDER_3, 600, 40, 255)

  // drawRect(uiState.mouseX, uiState.mouseY, 50, 50, uiState.mouseDown ? 'blue' : 'green')
  endUI();
}