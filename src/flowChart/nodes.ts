import {drawCircle, drawRect} from './drawFunc';
import {getNextConnectorId, getNextNodeId, regionHit, uiState} from './context';
export class Node {
  public xPos: number;
  public yPos: number;
  public id: number;

  draw() {}
}

const connectorRadius = 10;

export class ConnectionNode extends Node {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;

  constructor(xOffset: number, yOffset: number, parent: Node) {
    super();
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.parent = parent;
    this.id = getNextConnectorId();
  }

  getRealPos() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    return {
      xPos,
      yPos,
    };
  }

  draw() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    if (regionHit(xPos - connectorRadius, yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
    }
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector === 0 && uiState.leftMouseDown) {
      uiState.isDraggingConnector = this.id;
    }
    if (uiState.activeConnector === this.id) {
      drawCircle(xPos + 1, yPos + 1, '#fff', connectorRadius + 2);
    } else {
      drawCircle(xPos, yPos, '#aaa', connectorRadius);
    }
  }
}

export class ConstNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  constructor(xPos: number, yPos: number, value: number) {
    super();
    this.id = getNextNodeId();
    this.xPos = xPos;
    this.yPos = yPos;
    this.value = value;
    addConnectorNode(this.nodeHeight, this.nodeWidth / 2, this);
  }

  draw() {
    if (regionHit(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight)) {
      uiState.activeItem = this.id;
    }

    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5, true);
    } else {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5);
    }
  }
}

const nodes: Node[] = [];
const connectorNodes: ConnectionNode[] = [];

export const addConstNode = (xPos: number, yPos: number, value: number) => {
  nodes.push(new ConstNode(xPos, yPos, value));
};

export const addConnectorNode = (xPos: number, yPos: number, parent: Node) => {
  connectorNodes.push(new ConnectionNode(xPos, yPos, parent));
};

export const getNodes = () => nodes;
export const getConnectorNodes = () => connectorNodes;
