import {regionHit, uiState} from './context';
import {addAbsNode, addCountingNode, addGraphNode, addMulNode, addOutputNode, addSinusNode} from './nodes';
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

const menuItems = [
  {name : "Counting Node", func: addCountingNode},
  {name : "Output Node", func: addOutputNode},
  {name : "Graph Node", func: addGraphNode},
  {name : "Sinus Node", func: addSinusNode},
  {name : "Abs Node", func: addAbsNode},
  {name : "Multiply Node", func: addMulNode},
];


const drawContextMenu = () => {
  drawRect(menuState.xPos, menuState.yPos, menuButtonWidth + 4, (menuButtonHeight + 2) * menuItems.length, '#aaa');
  menuItems.forEach((item ,  index)=> {
    menuButton(index +1, menuState.xPos + 2, menuState.yPos + 2 +((menuButtonHeight + 2 ) * index), item.name, () => {
      item.func(menuState.xPos, menuState.yPos);
    });
  })

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
