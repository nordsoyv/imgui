import {button, textButton} from './button';
import {ids} from './ids';
import {slider} from './slider';
import {uiState} from './uiState';
import {setCtx} from './util';

import {IKeyInfo, IMouseInfo} from '../types';
import {textField} from './textField';
import {rightClickMenu} from './rightClickMenu';
uiState.widgetState[ids.SLIDER_1] = {value: 100};
uiState.widgetState[ids.SLIDER_2] = {value: 100};
uiState.widgetState[ids.SLIDER_3] = {value: 100};
uiState.widgetState[ids.TEXT_1] = {value: ''};
uiState.widgetState[ids.RIGHT_CLICK_MENU] = {
  initialPosX: 0,
  initialPosY: 0,
};

function beginUI(mouseinfo: IMouseInfo, keyInfo: IKeyInfo) {
  uiState.hotItem = 0;
  uiState.mouseX = mouseinfo.xPos;
  uiState.mouseY = mouseinfo.yPos;
  uiState.leftMouseDown = mouseinfo.leftButton;
  uiState.rightMouseDown = mouseinfo.rightButton;
  uiState.keyEntered = keyInfo.key;
  uiState.keyShift = keyInfo.shift;
  uiState.keyAlt = keyInfo.alt;
  uiState.keyCtrl = keyInfo.ctrl;
}

function endUI() {
  if (uiState.leftMouseDown === false) {
    uiState.activeItem = 0;
  } else {
    if (uiState.activeItem === 0) {
      uiState.activeItem = -1;
    }
  }

  if (uiState.keyEntered === 'Tab') {
    uiState.keyFocusItem = 0;
  }
  uiState.keyEntered = '';
}

function drawBackground(c: CanvasRenderingContext2D) {
  const red = 255 - uiState.widgetState[ids.SLIDER_1].value;
  const green = 255 - uiState.widgetState[ids.SLIDER_2].value;
  const blue = 255 - uiState.widgetState[ids.SLIDER_3].value;
  c.fillStyle = `rgb(${red},${green},${blue})`;
  c.fillRect(0, 0, 1200, 800);
}

export function drawUi(c: CanvasRenderingContext2D, mouseinfo: IMouseInfo, keyInfo: IKeyInfo) {
  beginUI(mouseinfo, keyInfo);
  setCtx(c);
  drawBackground(c);
  button(ids.BUTTON_1, 50, 50);
  button(ids.BUTTON_2, 150, 50);
  if (button(ids.BUTTON_3, 50, 150)) {
    // tslint:disable-next-line
    console.log('Button 3 pressed');
  }
  if (textButton(ids.BUTTON_4, 'Button 4', 150, 150, 100, 50)) {
    // tslint:disable-next-line
    console.log('Button 4 pressed');
  }

  slider(ids.SLIDER_1, 500, 40, 255);
  slider(ids.SLIDER_2, 550, 40, 255);
  slider(ids.SLIDER_3, 600, 40, 255);
  textField(ids.TEXT_1, 50, 300);

  if (uiState.rightMouseDown) {
    // tslint:disable-next-line
    // console.log("Right mouse button pressed");
    rightClickMenu(ids.RIGHT_CLICK_MENU);
  } else {
    uiState.widgetState[ids.RIGHT_CLICK_MENU] = {
      initialPosX: 0,
      initialPosY: 0,
    };
  }

  // drawRect(uiState.mouseX, uiState.mouseY, 50, 50, uiState.mouseDown ? 'blue' : 'green')
  endUI();
}
