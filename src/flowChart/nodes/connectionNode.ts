import {addConnection, Connection} from './index';
import {regionHit, uiState} from '../context';
import {drawCircle} from '../drawFunc';
import {Node} from './node';
import {colors, connectorRadius} from './theme';

export class ConnectionNode {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;
  public connection: Connection | null = null;
  public value: any;

  get xPos() {
    return this.parent.xPos + this.xOffset;
  }

  get yPos() {
    return this.parent.yPos + this.yOffset;
  }

  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.parent = parent;
    this.id = id;
    this.value = 0;
  }


  protected doHitCheck() {
    if (regionHit(this.xPos - connectorRadius, this.yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
      uiState.activeItem = -1;
      uiState.isDraggingNode = -1;
    }
  }

  protected drawFrame() {
    if (uiState.activeConnector === this.id) {
      drawCircle(this.xPos + 1, this.yPos + 1, colors.selectedConnectorNode, connectorRadius + 2);
    } else {
      drawCircle(this.xPos, this.yPos, colors.connectorNode, connectorRadius);
    }
  }

  getRealPos() {
    return {
      xPos: this.xPos,
      yPos: this.yPos,
    };
  }
  draw() {}
}

export class OutBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
  }

  draw() {
    this.doHitCheck();
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector === -1 && uiState.leftMouseDown) {
      uiState.isDraggingConnector = this.id;
    }
    this.drawFrame();
  }
}

export class InBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
  }

  draw() {
    this.doHitCheck();
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector !== -1 && !uiState.leftMouseDown) {
      addConnection(uiState.isDraggingConnector, this.id);
      uiState.isDraggingConnector = -1;
    }
    this.drawFrame();
  }
}
