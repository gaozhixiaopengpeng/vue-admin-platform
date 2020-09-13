<!--
 * @Author: zhipeng
 * @Date: 2020-09-12 15:16:00
 * @LastEditTime: 2020-09-12 15:20:24
 * @LastEditors: Please set LastEditors
 * @Description: Crud: Pagination
 * @FilePath: /vue-admin-platform/src/components/Crud/Pagination.vue
-->
<template>
  <el-pagination
    :page-size="page.size"
    :total="page.total"
    :current-page="page.page"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
  ></el-pagination>
</template>

<script>
import { pagination } from './crud'

export default {
  mixins: [pagination]
}
</script>
