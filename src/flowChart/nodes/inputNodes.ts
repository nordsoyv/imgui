import {addOutBoundConnectorNode} from './index';
import {Node} from './node';
import {nodeHeight, nodeWidth} from './theme';

export class InputNode extends Node {
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.outValue = 0;
  }

  draw() {
    this.doHitCheck();
    this.drawFrame();

    this.drawHeader();
    this.drawValue(this.outValue);
  }
}

export class ConstNode extends InputNode {
  constructor(id: number, xPos: number, yPos: number, value: any) {
    super(id, xPos, yPos);
    this.outValue = value;
    this.name = 'Const';
    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
  }
}

export class CountingNode extends InputNode {
  public startValue: number;
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.startValue = new Date().getTime();
    this.outValue = new Date().getTime();
    this.name = 'Counting';
    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
  }

  simulate() {
    this.outValue = (new Date().getTime() - this.startValue) / 1000;
  }
}
