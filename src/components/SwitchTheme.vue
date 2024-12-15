<script setup lang="ts" name="SwitchTheme">
const dark = useDark()
const toggle = useToggle(dark)
function handleChangeDark() {
  toggle()
}
</script>

<template>
  <div>
    <el-switch v-model="dark" @change="handleChangeDark" />
  </div>
</template>
