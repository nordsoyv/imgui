import {regionHit, uiState} from '../context';
import {drawRect, drawText} from '../drawFunc';
import {addInBoundConnectorNode, getConnectorNodes} from './index';
import {ConnectionNode} from './connectionNode';
import {Node} from './node'

export class OutputNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  public inBoundId: number;
  constructor(id: number, xPos: number, yPos: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.value = 0;
    this.inBoundId = addInBoundConnectorNode(0, this.nodeHeight / 2, this);
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
    drawText(this.value.toFixed(2), this.xPos + 15, this.yPos + 5 + this.nodeHeight / 2);
  }

  simulate() {
    const connection = getConnectorNodes()[this.inBoundId] as ConnectionNode;
    if (connection.connection) {
      this.value = connection.connection.value || 0;
    }
  }
}
