import {Node} from './node';
import {addInBoundConnectorNode, addOutBoundConnectorNode} from './index';
import {nodeHeight, nodeWidth} from './theme';

class TransformNode extends Node {
  name: string = '*';

  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.outValue = 0;
    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
    addInBoundConnectorNode(0, nodeHeight / 2 + 5, this);
  }

  draw() {
    this.doHitCheck();
    this.drawFrame();
    this.drawHeader();
    if(Number.isNaN(this.outValue)){
      this.drawValue(0)
    }else {
      this.drawValue(this.outValue);
    }
  }
}

export class MulNode extends TransformNode {
  mul: number;
  constructor(id: number, xPos: number, yPos: number, mul: number) {
    super(id, xPos, yPos);
    this.mul = mul;
  }

  simulate() {
    this.outValue = this.inValue * this.mul;
  }
}

export class SinusNode extends TransformNode {
  name: string = 'Sin';
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
  }

  simulate() {
    this.outValue = Math.sin(this.inValue);
  }
}


export class AbsNode extends TransformNode {
    name: string = 'Abs';
    constructor(id: number, xPos: number, yPos: number) {
        super(id, xPos, yPos);
    }

    simulate() {
        this.outValue = Math.abs(this.inValue);
    }
}