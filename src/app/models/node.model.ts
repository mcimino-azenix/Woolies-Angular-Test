import {NodeType} from "../../node-type";

export class NodeModel {
  type: NodeType;
  name?: string;
  children?: NodeModel[];
  id: string;
}
