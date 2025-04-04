<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle, useVueFlow } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";

interface ExtendedNodeProps extends NodeProps {
  data: {
    type: "GraphNode" | "Node";
    label: string;
  };
}

const props = defineProps<ExtendedNodeProps>();

// Access the full node (with computedPosition)
const graphNode = computed(() => findNode(props.id));
const { findNode } = useVueFlow();

const x = computed(() => `${Math.round(props.position.x)}px`);
const y = computed(() => `${Math.round(props.position.y)}px`);
</script>

<template>
  <div class="border-[#18E2CE] border-2 bg-[#E8FCFA] rounded-lg p-3 text-xs">
    <!-- Source Handles -->
    <Handle type="source" :position="Position.Top" :id="'source-top'" />
    <Handle type="source" :position="Position.Bottom" :id="'source-bottom'" />
    <Handle type="source" :position="Position.Left" :id="'source-left'" />
    <Handle type="source" :position="Position.Right" :id="'source-right'" />

    <!-- Target Handles -->
    <Handle type="target" :position="Position.Top" :id="'target-top'" />
    <Handle type="target" :position="Position.Bottom" :id="'target-bottom'" />
    <Handle type="target" :position="Position.Left" :id="'target-left'" />
    <Handle type="target" :position="Position.Right" :id="'target-right'" />

    <pre v-if="props.data.type === 'Node'">
      {{ props }}
    </pre>
    <pre v-else-if="props.data.type === 'GraphNode'">
        {{ graphNode }}
    </pre>
  </div>
</template>
