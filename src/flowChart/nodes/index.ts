import {ConnectionNode, InBoundConnectionNode, OutBoundConnectionNode} from './connectionNode';
import {Connection} from './connection';
import {CountingNode, ConstNode} from './inputNodes';
import {OutputNode} from './outputNodes';
import {Node} from './node';

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
  nodes.push(new ConstNode(nextId, xPos, yPos, value));
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

export {
  ConnectionNode,
  InBoundConnectionNode,
  OutBoundConnectionNode,
  Connection,
  CountingNode,
  ConstNode,
  OutputNode,
  Node,
};
