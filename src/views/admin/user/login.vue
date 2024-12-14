<script setup lang="ts">
import { dayjs } from 'element-plus'
import userApi from '~/api/modules/user'
import { sendPrivateMessage } from '~/api/modules/message'

const loading = ref(false)
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0)
const list = ref([])
const handleGetAllLoginUser = () => {
  if (loading.value) return
  loading.value = true
  userApi.getAllLoginUser().then(({ data }) => {

    list.value = data.data
    total.value = data.total
  }).finally(() => {
    loading.value = false
  })
}

const handleUserOffline = (row: any) => {
  sendPrivateMessage({
    to: row.username,
    message: JSON.stringify({
      eventName: "user.event.offline",
      message: ''
    }),
    topic: '/topic/private'
  }).then(() => {
    handleGetAllLoginUser()
  })
}

onMounted(() => {
  handleGetAllLoginUser()
})

</script>

<template>
  <div>
    <el-table v-loading="loading" :data="list" border stripe width="100%" row-key="billId">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="80" label="编号" align="center" />
      <el-table-column label="用户ID" prop="uuid" width="300" align="center" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="类型" prop="billType" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.billType === 'spend'" type="warning">支出</el-tag>
          <el-tag v-else-if="row.billType === 'income'" type="warning">收入</el-tag>
          <el-tag v-else type="info">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上次登录时间" prop="loginTime" width="180" align="center"
        :formatter="(row: any) => dayjs(row.loginTime).format('YYYY-MM-DD HH:mm:ss')" />
      <el-table-column label="创建时间" prop="createTime" width="180" align="center"
        :formatter="(row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="warning" text link @click="handleUserOffline(row)">强制下线</el-button>
          <el-button type="info" text link>详情</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <div flex justify-end mt-4>
      <el-pagination background layout="prev, pager, next" v-model:current-page="pageNum"
        @current-change="handleGetAllLoginUser" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
