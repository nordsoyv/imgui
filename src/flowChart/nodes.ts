import {drawBezier, drawCircle, drawRect, drawText} from './drawFunc';
import {regionHit, uiState} from './context';
export class Node {
  public xPos: number;
  public yPos: number;
  public id: number;

  draw() {}
  simulate() {}
}

const connectorRadius = 10;

export class ConnectionNode extends Node {
  public xOffset: number;
  public yOffset: number;
  public parent: Node;
  public id: number;
  public connection: Connection | null = null;

  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
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
}

export class OutBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
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

export class InBoundConnectionNode extends ConnectionNode {
  constructor(id: number, xOffset: number, yOffset: number, parent: Node) {
    super(id, xOffset, yOffset, parent);
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
  constructor(id: number, xPos: number, yPos: number, value: number) {
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
    drawText(this.value.toFixed(1), this.xPos + this.nodeWidth / 2, this.yPos + this.nodeHeight / 2);
  }
}

export class CountingNode extends Node {
  nodeWidth = 50;
  nodeHeight = 50;

  public xPos: number;
  public yPos: number;
  public id: number;
  public value: number;
  public startValue: number;
  public outBoundId: number;
  constructor(id: number, xPos: number, yPos: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.startValue = new Date().getTime();
    this.value = new Date().getTime();
    this.outBoundId = addOutBoundConnectorNode(this.nodeWidth, this.nodeHeight / 2, this);
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

    drawText(this.value.toFixed(2), this.xPos + 5, this.yPos + 5 + this.nodeHeight / 2);
  }

  simulate() {
    this.value = (new Date().getTime() - this.startValue) / 1000;
    const connection = getConnectorNodes()[this.outBoundId] as ConnectionNode;
    if (connection.connection) {
      connection.connection.value = this.value;
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
  public inBoundId: number;
  constructor(id: number, xPos: number, yPos: number) {
    super();
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.value = 0;
    this.inBoundId = addInBoundConnectorNode(0, this.nodeHeight / 2, this);
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
    drawText(this.value.toFixed(2), this.xPos + 15, this.yPos + 5 + this.nodeHeight / 2);
  }

  simulate() {

    const connection = getConnectorNodes()[this.inBoundId] as ConnectionNode;
    if (connection.connection) {
      this.value = connection.connection.value || 0
    }
  }
}

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
    const node1Pos = connectorNodes[this.inputNode].getRealPos();
    const node2Pos = connectorNodes[this.outputNode].getRealPos();

    drawBezier(node1Pos.xPos, node1Pos.yPos, node2Pos.xPos, node2Pos.yPos);

  }
}

const nodes: Node[] = [];
const connectorNodes: ConnectionNode[] = [];
const connections: Connection[] = [];

export const addConnection = (inputId: number, outputId: number) => {
  const connection = new Connection(inputId, outputId);
  connectorNodes[inputId].connection = connection;
  connectorNodes[outputId].connection = connection;
  connections.push(connection);
};

export const addInputNode = (xPos: number, yPos: number, value: number) => {
  const nextId = nodes.length;
  nodes.push(new InputNode(nextId, xPos, yPos, value));
};

export const addCountingNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new CountingNode(nextId, xPos, yPos));
};

export const addOutputNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new OutputNode(nextId, xPos, yPos));
};

export const addOutBoundConnectorNode = (xPos: number, yPos: number, parent: Node) => {
  const nextId = connectorNodes.length;
  connectorNodes.push(new OutBoundConnectionNode(nextId, xPos, yPos, parent));
  return nextId;
};

export const addInBoundConnectorNode = (xPos: number, yPos: number, parent: Node) => {
  const nextId = connectorNodes.length;
  connectorNodes.push(new InBoundConnectionNode(nextId, xPos, yPos, parent));
  return nextId;
};

export const getNodes = () => nodes;
export const getConnectorNodes = () => connectorNodes;
export const getConnections = () => connections;
