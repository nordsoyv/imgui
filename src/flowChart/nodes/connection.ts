import {drawBezier} from "../drawFunc";
import {getConnectorNodes} from "./index";

export class Connection {
  public inputNode: number;
  public outputNode: number;
  public value: any;

  constructor(inputId: number, outputId: number) {
    this.inputNode = inputId;
    this.outputNode = outputId;
    this.value = null;
  }

  draw() {
    const node1Pos = getConnectorNodes()[this.inputNode].getRealPos();
    const node2Pos = getConnectorNodes()[this.outputNode].getRealPos();

    drawBezier(node1Pos.xPos, node1Pos.yPos, node2Pos.xPos, node2Pos.yPos);

  }
}