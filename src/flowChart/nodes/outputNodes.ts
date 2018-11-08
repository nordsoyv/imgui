import {regionHit, uiState} from '../context';
import {drawRect, drawText, measureText} from '../drawFunc';
import {addInBoundConnectorNode, } from './index';
import {Node} from './node'
import {colors, hoverShadowSize, nodeHeight, nodeWidth, shadowSize} from "./theme";

export class OutputNode extends Node {

  constructor(id: number, xPos: number, yPos: number) {
    super(id,xPos,yPos);
    this.inValue = 0;
    addInBoundConnectorNode(0, (nodeHeight / 2) + 5, this);
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
    drawRect(this.xPos,this.yPos,nodeWidth, 15, colors.main,[5,5,0,0],false );
    const textWidth = measureText(this.inValue.toFixed(1)).width;
    drawText(this.inValue.toFixed(1), this.xPos + (nodeWidth - textWidth)/2, this.yPos + 10 );
  }

}
