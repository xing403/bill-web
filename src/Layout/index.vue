<script setup lang="ts">
import SideBar from './SideBar/index.vue'
import Header from './Header/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header b-b="1px light:hex-DCDFE4 dark:hex-4C4D4E">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideBar />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
