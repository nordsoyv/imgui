import {Node} from './node';
import {addInBoundConnectorNode, addOutBoundConnectorNode, getConnectorNodes} from './index';
import {nodeHeight, nodeWidth} from './theme';

class TransformNode extends Node {
  name: string = '*';
  outboundId = 0;
  inboundId = 0;

  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.outboundId = addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
    this.inboundId = addInBoundConnectorNode(0, nodeHeight / 2 + 5, this);
  }

  draw() {
    this.doHitCheck();
    this.drawFrame();
    this.drawHeader();
    this.drawValue(getConnectorNodes()[this.outboundId].value);
  }
}

export class MulNode extends TransformNode {
  mul: number;
  constructor(id: number, xPos: number, yPos: number, mul: number) {
    super(id, xPos, yPos);
    this.mul = mul;
  }

  simulate() {
    const inNode = getConnectorNodes()[this.inboundId];
    const outNode = getConnectorNodes()[this.outboundId];
    outNode.value = inNode.value * this.mul;
  }
}

export class SinusNode extends TransformNode {
  name: string = 'Sin';
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
  }

  simulate() {
    const inNode = getConnectorNodes()[this.inboundId];
    const outNode = getConnectorNodes()[this.outboundId];
    outNode.value = Math.sin(inNode.value);
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