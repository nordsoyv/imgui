import {IMouseInfo} from '../types';
import {setCtx, uiState} from './context';
import {updateContextMenu} from "./contextMenu";

function beginUI(mouseInfo: IMouseInfo) {
  uiState.hotItem = 0;
  uiState.mouseX = mouseInfo.xPos;
  uiState.mouseY = mouseInfo.yPos;
  uiState.leftMouseDown = mouseInfo.leftButton;
  uiState.rightMouseDown = mouseInfo.rightButton;
}

function endUI() {
  if (!uiState.leftMouseDown) {
    uiState.activeItem = 0;
  } else {
    if (uiState.activeItem === 0) {
      uiState.activeItem = -1;
    }
  }
}

export const drawFlowChart = (ctx: CanvasRenderingContext2D, mouseInfo: IMouseInfo) => {
  setCtx(ctx);
  beginUI(mouseInfo);
  updateContextMenu();
  endUI();
};

