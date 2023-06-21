import { Component, Input } from '@angular/core';
import { NodeModel } from '../models/node.model';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-folder-node',
  templateUrl: './folder-node.component.html',
  styleUrls: ['./folder-node.component.css']
})
export class FolderNodeComponent {
  @Input() node: NodeModel;

  constructor(private nodeService: NodeService) {}

  public addNode(): void {
    const newNode = new NodeModel();
    this.nodeService.addNode(newNode, this.node.id);
  }

  public removeFolder(): void {
    this.nodeService.removeNode(this.node.id);
  }
}
