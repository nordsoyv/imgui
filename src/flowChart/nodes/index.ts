import {ConnectionNode, InBoundConnectionNode, OutBoundConnectionNode} from './connectionNode';
import {Connection} from './connection';
import {CountingNode, ConstNode} from './inputNodes';
import {GraphNode, OutputNode} from './outputNodes';
import {Node} from './node';
import {SinusNode, MulNode, AbsNode} from './transformNodes';

let nodes: Node[] = [];
let connectorNodes: ConnectionNode[] = [];
let connections: Connection[] = [];

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
export const addSinusNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new SinusNode(nextId, xPos, yPos));
};
export const addMulNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new MulNode(nextId, xPos, yPos, 10));
};

export const addOutputNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new OutputNode(nextId, xPos, yPos));
};

export const addGraphNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new GraphNode(nextId, xPos, yPos));
};

export const addAbsNode = (xPos: number, yPos: number) => {
  const nextId = nodes.length;
  nodes.push(new AbsNode(nextId, xPos, yPos));
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
export const resetNodes = () => {
  nodes = [];
  connectorNodes = [];
  connections = [];
};

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
