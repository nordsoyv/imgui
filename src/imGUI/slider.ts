import { uiState } from './uiState'
import { drawRect, regionHit } from './util'

import { WidgetId } from '../types';

export function slider(id : WidgetId, x : number, y : number, max: number) {
  const {value}= uiState.widgetState[id];
  const ypos = ((256 - 16) * value) / max;
  if (regionHit(x + 8, y + 8, 16, 255)) {
    uiState.hotItem = id;
    if (uiState.activeItem === 0 && uiState.mouseDown) {
      uiState.activeItem = id;
    }
  }

  drawRect(x, y, 32, 256 + 16, '#222',5)
  if (uiState.activeItem === id || uiState.hotItem === id) {
    drawRect(x + 8, y + 8+ypos, 16, 16, '#fff',2);
  } else {
    drawRect(x + 8, y + 8+ypos, 16, 16, '#777',2)
  }

  if (uiState.activeItem === id) {
    let mousePos = uiState.mouseY - (y+8)
    if(mousePos<0){
      mousePos = 0;
    }
    if(mousePos>255){
      mousePos = 255;
    }
    const v = (mousePos * max ) / 255;
    if(v !== value){
      uiState.widgetState[id].value = v;
      return true;
    }
  }
  return false;

}