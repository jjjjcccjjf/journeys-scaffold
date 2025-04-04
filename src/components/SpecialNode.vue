<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle, useVueFlow } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";

const props = defineProps<NodeProps>();

// Access the full node (with computedPosition)
const node = computed(() => findNode(props.id));
const { findNode } = useVueFlow()

const x = computed(() => `${Math.round(props.position.x)}px`);
const y = computed(() => `${Math.round(props.position.y)}px`);
</script>

<template>
  <div class="vue-flow__node-default">
    <div>{{ data.label }}</div>

    <div>{{ x }} {{ y }}</div>

    <div>{{ node?.computedPosition.x }} {{ node?.computedPosition.y }}</div>

    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
