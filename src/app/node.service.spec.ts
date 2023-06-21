import { NodeService } from './node.service';
import { NodeModel } from './models/node.model';

describe('NodeService', () => {
  let nodeService: NodeService;

  beforeEach(() => {
    nodeService = new NodeService();
  });

  it('should add a new node to the root', () => {
    const node: NodeModel = { id: '1', name: 'Test Node', type: 'folder' };
    nodeService.addNode(node);

    nodeService.nodes.subscribe((nodes) => {
      expect(nodes.length).toBe(1);
      expect(nodes[0]).toEqual(node);
    });
  });

  it('should add a new node to a parent node', () => {
    const parentNode: NodeModel = { id: '1', name: 'Parent Node', type: 'folder' };
    const childNode: NodeModel = { id: '2', name: 'Child Node', type: 'folder' };

    nodeService.addNode(parentNode);
    nodeService.addNode(childNode, parentNode.id);

    nodeService.nodes.subscribe((nodes) => {
      expect(nodes.length).toBe(1);
      expect(nodes[0]).toEqual(parentNode);
      expect(nodes[0].children).toBeDefined();
      expect(nodes[0].children?.length).toBe(1);
      expect(nodes[0].children?.[0]).toEqual(childNode);
    });
  });

  it('should update an existing node', () => {
    const node: NodeModel = { id: '1', name: 'Test Node', type: 'folder' };

    nodeService.addNode(node);

    const updatedNode: NodeModel = {
      id: '1',
      name: 'Updated Node',
      type: 'file',
      children: [],
    };

    nodeService.updateNode(updatedNode);

    nodeService.nodes.subscribe((nodes) => {
      expect(nodes.length).toBe(1);
      expect(nodes[0]).toEqual(updatedNode);
    });
  });

  it('should remove an existing node', () => {
    const node: NodeModel = { id: '1', name: 'Test Node', type: 'folder' };

    nodeService.addNode(node);

    nodeService.removeNode(node.id);

    nodeService.nodes.subscribe((nodes) => {
      expect(nodes.length).toBe(0);
    });
  });

  it('should remove a nested node', () => {
    const parentNode: NodeModel = { id: '1', name: 'Parent Node', type: 'folder' };
    const childNode: NodeModel = { id: '2', name: 'Child Node', type: 'folder' };
    const nestedNode: NodeModel = { id: '3', name: 'Nested Node', type: 'folder' };

    nodeService.addNode(parentNode);
    nodeService.addNode(childNode, parentNode.id);
    nodeService.addNode(nestedNode, childNode.id);

    nodeService.removeNode(childNode.id);

    nodeService.nodes.subscribe((nodes) => {
      expect(nodes.length).toBe(1);
      expect(nodes[0]).toEqual(parentNode);
      expect(nodes[0].children).toEqual([]);
    });
  });
});
