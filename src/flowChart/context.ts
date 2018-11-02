let ctx: CanvasRenderingContext2D;
export function setCtx(c: CanvasRenderingContext2D) {
  ctx = c;
}

export function getCtx(): CanvasRenderingContext2D {
  return ctx;
}

export const uiState = {
  mouseX: 0,
  mouseY: 0,
  leftMouseDown: false,
  rightMouseDown: false,
  hotItem: 0,
  activeItem: 0,
  lastWidget: 0,
  contextMenuOpen : false,
};

export function regionHit(x: number, y: number, w: number, h: number) {
  if (uiState.mouseX < x || uiState.mouseY < y || uiState.mouseX >= x + w || uiState.mouseY >= y + h) {
    return false;
  }
  return true;
}
