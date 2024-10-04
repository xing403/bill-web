<script setup lang="ts">
import RightTool from './RightTool.vue';
import useUserStore from '~/pinia/modules/user';

const userStore = useUserStore()

const handleCommand = (command: string) => {
  console.log(command)
  switch (command) {
    case 'logout':
      userStore.handleUserLogout()
      break;
  }
}
</script>

<template>
  <div class="layout-header" flex justify-between items-center h-full>
    <div></div>
    <div flex items-end gap-2>
      <RightTool />
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar fit="fill">A</el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
