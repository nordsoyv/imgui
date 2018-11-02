import {IMouseInfo} from '../types';
import {setCtx, uiState} from './context';
import {ConnectionNode, getConnectorNodes, getNodes, Node} from './nodes';

import {updateContextMenu} from './contextMenu';
import {drawBezier} from "./drawFunc";

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
    uiState.activeConnector = 0;
    uiState.isDraggingConnector =0;
  } else {
    if (uiState.activeItem === 0) {
      uiState.activeItem = -1;
    }
  }
}

export const drawFlowChart = (ctx: CanvasRenderingContext2D, mouseInfo: IMouseInfo) => {
  setCtx(ctx);
  beginUI(mouseInfo);
  drawNodes();
  if(uiState.isDraggingConnector !==0){
    const startNode = getConnectorNodes().find(n => n.id === uiState.isDraggingConnector) as ConnectionNode;
    const realPos = startNode.getRealPos();
    drawBezier(realPos.xPos,realPos.yPos, uiState.mouseX, uiState.mouseY);
  }
  updateContextMenu();
  endUI();
};

const drawNodes = () => {
  getNodes().forEach((n: Node) => {
    n.draw();
  });
  getConnectorNodes().forEach((n: Node) => {
    n.draw();
  });

};
