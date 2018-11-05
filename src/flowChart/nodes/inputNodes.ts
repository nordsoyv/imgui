import {regionHit, uiState} from "../context";
import {drawRect, drawText} from "../drawFunc";
import {addOutBoundConnectorNode, getConnectorNodes} from "./index";
import {ConnectionNode} from "./connectionNode";
import {Node} from './node'

export class InputNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  constructor(id: number, xPos: number, yPos: number, value: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.value = value;
    addOutBoundConnectorNode(this.nodeWidth, this.nodeHeight / 2, this);
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
    drawText(this.value.toFixed(1), this.xPos + this.nodeWidth / 2, this.yPos + this.nodeHeight / 2);
  }
}

export class CountingNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  public startValue: number;
  public outBoundId: number;
  constructor(id: number, xPos: number, yPos: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.startValue = new Date().getTime();
    this.value = new Date().getTime();
    this.outBoundId = addOutBoundConnectorNode(this.nodeWidth, this.nodeHeight / 2, this);
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

    drawText(this.value.toFixed(2), this.xPos + 5, this.yPos + 5 + this.nodeHeight / 2);
  }

  simulate() {
    this.value = (new Date().getTime() - this.startValue) / 1000;
    const connection = getConnectorNodes()[this.outBoundId] as ConnectionNode;
    if (connection.connection) {
      connection.connection.value = this.value;
    }
  }
}
