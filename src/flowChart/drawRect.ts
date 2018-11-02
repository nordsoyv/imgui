import {getCtx} from './context'

export function drawRect(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  radius: number = 0,
  shadow: boolean = false
) {
  const ctx = getCtx();
  const rad = {
    bl: radius,
    br: radius,
    tl: radius,
    tr: radius,
  };

  ctx.beginPath();
  ctx.moveTo(x + rad.tl, y);
  ctx.lineTo(x + width - rad.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + rad.tr);
  ctx.lineTo(x + width, y + height - rad.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - rad.br, y + height);
  ctx.lineTo(x + rad.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - rad.bl);
  ctx.lineTo(x, y + rad.tl);
  ctx.quadraticCurveTo(x, y, x + rad.tl, y);
  ctx.closePath();

  if (shadow) {
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
  }

  ctx.fillStyle = color;
  ctx.fill();

  if (shadow) {
    ctx.shadowColor = 'white';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
  }
}
