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
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
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

export function drawCircle(
  x: number,
  y: number,
  color: string,
  radius: number ,
  shadow: boolean = false
){
  const ctx = getCtx();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
}

const font = '10px sans-serif';

export function drawText(text: string, x: number, y: number) {
  const ctx = getCtx();
  ctx.fillStyle = 'black';
  ctx.font = font;
  ctx.fillText(text, x, y);
}

export function measureText(text: string) {
  const ctx = getCtx();
  ctx.font = font;
  return ctx.measureText(text);
}

export function drawBezier(startX:number, startY:number,endX:number,endY:number) {
  const ctx  =getCtx();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.bezierCurveTo(startX+50,startY, endX-50, endY, endX,endY);
  ctx.stroke()

}