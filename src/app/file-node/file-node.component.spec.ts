import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNodeComponent } from './file-node.component';
import {NodeService} from "../node.service";
import {NodeModel} from "../models/node.model";

describe('FileNodeComponent', () => {
  let component: FileNodeComponent;
  let fixture: ComponentFixture<FileNodeComponent>;
  let nodeService: NodeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileNodeComponent],
      providers: [NodeService]
    }).compileComponents();
    fixture = TestBed.createComponent(FileNodeComponent);
    component = fixture.componentInstance;
    nodeService = TestBed.inject(NodeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeNode method of NodeService with the correct node ID', () => {
    const node: NodeModel = { id: '1', name: 'Test Node', type: 'file' };
    component.node = node;

    spyOn(nodeService, 'removeNode');

    component.removeFile();

    expect(nodeService.removeNode).toHaveBeenCalledWith(node.id);
  });

  it('should render the correct node name', () => {
    const node: NodeModel = { id: '1', name: 'Test Node', type: 'file' };
    component.node = node;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const nodeName = element.querySelector('div')?.textContent;

    expect(nodeName).toEqual(node.name);
  });
});
