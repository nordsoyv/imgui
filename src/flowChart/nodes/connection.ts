import {drawBezier} from '../drawFunc';
import {getConnectorNodes} from './index';

export class Connection {
  public inputNode: number;
  public outputNode: number;

  constructor(inputId: number, outputId: number) {
    this.inputNode = inputId;
    this.outputNode = outputId;
  }

  draw() {
    const node1Pos = getConnectorNodes()[this.inputNode].getRealPos();
    const node2Pos = getConnectorNodes()[this.outputNode].getRealPos();

    drawBezier(node1Pos.xPos, node1Pos.yPos, node2Pos.xPos, node2Pos.yPos);
  }

  simulate() {
    const node1 = getConnectorNodes()[this.inputNode];
    const node2 = getConnectorNodes()[this.outputNode];
    node2.value = node1.value;
  }
}
