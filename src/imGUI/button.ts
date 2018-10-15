import {uiState} from './uiState'
import {drawRect,regionHit} from './util'

export function button(id : number, x : number, y :number) {
  if (regionHit(x, y, 64, 48)) {
    uiState.hotItem = id;
    if (uiState.activeItem === 0 && uiState.mouseDown) {
      uiState.activeItem = id
    }
  }
  // Render button 
  drawRect(x + 8, y + 8, 64, 48, 'blue');
  if (uiState.hotItem === id) {
    if (uiState.activeItem === id) {
      // Button is both 'hot' and 'active'
      drawRect(x + 2, y + 2, 64, 48, 'green');
    } else {
      // Button is merely 'hot'
      drawRect(x, y, 64, 48, 'green');
    }
  } else {
    // button is not hot, but it may be active   
    drawRect(x, y, 64, 48, 'red');
  }

  // If button is hot and active, but mouse button is not
  // down, the user must have clicked the button.

  if (uiState.mouseDown === false && uiState.hotItem === id && uiState.activeItem === id) {
    return true;
  }
  return false;
}
