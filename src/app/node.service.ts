import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeModel } from './models/node.model';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private nodesSubject: BehaviorSubject<NodeModel[]>;
  private idCounter: number;
  public nodes: Observable<NodeModel[]>;

  constructor() {
    this.nodesSubject = new BehaviorSubject<NodeModel[]>([]);
    this.nodes = this.nodesSubject.asObservable();
    this.idCounter = 1;
  }

  // Add a node to the node structure
  addNode(node: NodeModel, parentId?: string): void {
    node.id = this.generateUniqueId();
    const nodes = this.nodesSubject.getValue();

    if (parentId) {
      const parent = this.findNodeById(nodes, parentId);
      if (parent) {
        // If parent has no children, initialize the children array
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    } else {
      nodes.push(node);
    }

    this.nodesSubject.next([...nodes]);
  }

  // Update an existing node
  updateNode(updatedNode: NodeModel): void {
    const nodes = this.nodesSubject.getValue();
    const index = nodes.findIndex(node => node.id === updatedNode.id);
    if (index !== -1) {
      // Merge the updatedNode properties into the existing node
      nodes[index] = { ...nodes[index], ...updatedNode };
      this.nodesSubject.next(nodes);
    }
  }

  // Remove a node from the node structure
  removeNode(id: string): void {
    const nodes = this.nodesSubject.getValue();
    const updatedNodes = this.removeNodeRecursive(nodes, id);
    this.nodesSubject.next(updatedNodes);
  }

  private generateUniqueId(): string {
    const id = this.idCounter.toString();
    this.idCounter++;
    return id;
  }

  // Recursively find a node by its ID in the node structure
  private findNodeById(nodes: NodeModel[], id: string): NodeModel | undefined {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const foundNode = this.findNodeById(node.children, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return undefined;
  }

  // Recursively remove a node from the node structure
  private removeNodeRecursive(nodes: NodeModel[], id: string): NodeModel[] {
    return nodes.filter(node => {
      if (node.id === id) {
        return false;
      }
      if (node.children) {
        node.children = this.removeNodeRecursive(node.children, id);
        return true;
      }
      return true;
    });
  }
}
