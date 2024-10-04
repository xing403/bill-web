<script setup lang="ts" generic="T extends any, O extends any">
import { ElMessage, dayjs } from 'element-plus';
import billApi from '~/api/modules/bill'

const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0)
const list = ref([])
const showAddBill = ref(false)
const loading = ref(false)
const handleGetBillList = () => {
  if (loading.value) return
  loading.value = true
  billApi.getBillList({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }).then(({ data }) => {
    list.value = data.data
    console.log(data)
    total.value = data.total
  }).finally(() => loading.value = false)
}
const handleDeleteBill = (billId: number) => {
  billApi.deleteBill(billId).then(() => {
    ElMessage.success('删除成功')
    handleGetBillList()
  })
}

onMounted(() => {
  handleGetBillList()
})
</script>

<template>
  <div>
    <div flex justify-between mb-4>
      <div>
        <el-button type="primary" round @click="showAddBill = !showAddBill">新增账单</el-button>
      </div>
      <div>
        <el-button round @click="handleGetBillList">刷新列表</el-button>
      </div>
    </div>
    <AddBill v-model="showAddBill" :on-close="handleGetBillList" />
    <el-table :load="loading" :data="list" border stripe width="100%" row-key="billId">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="80" label="编号" align="center" />
      <el-table-column label="标题" prop="billTitle" />
      <el-table-column label="金额" prop="billAmount" width="120" align="center" />
      <el-table-column label="类型" prop="billType" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.billType === 'spend'" type="warning">支出</el-tag>
          <el-tag v-else-if="row.billType === 'income'" type="warning">收入</el-tag>
          <el-tag v-else type="info">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" align="center"
        :formatter="(row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="warning" text link>编辑</el-button>
          <el-popconfirm title="确定删除吗" @confirm="handleDeleteBill(row.billId)">
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
        @current-change="handleGetBillList" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
