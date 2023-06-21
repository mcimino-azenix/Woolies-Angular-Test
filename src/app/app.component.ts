import { Component, OnDestroy, OnInit } from '@angular/core';
import { NodeModel } from './models/node.model';
import { Subscription } from 'rxjs';
import { NodeService } from './node.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public nodeModels: NodeModel[] = [];

  constructor(private nodeService: NodeService) {}

  public addFolderToRoot(): void {
    const node = new NodeModel();
    this.nodeService.addNode(node);
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.nodeService.nodes.subscribe(nodes => {
        this.nodeModels = nodes;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
