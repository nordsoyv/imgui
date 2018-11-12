import {addOutBoundConnectorNode, getConnectorNodes} from './index';
import {Node} from './node';
import {nodeHeight, nodeWidth} from './theme';

export class InputNode extends Node {
  outboundId = 0;
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.outboundId = addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
  }

  draw() {
    this.doHitCheck();
    this.drawFrame();

    this.drawHeader();
    this.drawValue(getConnectorNodes()[this.outboundId].value);
  }
}

export class ConstNode extends InputNode {
  constructor(id: number, xPos: number, yPos: number, value: any) {
    super(id, xPos, yPos);
    this.name = 'Const';
    getConnectorNodes()[this.outboundId].value = value;
  }
}

export class CountingNode extends InputNode {
  public startValue: number;
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.startValue = new Date().getTime();
    getConnectorNodes()[this.outboundId].value = new Date().getTime();
    this.name = 'Counting';
  }

  simulate() {
    const outNode = getConnectorNodes()[this.outboundId];
    outNode.value = (new Date().getTime() - this.startValue) / 1000;
  }
}
