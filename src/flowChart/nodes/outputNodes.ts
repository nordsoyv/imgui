import {getCtx} from '../context';
import {drawRect} from '../drawFunc';
import {addInBoundConnectorNode} from './index';
import {Node} from './node';
import {nodeHeaderHeight} from './theme';

export class OutputNode extends Node {
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.inValue = 0;
    this.name = 'Output';
    addInBoundConnectorNode(0, this.nodeYSize / 2 + 5, this);
  }

  draw() {
    this.doHitCheck();
    this.drawFrame();
    this.drawHeader();

    this.drawValue(this.inValue);
  }
}

export class GraphNode extends OutputNode {
  oldValues: number[] = [];
  maxItems = 200;

  graphYSize: number;
  graphXSize: number;
  constructor(id: number, xPos: number, yPos: number) {
    super(id, xPos, yPos);
    this.name = 'Graphing';
    this.nodeXSize = 220;
    this.nodeYSize = 150;
    this.graphYSize = this.nodeYSize - 15 - 4;
    this.graphXSize = this.nodeXSize - 4;
  }
  draw() {
    this.doHitCheck();
    const max = Math.max(...this.oldValues);
    const min = Math.min(...this.oldValues);
    const spread = max - min;
    const graphXStart = this.xPos + 2;
    const graphYStart = this.yPos + nodeHeaderHeight + 2;

    this.drawFrame();
    this.drawHeader();
    drawRect(graphXStart, graphYStart, this.graphXSize, this.graphYSize, 'blue', [0], false);

    const scale = (num: number) => {
      const ratio = (num - min) / spread;
      return ratio * this.graphYSize * -1;
    };

    const ctx = getCtx();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(graphXStart, graphYStart + this.graphYSize / 2);
    this.oldValues.forEach((num, index) => {
      ctx.lineTo(graphXStart + index, graphYStart + this.graphYSize + scale(num));
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
