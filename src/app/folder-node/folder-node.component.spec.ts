import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderNodeComponent } from './folder-node.component';
import {NodeModel} from "../models/node.model";
import {NodeService} from "../node.service";

describe('FolderNodeComponent', () => {
  let component: FolderNodeComponent;
  let fixture: ComponentFixture<FolderNodeComponent>;
  let nodeService: NodeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FolderNodeComponent],
      providers: [NodeService]
    }).compileComponents();
    fixture = TestBed.createComponent(FolderNodeComponent);
    component = fixture.componentInstance;
    nodeService = TestBed.inject(NodeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNode method of NodeService with the new node and parent node ID', () => {
    const node: NodeModel = { id: '1', name: 'Test Folder', type: 'folder' };
    const parentNode: NodeModel = { id: '2', name: 'Parent Folder', type: 'folder' };
    component.node = parentNode;

    spyOn(nodeService, 'addNode');

    component.addNode();

    expect(nodeService.addNode).toHaveBeenCalledWith(jasmine.any(NodeModel), parentNode.id);
  });

  it('should call removeNode method of NodeService with the correct node ID', () => {
    const node: NodeModel = { id: '1', name: 'Test Folder', type: 'folder' };
    component.node = node;

    spyOn(nodeService, 'removeNode');

    component.removeFolder();

    expect(nodeService.removeNode).toHaveBeenCalledWith(node.id);
  });
});
