import { Component, Input } from '@angular/core';
import { NodeType } from '../../node-type';
import { NodeService } from '../node.service';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.css']
})
export class NewNodeComponent {
  @Input() nodeModel: NodeModel;
  @Input() type: NodeType;
  name = '';

  constructor(private nodeService: NodeService) {}

  public createItem(): void {
    if (!this.name) {
      this.cancelItem();
      return;
    }

    this.nodeModel.name = this.name;
    this.nodeModel.type = this.type;
    this.nodeService.updateNode(this.nodeModel);
  }

  public cancelItem(): void {
    this.nodeService.removeNode(this.nodeModel.id);
  }

  public setType(type: NodeType): void {
    this.type = type;
  }
}
