<!--
 * @Author: zhipeng
 * @Date: 2020-09-12 15:22:19
 * @LastEditTime: 2020-09-16 21:46:41
 * @LastEditors: Please set LastEditors
 * @Description: Curd: Search & Reset
 * @FilePath: /vue-admin-platform/src/components/Crud/RR.operation.vue
-->
<template>
  <span>
    <el-button
      class="filter-item"
      size="mini"
      type="success"
      icon="el-icon-search"
      @click="crud.toQuery"
    >搜索</el-button>
    <el-button
      v-if="crud.optShow.reset"
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-refresh-left"
      @click="crud.resetQuery()"
    >重置</el-button>
  </span>
</template>
<script>
import { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    itemClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
