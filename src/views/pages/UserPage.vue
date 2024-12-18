<script setup lang="ts">
import SwitchTheme from '~/components/SwitchTheme.vue'
import useUserStore from '~/store/modules/useUserStore'

const userStore = useUserStore()
const menu = ref<Array<ListItemType>>([{
  key: 'theme',
  title: '切换主题',
  extend: markRaw(SwitchTheme),
}, {
  key: 'logout',
  title: '退出登录',
}])
function handleClickGroupList(key: string) {
  switch (key) {
    case 'logout':
      userStore.handleUserLogout()
      break
  }
}
</script>

<template>
  <GroupList :list="menu" @click="handleClickGroupList" />
</template>
