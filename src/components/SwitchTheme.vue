<script setup lang="ts" name="SwitchTheme">
const dark = useDark()
const toggle = useToggle(dark)
</script>

<template>
  <div>
    <el-switch v-model="dark" @change="toggle" />
  </div>
</template>
