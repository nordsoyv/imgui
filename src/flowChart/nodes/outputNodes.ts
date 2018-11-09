import {getCtx, regionHit, uiState} from '../context';
import {drawRect, drawText, measureText} from '../drawFunc';
import {addInBoundConnectorNode} from './index';
import {Node} from './node';
import {colors, hoverShadowSize, nodeHeaderHeight, nodeHeight, nodeWidth, shadowSize} from './theme';

export class OutputNode extends Node {
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.inValue = 0;
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
    const textWidth = measureText(this.inValue.toFixed(1)).width;
    drawText(this.inValue.toFixed(1), this.xPos + (nodeWidth - textWidth) / 2, this.yPos + 10);
  }
}

export class GraphNode extends OutputNode {
  oldValues: number[] = [];
  maxItems = 200;
  nodeXSize = 220;
  nodeYSize = 150;

  graphYSize = this.nodeYSize -15 -4;
  graphXSize = this.nodeXSize -4;
  name  = 'Graphing';
  draw() {
    if (regionHit(this.xPos, this.yPos, nodeWidth, nodeHeight)) {
      uiState.activeItem = this.id;
    }
    const max = Math.max(...this.oldValues);
    const min = Math.min(...this.oldValues);
    const spread = max - min;
    const graphXStart = this.xPos + 2;
    const graphYStart = this.yPos + nodeHeaderHeight + 2;

    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, this.nodeXSize, this.nodeYSize, colors.white, [5], true, hoverShadowSize);
    } else {
      drawRect(this.xPos, this.yPos,  this.nodeXSize, this.nodeYSize, colors.white, [5], true, shadowSize);
    }
    drawRect(this.xPos, this.yPos, this.nodeXSize,nodeHeaderHeight , colors.main, [5, 5, 0, 0], false);
    const textWidth = measureText(this.name).width;
    drawText(this.name, this.xPos + (this.graphXSize + 4 - textWidth) / 2, this.yPos + 10);

    drawRect(graphXStart, graphYStart, this.graphYSize, this.graphYSize, 'blue', [0], false);

    const scale = (num: number) => {
      const ratio = (num - min) / spread;
      return ratio * this.graphYSize;
    };

    const ctx = getCtx();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(graphXStart, graphYStart + this.graphYSize / 2);
    this.oldValues.forEach((num, index) => {
      ctx.lineTo(graphXStart + index, graphYStart + scale(num));
    });
    ctx.stroke();
  }

  simulate() {
    this.oldValues.push(this.inValue);
    if (this.oldValues.length > this.maxItems) {
      this.oldValues = this.oldValues.slice(this.oldValues.length - this.maxItems);
    }
  }
}
