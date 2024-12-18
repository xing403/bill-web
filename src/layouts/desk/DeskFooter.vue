<script setup lang="ts">
import { List, UserFilled } from '@element-plus/icons-vue'

defineProps<{
  fill: boolean
}>()
const { width } = useWindowSize()
const route = useRoute()
const router = useRouter()
const segmented = ref(route.name?.toString() ?? 'desk-home')
const segmentedOptions = ref([{
  label: '账单',
  value: 'desk-home',
  icon: markRaw(List),
}, {
  label: '我的',
  value: 'desk-home-my',
  icon: markRaw(UserFilled),
}])

function handleChangeFooter(value: string) {
  router.replace({
    name: value,
    query: {
      ...route.query,
    },
  })
}
</script>

<template>
  <div class="desk-footer" fixed bottom-0 left-0 h-65px w-full :class="{ 'max-w-350px': !fill && width >= 768 }">
    <el-segmented v-model="segmented" :options="segmentedOptions" block @change="handleChangeFooter">
      <template #default="{ item }: any">
        <div flex flex-col items-center gap-2 p-2>
          <el-icon size="20">
            <component :is="item.icon" />
          </el-icon>
          <div>{{ item.label }}</div>
        </div>
      </template>
    </el-segmented>
  </div>
</template>

<style scoped>
.desk-footer .el-segmented {
  --el-segmented-item-selected-color: var(--el-color-primary);
  --el-segmented-item-selected-bg-color: var(--el-color-info-light-9);
}
</style>
