<script setup lang="ts" generic="T extends any, O extends any">
import { dayjs } from 'element-plus';

const list = ref([])

</script>

<template>
  <div>
    <div flex justify-between mb-4>
      <div>
        <el-button type="primary" round @click="">新增账单</el-button>
      </div>
    </div>
    <el-table :data="list" border stripe width="100%">
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
        <template #default>
          <el-button type="warning" text link>编辑</el-button>
          <el-button type="danger" text link>删除</el-button>
          <el-button type="info" text link>详情</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <div flex justify-end mt-4>
      <el-pagination background layout="prev, pager, next" :total="100" :page-size="10" />
    </div>
  </div>
</template>
