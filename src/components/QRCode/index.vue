<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{
  qrcode: string,
  status: string
}>()

const emits = defineEmits(['reload'])

const qrcode = ref({
  img: ref()
})
watch(() => props.qrcode, (val) => {
  qrcode.value.img = useQRCode(val)
}, {
  deep: true,
  immediate: true
})

</script>

<template>
  <div flex="~ row" justify-center>
    <el-image v-if="props.status === 'WAITING'" v-model:src="qrcode.img" fit="fill" w-350px h-350px m-auto />
    <el-result v-else-if="props.status === 'SCANNED'" icon="info" title="已扫描" sub-title="请确认登录" />
    <el-result v-else-if="props.status === 'CANCELED'" icon="warning" title="登录失败" sub-title="已取消登录">
      <template #extra>
        <el-button type="primary" @click="emits('reload')">重新获取</el-button>
      </template>
    </el-result>
    <el-result v-else-if="props.status === 'SUCCESS'" icon="success" title="登录成功" sub-title="处理中请稍后..." />
    <el-result v-else icon="error" title="登录失败" sub-title="二维码过期">
      <template #extra>
        <el-button type="primary" @click="$emit('reload')">重新获取</el-button>
      </template>
    </el-result>
  </div>
</template>
