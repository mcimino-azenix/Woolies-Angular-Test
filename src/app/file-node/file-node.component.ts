import { Component, Input } from '@angular/core';
import { NodeModel } from '../models/node.model';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-file-node',
  templateUrl: './file-node.component.html',
  styleUrls: ['./file-node.component.css']
})
export class FileNodeComponent {
  @Input() node: NodeModel;

  constructor(private nodeService: NodeService) {}

  public removeFile(): void {
    this.nodeService.removeNode(this.node.id);
  }
}
