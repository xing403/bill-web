<script setup lang="ts">
const route = useRoute()
const defaultActive = computed(() => route.name)

</script>

<template>
  <el-menu :default-active="defaultActive" router h="100%">
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/bill">账单</el-menu-item>
    <el-sub-menu index="/user">
      <template #title>用户管理</template>
      <el-menu-item index="/user/list">用户列表</el-menu-item>
      <el-menu-item index="/user/login">登录用户</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
