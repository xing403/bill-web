<script setup lang="ts">
const route = useRoute()
const defaultActive = computed(() => route.name)
</script>

<template>
  <el-menu :default-active="defaultActive" index="/admin" router h="100%">
    <el-menu-item index="/admin">
      首页
    </el-menu-item>
    <el-menu-item index="/admin/bill">
      账单
    </el-menu-item>
    <el-sub-menu index="/admin/user">
      <template #title>
        用户管理
      </template>
      <el-menu-item index="/admin/user/list">
        用户列表
      </el-menu-item>
      <el-menu-item index="/admin/user/login">
        登录用户
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
