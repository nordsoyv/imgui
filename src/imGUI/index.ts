import { button, textButton } from './button';
import { ids } from './ids';
import { slider } from './slider';
import { uiState } from './uiState';
import { setCtx, } from './util';

import { IKeyInfo, IMouseInfo } from '../types';
uiState.widgetState[ids.SLIDER_1] = { value: 100 };
uiState.widgetState[ids.SLIDER_2] = { value: 100 };
uiState.widgetState[ids.SLIDER_3] = { value: 100 };

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

  if( uiState.keyEntered === 'Tab'){
    uiState.keyFocusItem = 0;
  }
  uiState.keyEntered ='';

}

export function drawUi(c: CanvasRenderingContext2D, mouseinfo: IMouseInfo, keyInfo: IKeyInfo) {
  uiState.mouseX = mouseinfo.xPos;
  uiState.mouseY = mouseinfo.yPos;
  uiState.mouseDown = mouseinfo.leftButton;
  uiState.keyEntered = keyInfo.key;
  uiState.keyShift = keyInfo.shift;
  beginUI();
  setCtx(c);
  const red = 255 - uiState.widgetState[ids.SLIDER_1].value;
  const green = 255 - uiState.widgetState[ids.SLIDER_2].value;
  const blue = 255 - uiState.widgetState[ids.SLIDER_3].value;
  c.fillStyle = `rgb(${red},${green},${blue})`;
  c.fillRect(0, 0, 1200, 800)
  button(ids.BUTTON_1, 50, 50);
  button(ids.BUTTON_2, 150, 50);
  if (button(ids.BUTTON_3, 50, 150)) {
    // tslint:disable-next-line 
    console.log("Button 3 pressed");
  }
  if (textButton(ids.BUTTON_4, "Button 4", 150, 150, 100, 50)) {
    // tslint:disable-next-line 
    console.log("Button 4 pressed")
  }

  slider(ids.SLIDER_1, 500, 40, 255)
  slider(ids.SLIDER_2, 550, 40, 255)
  slider(ids.SLIDER_3, 600, 40, 255)

  // drawRect(uiState.mouseX, uiState.mouseY, 50, 50, uiState.mouseDown ? 'blue' : 'green')
  endUI();
}