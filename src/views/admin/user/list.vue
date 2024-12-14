<script setup lang="ts">
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import userApi from '~/api/modules/user'

const loading = ref(false)
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0)
const list = ref([])

const addUserDialog = ref(false);
const updateUserDialog = ref(false);
const currentUserId = ref(0);
const handleGetUserList = () => {
  if (loading.value) return
  loading.value = true
  userApi.getUserList({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }).then(({ data }) => {

    list.value = data.data
    total.value = data.total
  }).finally(() => {
    loading.value = false
  })
}
const handleDeleteUser = (userId: number) => {
  userApi.deleteUser(userId).then(() => {
    ElMessage.success('删除成功')
    handleGetUserList()
  })
}
const handleUpdateUser = (userId: number) => {
  currentUserId.value = userId
  updateUserDialog.value = true
}

const confirmEnableOrDisable = () => {
  return ElMessageBox.confirm(
    '确定改变该用户状态吗?',
    '警告',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  )
}
const handleEnableOrDisableUser = async (userId: number, state: string) => {
  const handle = state === '1' ? userApi.disableUserByUserId : userApi.enableUserByUserId;
  handle(userId).then(() => {
    ElMessage.success('操作成功')
  }).catch((error: string) => {
    ElMessage.error(error)
  }).finally(() => {
    handleGetUserList()
  })
}

onMounted(() => {
  handleGetUserList()
})

</script>

<template>
  <div>
    <div flex justify-between mb-4>
      <div>
        <el-button type="primary" round @click="addUserDialog = true">新增用户</el-button>
      </div>
      <div>
        <el-button round @click="handleGetUserList">刷新列表</el-button>
      </div>
    </div>

    <AddUser v-model:open="addUserDialog" :on-close="handleGetUserList" />

    <el-table v-loading="loading" :data="list" border stripe width="100%" row-key="uuid">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="80" label="编号" align="center" />
      <el-table-column label="用户名" prop="username" width="120" align="center" />
      <el-table-column label="昵称" prop="nickname" width="120" align="center" />
      <el-table-column label="用户ID" prop="uuid" align="center" />
      <el-table-column label="身份" prop="isAdmin" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isAdmin == '1'" type="warning">管理员</el-tag>
          <el-tag v-else type="info">用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="locked" width="120" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.locked" style=" --el-switch-off-color: #ff4949" inline-prompt active-text="启用"
            inactive-text="停用" active-value="0" inactive-value="1" :before-change="confirmEnableOrDisable"
            @change="(val: string) => handleEnableOrDisableUser(row.id, val)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" align="center"
        :formatter="(row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="warning" text link @click="handleUpdateUser(row.id)">编辑</el-button>
          <el-popconfirm title="确定删除吗" @confirm="handleDeleteUser(row.id)">
            <template #reference>
              <el-button type="danger" text link>删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="info" text link>详情</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <div flex justify-end mt-4>
      <el-pagination background layout="prev, pager, next" v-model:current-page="pageNum"
        @current-change="handleGetUserList" :total="total" :page-size="pageSize" />
    </div>
    <UpdateUser v-model="currentUserId" v-model:open="updateUserDialog" :on-close="handleGetUserList" />
  </div>
</template>
