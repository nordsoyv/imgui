import {regionHit, uiState} from '../context';
import {drawRect, drawText, measureText} from '../drawFunc';
import {addOutBoundConnectorNode} from './index';
import {Node} from './node';
import {colors, hoverShadowSize, nodeHeaderHeight, nodeHeight, nodeWidth, shadowSize} from './theme';

export class InputNode extends Node {
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.outValue = 0
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
    const textWidth = measureText(this.outValue.toFixed(1)).width;
    drawText(this.outValue.toFixed(1), this.xPos + (nodeWidth - textWidth) / 2, this.yPos + 10);
  }
}

export class ConstNode extends InputNode {
  constructor(id: number, xPos: number, yPos: number, value: any) {
    super(id, xPos, yPos);
    this.outValue = value;
    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
  }
}

export class CountingNode extends InputNode {
  public startValue: number;
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.startValue = new Date().getTime();
    this.outValue = new Date().getTime();

    addOutBoundConnectorNode(nodeWidth, nodeHeight / 2 + 5, this);
  }

  simulate() {
    this.outValue = (new Date().getTime() - this.startValue) / 1000;
  }
}
