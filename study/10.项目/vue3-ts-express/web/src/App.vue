<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <el-button type="primary">你好</el-button>
      <el-date-picker placeholder="Pick a day" size="default" type="date" />
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<style></style>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = zhCn
</script>
