<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { CirclePlay } from "lucide-vue-next";
</script>

<template>
  <div
    class="border-[#18E2CE] border-2 bg-[#E8FCFA] rounded-lg p-3 text-xs flex flex-row gap-2 items-center justify-center"
  >
    <CirclePlay color="#119e90" />
    <p class="font-satoshi font-medium leading-[18px]">
      2.5 billion contacts<br />will enter this journey
    </p>

    <Handle type="source" :position="Position.Bottom" :id="'source-bottom'" />
  </div>
</template>
