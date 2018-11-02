import {regionHit, uiState} from './context';
import {drawRect} from './drawRect';

const menuState = {
  open: false,
  xPos: 0,
  yPos: 0,
  hotItem: 0,
};

export const updateContextMenu = () => {
  if (uiState.rightMouseDown && !menuState.open) {
    menuState.open = true;
    menuState.xPos = uiState.mouseX;
    menuState.yPos = uiState.mouseY;
  }
  if (menuState.open) {
    drawContextMenu();
  }
  if (!uiState.rightMouseDown && menuState.open) {
    menuState.open = false;
    menuState.hotItem = 0;
  }
};

const menuButtonWidth = 146;
const menuButtonHeight = 48;

const drawContextMenu = () => {
  drawRect(menuState.xPos, menuState.yPos, menuButtonWidth + 4, (menuButtonHeight + 2) * 4, '#aaa');
  menuButton(1, menuState.xPos + 2, menuState.yPos + 2);
  menuButton(2, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 1);
  menuButton(3, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 2);
  menuButton(4, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 3);
  // console.log(btn1, btn2, btn3, btn4, menuState.hotItem);
};

const menuButton = (id: number, x: number, y: number) => {
  if (regionHit(x, y, menuButtonWidth, menuButtonHeight)) {
    menuState.hotItem = id;
  }

  if (menuState.hotItem === id) {
      drawRect(x, y, menuButtonWidth, menuButtonHeight, '#eee');
  } else {
    drawRect(x, y, menuButtonWidth, menuButtonHeight, '#ccc');
  }

  if (!uiState.rightMouseDown &&  menuState.hotItem === id) {
    return true;
  }
  return false;
};
