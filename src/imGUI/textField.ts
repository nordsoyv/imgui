import { uiState } from './uiState'
import { drawRect,drawText, regionHit, measureText } from './util'

import { WidgetId } from '../types';

export function textField(id: WidgetId, x: number, y: number, w: number = 100, h: number = 32) {
  let text = uiState.widgetState[id].value;
  if (regionHit(x - 4, y - 4, w, h)) {
    uiState.hotItem = id;
    if (uiState.activeItem === 0 && uiState.leftMouseDown) {
      uiState.activeItem = id;
    }
  }

  if (uiState.keyFocusItem === 0) {
    uiState.keyFocusItem = id;
  }

  if(uiState.leftMouseDown && uiState.hotItem === id && uiState.activeItem === id){
    uiState.keyFocusItem = id;
  }

  if (uiState.keyFocusItem === id) {
    drawRect(x - 2, y - 2, w + 6, h + 6, 'white');
  }

  if (uiState.hotItem === id || uiState.activeItem === id) {
    drawRect(x, y, w, h, '#aaa');
  }else{
    drawRect(x, y, w, h, '#888');
  }
  drawText(text, x + 10, y + (h / 2));
  const textLength = measureText(text);
  const d =new Date();
  const ticks = d.getTime() >> 9;

  if (uiState.keyFocusItem === id && ( ticks & 1  )) {
    drawRect(x+textLength+10, y+2,2,28,"#eee");
  }
  if( uiState.keyFocusItem === id){
    switch (uiState.keyEntered) {
      case 'Tab': {
        if (uiState.keyShift) {
          uiState.keyFocusItem = uiState.lastWidget;
        } else {
          uiState.keyFocusItem = 0;
        }
        uiState.keyEntered = '';
        break;
      }
      
    }
    if(uiState.keyEntered){
      text += uiState.keyEntered;
    }
  }

  uiState.widgetState[id] = {value : text};
  uiState.lastWidget = id;

}