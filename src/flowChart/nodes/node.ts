export class Node {
  public xPos: number;
  public yPos: number;
  public id: number;
  public value :any;

  constructor(id: number, xPos: number, yPos: number, ) {
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.value  = '';
  }

  draw() {}
  simulate() {}
}
