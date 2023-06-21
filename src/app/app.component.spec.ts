import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NodeModel } from './models/node.model';
import { NodeService } from './node.service';
import {Observable, of, Subscription} from "rxjs";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let nodeService: NodeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [NodeService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nodeService = TestBed.inject(NodeService);
  });

  it('should call addNode method of NodeService', () => {
    spyOn(nodeService, 'addNode');

    component.addFolderToRoot();

    expect(nodeService.addNode).toHaveBeenCalled();
  });

  it('should set nodeModels property with the value from NodeService nodes observable on ngOnInit', () => {
    const nodes: NodeModel[] = [{ id: '1', name: 'Test Node', type: 'folder' }];
    const nodesObservable: Observable<NodeModel[]> = of(nodes);

    Object.defineProperty(nodeService, 'nodes', { value: nodesObservable });

    component.ngOnInit();

    expect(component.nodeModels).toEqual(nodes);
  });
});
