import {drawBezier, drawCircle, drawRect} from './drawFunc';
import {regionHit, uiState} from './context';
export class Node {
  public xPos: number;
  public yPos: number;
  public id: number;

  draw() {}
}

const connectorRadius = 10;

export class OutBoundConnectionNode extends Node {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;

  constructor(id : number, xOffset: number, yOffset: number, parent: Node) {
    super();
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.parent = parent;
    this.id = id;
  }

  getRealPos() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    return {
      xPos,
      yPos,
    };
  }

  draw() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    if (regionHit(xPos - connectorRadius, yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
    }
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector === -1 && uiState.leftMouseDown) {
      uiState.isDraggingConnector = this.id;
    }
    if (uiState.activeConnector === this.id) {
      drawCircle(xPos + 1, yPos + 1, '#fff', connectorRadius + 2);
    } else {
      drawCircle(xPos, yPos, '#aaa', connectorRadius);
    }
  }
}
export class InBoundConnectionNode extends Node {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;

  constructor(id : number, xOffset: number, yOffset: number, parent: Node) {
    super();
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.parent = parent;
    this.id = id;
  }

  getRealPos() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    return {
      xPos,
      yPos,
    };
  }

  draw() {
    const xPos = this.parent.xPos + this.xOffset;
    const yPos = this.parent.yPos + this.yOffset;
    if (regionHit(xPos - connectorRadius, yPos - connectorRadius, connectorRadius * 2, connectorRadius * 2)) {
      uiState.activeConnector = this.id;
    }
    if (uiState.activeConnector === this.id && uiState.isDraggingConnector !== -1 && !uiState.leftMouseDown) {
      addConnection(uiState.isDraggingConnector, this.id);
      uiState.isDraggingConnector = -1;
    }
    if (uiState.activeConnector === this.id) {
      drawCircle(xPos + 1, yPos + 1, '#fff', connectorRadius + 2);
    } else {
      drawCircle(xPos, yPos, '#aaa', connectorRadius);
    }
  }
}

export class InputNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  constructor(id:number,xPos: number, yPos: number, value: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.value = value;
    addOutBoundConnectorNode(this.nodeWidth, this.nodeHeight / 2, this);
  }

  draw() {
    if (regionHit(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight)) {
      uiState.activeItem = this.id;
    }

    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5, true);
    } else {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5);
    }
  }
}


export class OutputNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  constructor(id:number,xPos: number, yPos: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    addInBoundConnectorNode(0, this.nodeHeight / 2, this);
  }

  draw() {
    if (regionHit(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight)) {
      uiState.activeItem = this.id;
    }

    if (uiState.activeItem === this.id) {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5, true);
    } else {
      drawRect(this.xPos, this.yPos, this.nodeWidth, this.nodeHeight, '#aa2222', 5);
    }
  }
}

export class Connection {
  public inputNode:number;
  public outputNode:number;

  constructor(inputId:number, outputId:number) {
    this.inputNode = inputId;
    this.outputNode = outputId;
  }

  draw(){
    const node1Pos = connectorNodes[this.inputNode].getRealPos();
    const node2Pos = connectorNodes[this.outputNode].getRealPos();

    drawBezier(node1Pos.xPos,node1Pos.yPos,node2Pos.xPos,node2Pos.yPos)
  }

}

const nodes: Node[] = [];
const connectorNodes: OutBoundConnectionNode[] = [];
const connections : Connection[] = [];

export const addConnection = (inputId:number, outputId:number) => {
  connections.push(new Connection(inputId, outputId))
};

export const addInputNode = (xPos: number, yPos: number, value: number) => {
  const nextId = nodes.length;
  nodes.push(new InputNode(nextId,xPos, yPos, value));
};

export const addOutputNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new OutputNode(nextId,xPos, yPos));
};

export const addOutBoundConnectorNode = (xPos: number, yPos: number, parent: Node) => {
  const nextId = connectorNodes.length;
  connectorNodes.push(new OutBoundConnectionNode(nextId, xPos, yPos, parent));
};

export const addInBoundConnectorNode = (xPos: number, yPos: number, parent: Node) => {
  const nextId = connectorNodes.length;
  connectorNodes.push(new InBoundConnectionNode(nextId, xPos, yPos, parent));
};

export const getNodes = () => nodes;
export const getConnectorNodes = () => connectorNodes;
export const getConnections = () => connections;
