import dagre from "@dagrejs/dagre";
import { Position, useVueFlow, type Node, type Edge } from "@vue-flow/core";
import { ref } from "vue";

export function useLayout() {
  const { findNode } = useVueFlow();

  const graph = ref(new dagre.graphlib.Graph());

  const previousDirection = ref<"LR" | "TB" | "RL" | "BT">("LR");

  function layout(
    nodes: Node[],
    edges: Edge[],
    direction: "LR" | "TB" | "RL" | "BT"
  ) {
    const dagreGraph = new dagre.graphlib.Graph();
    graph.value = dagreGraph;

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === "LR" || direction === "RL";
    dagreGraph.setGraph({ rankdir: direction });

    previousDirection.value = direction;

    for (const node of nodes) {
      const graphNode = findNode(node.id);

      if (!graphNode) continue; // Handle case where node is not found

      dagreGraph.setNode(node.id, {
        width: graphNode.dimensions?.width || 150,
        height: graphNode.dimensions?.height || 50,
      });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      if (!nodeWithPosition) return node; // Handle missing node position

      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      };
    });
  }

  return { graph, layout, previousDirection };
}
