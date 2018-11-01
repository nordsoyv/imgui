import {drawRect, regionHit, drawText} from './util';
import {uiState} from './uiState';
import {WidgetId} from 'src/types';
import {ids} from './ids';

export function rightClickMenu(id: WidgetId) {
  const xPos = uiState.mouseX;
  const yPos = uiState.mouseY;
  let state = uiState.widgetState[id];

  if (state === undefined) {
    state = {
      initialPosX: xPos - 5,
      initialPosY: yPos - 5,
    };
    uiState.widgetState[id] = state;
  }

  if (state.initialPosX === 0) {
    state.initialPosX = xPos - 5;
    state.initialPosY = yPos - 5;
  }
  drawRect(state.initialPosX, state.initialPosY, 50, 100, '#ccc');
  const btn1 = drawMenuItem(ids.RIGHT_CLICK_MENUITEM_1, state.initialPosX, state.initialPosY, 'Item 1');
  const btn2 = drawMenuItem(ids.RIGHT_CLICK_MENUITEM_2, state.initialPosX, state.initialPosY + 50, 'Item 2');
  const btn3 = drawMenuItem(ids.RIGHT_CLICK_MENUITEM_3, state.initialPosX, state.initialPosY + 100, 'Item 3');
  if (btn1 || btn2 || btn3) {
    // tslint:disable-next-line
    console.log(btn1, btn2, btn3);
  }
}

function drawMenuItem(id: WidgetId, x: number, y: number, text: string) {
  const w = 100;
  const h = 50;
  if (regionHit(x, y, w, h)) {
    uiState.hotItem = id;
  }
  if (uiState.hotItem === id) {
    drawRect(x, y, w, h, '#fff');
  } else {
    drawRect(x, y, w, h, '#ccc');
  }

  drawText(text, x + 5, y + 40);

  if (uiState.rightMouseDown === false && uiState.hotItem === id) {
    return true;
  }
  return false;
}
