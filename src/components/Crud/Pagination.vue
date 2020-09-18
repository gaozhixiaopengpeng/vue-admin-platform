<!--
 * @Author: zhipeng
 * @Date: 2020-09-12 15:16:00
 * @LastEditTime: 2020-09-16 21:46:29
 * @LastEditors: Please set LastEditors
 * @Description: Crud: Pagination
 * @FilePath: /vue-admin-platform/src/components/Crud/Pagination.vue
-->
<template>
  <el-pagination
    :page-size.sync="page.size"
    :total="page.total"
    :current-page.sync="page.page"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
  />
</template>
<script>
import { pagination } from '@crud/crud'
export default {
  mixins: [pagination()]
}
</script>
