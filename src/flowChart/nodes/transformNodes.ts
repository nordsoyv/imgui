import {Node} from './node';
import {addInBoundConnectorNode, addOutBoundConnectorNode} from './index';
import {colors, hoverShadowSize, nodeHeaderHeight, nodeHeight, nodeWidth, shadowSize} from './theme';
import {regionHit, uiState} from '../context';
import {drawRect, drawText, measureText} from '../drawFunc';

class TransformNode extends Node {
  name: string = '*';

  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
    addInBoundConnectorNode(0, nodeHeight / 2 + 5, this);
  }

  draw() {
    if (regionHit(this.xPos, this.yPos, nodeWidth, nodeHeight)) {
      uiState.activeItem = this.id;
    }

    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, nodeWidth, nodeHeight, colors.white, [5], true, hoverShadowSize);
    } else {
      drawRect(this.xPos, this.yPos, nodeWidth, nodeHeight, colors.white, [5], true, shadowSize);
    }
    drawRect(this.xPos, this.yPos, nodeWidth, nodeHeaderHeight, colors.main, [5, 5, 0, 0], false);
    const textWidth = measureText(this.name).width;
    drawText(this.name, this.xPos + (nodeWidth - textWidth) / 2, this.yPos + 10);
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
  name: string = 'Sinus';
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
  }

  simulate() {
    this.outValue = Math.sin(this.inValue);
  }
}
