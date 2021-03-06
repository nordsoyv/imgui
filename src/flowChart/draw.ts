import {IMouseInfo} from '../types';
import {setCtx, uiState} from './context';
import {
    OutBoundConnectionNode,
    getConnectorNodes,
    getNodes,
    Node,
    getConnections,
    Connection,
    ConnectionNode
} from './nodes';

import {updateContextMenu} from './contextMenu';
import {drawBezier} from './drawFunc';

function beginUI(mouseInfo: IMouseInfo) {
  uiState.hotItem = -1;
  uiState.mouseX = mouseInfo.xPos;
  uiState.mouseY = mouseInfo.yPos;
  uiState.leftMouseDown = mouseInfo.leftButton;
  uiState.rightMouseDown = mouseInfo.rightButton;
}

function endUI() {
  if (!uiState.leftMouseDown) {
    uiState.activeItem = -1;
    uiState.activeConnector = -1;
    uiState.isDraggingConnector = -1;
    uiState.isDraggingNode = -1;
  } else {
    if (uiState.activeItem === -1) {
      uiState.activeItem = -1;
    }
  }
  console.log({isDragging: uiState.isDraggingNode, dragStartX: uiState.dragStartX, dragStartY: uiState.dragStartY});
  console.log();
}

export const drawFlowChart = (ctx: CanvasRenderingContext2D, mouseInfo: IMouseInfo) => {
  setCtx(ctx);
  beginUI(mouseInfo);
  drawNodes();
  if (uiState.isDraggingConnector !== -1) {
    const startNode = getConnectorNodes().find(n => n.id === uiState.isDraggingConnector) as OutBoundConnectionNode;
    const realPos = startNode.getRealPos();
    drawBezier(realPos.xPos, realPos.yPos, uiState.mouseX, uiState.mouseY);
  }
  drawConnections();

  updateContextMenu();
  endUI();
};

const drawNodes = () => {
  getNodes().forEach((n: Node) => {
    n.simulate();
    n.draw();
  });
  getConnectorNodes().forEach((n: ConnectionNode) => {
    n.draw();
  });
};

const drawConnections = () => {
  getConnections().forEach((n: Connection) => {
    n.draw();
    n.simulate();
  });
};
