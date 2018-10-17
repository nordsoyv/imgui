import {uiState} from './uiState'
import {drawRect,drawText,regionHit,  } from './util'

export function button(id : number, x : number, y :number , w : number = 64, h : number = 48) {
  if (regionHit(x, y, w, h)) {
    uiState.hotItem = id;
    if (uiState.activeItem === 0 && uiState.mouseDown) {
      uiState.activeItem = id
    }
  }
  // Render button 
  // drawRect(x + 8, y + 8, w, h, 'blue',5);
  if (uiState.hotItem === id) {
    if (uiState.activeItem === id) {
      // Button is both 'hot' and 'active'
      drawRect(x + 2, y + 2, w, h, 'green',5,true);
    } else {
      // Button is merely 'hot'
      drawRect(x, y, w, h, 'green',5,true);    
    }
  } else {
    // button is not hot, but it may be active   
    drawRect(x, y, w, h, 'red',5,true);
  }

  

  // If button is hot and active, but mouse button is not
  // down, the user must have clicked the button.

  if (uiState.mouseDown === false && uiState.hotItem === id && uiState.activeItem === id) {
    return true;
  }
  return false;
}

export function textButton(id : number, text :string, x : number, y :number , w : number = 64, h : number = 48) {
  if (regionHit(x, y, w, h)) {
    uiState.hotItem = id;
    if (uiState.activeItem === 0 && uiState.mouseDown) {
      uiState.activeItem = id
    }
  }
  // Render button 
  // drawRect(x + 8, y + 8, w, h, 'blue',5);
  if (uiState.hotItem === id) {
    if (uiState.activeItem === id) {
      // Button is both 'hot' and 'active'
      drawRect(x + 2, y + 2, w, h, 'green',5,true);
    } else {
      // Button is merely 'hot'
      drawRect(x, y, w, h, 'green',5,true);    
    }
  } else {
    // button is not hot, but it may be active   
    drawRect(x, y, w, h, 'red',5,true);
  }

  // If button is hot and active, but mouse button is not
  // down, the user must have clicked the button.

  drawText(text, x +10, y+(h /2))

  if (uiState.mouseDown === false && uiState.hotItem === id && uiState.activeItem === id) {
    return true;
  }
  return false;
}
