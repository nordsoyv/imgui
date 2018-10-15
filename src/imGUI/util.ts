import { uiState } from './uiState'

let ctx : CanvasRenderingContext2D;
export function setCtx(c : CanvasRenderingContext2D) {
  ctx = c;
}

export function drawRect(x : number, y : number, width : number, height : number, color : string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

export function regionHit(x : number, y : number, w : number, h : number) {
  if (uiState.mouseX < x || uiState.mouseY < y || uiState.mouseX >= x + w || uiState.mouseY >= y + h) {
    return false
  }
  return true;
}
