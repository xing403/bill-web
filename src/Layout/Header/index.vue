<script setup lang="ts">
import RightTool from './RightTool.vue';
</script>

<template>
  <div class="layout-header" flex justify-between items-center h-full >
    <div></div>
    <div flex items-end gap-2>
      <RightTool />
      <el-avatar fit="fill">A</el-avatar>
    </div>
  </div>
</template>
