<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <main text="gray-700 dark:gray-200" h-full font-sans>
      <RouterView />
    </main>
  </el-config-provider>
</template>
