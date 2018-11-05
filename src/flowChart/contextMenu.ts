import {regionHit, uiState} from './context';
import {addInputNode} from './nodes';
import {drawRect, drawText} from './drawFunc';

const menuState = {
  open: false,
  xPos: 0,
  yPos: 0,
  hotItem: -1,
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

const menuButtonWidth = 100;
const menuButtonHeight = 28;

const drawContextMenu = () => {
  drawRect(menuState.xPos, menuState.yPos, menuButtonWidth + 4, (menuButtonHeight + 2) * 4, '#aaa');
  menuButton(1, menuState.xPos + 2, menuState.yPos + 2, 'Const Node', () => {
    addInputNode(menuState.xPos, menuState.yPos, 0);
  });
  menuButton(2, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 1);
  menuButton(3, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 2);
  menuButton(4, menuState.xPos + 2, menuState.yPos + 2 + (menuButtonHeight + 2) * 3);
  // console.log(btn1, btn2, btn3, btn4, menuState.hotItem);
};

const menuButton = (id: number, x: number, y: number, text: string = '', cb = () => {}) => {
  if (regionHit(x, y, menuButtonWidth, menuButtonHeight)) {
    menuState.hotItem = id;
  }

  if (menuState.hotItem === id) {
    drawRect(x, y, menuButtonWidth, menuButtonHeight, '#eee');
  } else {
    drawRect(x, y, menuButtonWidth, menuButtonHeight, '#ccc');
  }

  drawText(text, x + 5, y + 5 + 12);

  if (!uiState.rightMouseDown && menuState.hotItem === id) {
    cb();
  }
  return false;
};
