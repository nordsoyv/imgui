import {addConnection, Connection} from './index';
import {regionHit, uiState} from '../context';
import {drawCircle} from '../drawFunc';
import {Node} from './node';

const connectorRadius = 10;

export class ConnectionNode extends Node {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;
  public connection: Connection | null = null;

  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super();
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.parent = parent;
    this.id = id;
  }
  getRealPos() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    return {
      xPos,
      yPos,
    };
  }
}

export class OutBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
  }

  draw() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    if (regionHit(xPos - connectorRadius, yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
    }
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector === -1 && uiState.leftMouseDown) {
      uiState.isDraggingConnector = this.id;
    }
    if (uiState.activeConnector === this.id) {
      drawCircle(xPos + 1, yPos + 1, '#fff', connectorRadius + 2);
    } else {
      drawCircle(xPos, yPos, '#aaa', connectorRadius);
    }
  }
}

export class InBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
  }

  draw() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    if (regionHit(xPos - connectorRadius, yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
    }
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector !== -1 && !uiState.leftMouseDown) {
      addConnection(uiState.isDraggingConnector, this.id);
      uiState.isDraggingConnector = -1;
    }
    if (uiState.activeConnector === this.id) {
      drawCircle(xPos + 1, yPos + 1, '#fff', connectorRadius + 2);
    } else {
      drawCircle(xPos, yPos, '#aaa', connectorRadius);
    }
  }
}
