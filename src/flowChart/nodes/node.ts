import {colors, hoverShadowSize, nodeHeaderHeight, nodeHeight, nodeWidth, shadowSize} from './theme';
import {regionHit, uiState} from '../context';
import {drawRect, drawText, measureText} from '../drawFunc';

export class Node {
  public xPos: number;
  public yPos: number;
  public id: number;
  public inValue: any;
  public outValue: any;
  protected nodeXSize: number = nodeWidth;
  protected nodeYSize: number = nodeHeight;
  protected name: string;

  constructor(id: number, xPos: number, yPos: number) {
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  protected doHitCheck() {
    if (regionHit(this.xPos, this.yPos, this.nodeXSize, this.nodeYSize)) {
      uiState.activeItem = this.id;
      if (uiState.leftMouseDown && uiState.isDraggingNode === -1 && uiState.isDraggingConnector === -1) {
        uiState.isDraggingNode = this.id;
        uiState.dragStartX = uiState.mouseX;
        uiState.dragStartY = uiState.mouseY;
      }
    }
    if (uiState.isDraggingNode === this.id) {
      const movedX = uiState.mouseX - uiState.dragStartX;
      const movedY = uiState.mouseY - uiState.dragStartY;

      this.xPos = this.xPos + movedX;
      this.yPos = this.yPos + movedY;
      uiState.dragStartX = uiState.mouseX;
      uiState.dragStartY = uiState.mouseY;
    }
  }

  protected drawFrame() {
    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, this.nodeXSize, this.nodeYSize, colors.white, [5], true, hoverShadowSize);
    } else {
      drawRect(this.xPos, this.yPos, this.nodeXSize, this.nodeYSize, colors.white, [5], true, shadowSize);
    }
  }

  protected drawHeader() {
    drawRect(this.xPos, this.yPos, this.nodeXSize, nodeHeaderHeight, colors.main, [5, 5, 0, 0], false);
    const textWidth = measureText(this.name).width;
    drawText(this.name, this.xPos + (this.nodeXSize - textWidth) / 2, this.yPos + 10);
  }

  protected drawValue(value: number) {
    const textWidth = measureText(value.toFixed(1)).width;
    drawText(value.toFixed(1), this.xPos + (this.nodeXSize - textWidth) / 2, this.yPos + nodeHeaderHeight + 15);
  }

  draw() {}
  simulate() {}
}
