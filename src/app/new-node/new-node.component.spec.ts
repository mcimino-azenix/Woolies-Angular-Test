import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNodeComponent } from './new-node.component';
import {NodeService} from "../node.service";
import {NodeModel} from "../models/node.model";

describe('NewNodeComponent', () => {
  let component: NewNodeComponent;
  let fixture: ComponentFixture<NewNodeComponent>;
  let nodeService: NodeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewNodeComponent],
      providers: [NodeService]
    }).compileComponents();
    fixture = TestBed.createComponent(NewNodeComponent);
    component = fixture.componentInstance;
    nodeService = TestBed.inject(NodeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the node model and call updateNode method of NodeService', () => {
    const nodeModel: NodeModel = { id: '1', name: '', type: 'folder' };
    component.nodeModel = nodeModel;
    component.type = 'folder';
    component.name = 'New Folder';

    spyOn(nodeService, 'updateNode');

    component.createItem();

    expect(component.nodeModel.name).toBe(component.name);
    expect(component.nodeModel.type).toBe(component.type);
    expect(nodeService.updateNode).toHaveBeenCalledWith(component.nodeModel);
  });

  it('should not update the node model and call removeNode method of NodeService if name is empty', () => {
    const nodeModel: NodeModel = { id: '1', name: '', type: 'folder'};
    component.nodeModel = nodeModel;
    component.type = 'folder';
    component.name = '';

    spyOn(nodeService, 'removeNode');

    component.createItem();

    expect(component.nodeModel.name).toBe('');
    expect(component.nodeModel.type).toBe('folder');
    expect(nodeService.removeNode).toHaveBeenCalledWith(component.nodeModel.id);
  });

  it('should call removeNode method of NodeService with the correct node ID', () => {
    const nodeModel: NodeModel = { id: '1', name: 'Test Node', type: 'folder' };
    component.nodeModel = nodeModel;

    spyOn(nodeService, 'removeNode');

    component.cancelItem();

    expect(nodeService.removeNode).toHaveBeenCalledWith(nodeModel.id);
  });

});
