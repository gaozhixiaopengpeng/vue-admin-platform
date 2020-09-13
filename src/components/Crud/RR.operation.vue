<!--
 * @Author: zhipeng
 * @Date: 2020-09-12 15:22:19
 * @LastEditTime: 2020-09-12 15:28:25
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
    ></el-button>
    <el-button
      v-if="crud.optShow.reset"
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-refresh-left"
      @click="crud.resetQuery()"
    ></el-button>
  </span>
</template>

<script>
import { crud } from './crud'

export default {
  mixins: [crud],
  props: {
    itemClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
