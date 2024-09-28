<script setup lang="ts">
const route = useRoute()
const defaultActive = computed(() => route.name)

</script>

<template>
  <el-menu :default-active="defaultActive" router h="100%">
    <el-menu-item index="home">首页</el-menu-item>
    <el-menu-item index="bill">账单</el-menu-item>
  </el-menu>
</template>
