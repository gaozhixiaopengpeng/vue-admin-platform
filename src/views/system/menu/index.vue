<!--
 * @Author: zhipeng
 * @Date: 2020-09-05 17:45:28
 * @LastEditTime: 2020-09-13 17:33:21
 * @LastEditors: Please set LastEditors
 * @Description: Menu Management
 * @FilePath: /vue-admin-platform/src/views/system/menu/index.vue
-->
<template>
  <div class="app-container">
    <!--表单渲染-->
    <el-table
      ref="table"
      row-key="id"
      v-loading="crud.loading"
      lazy
      :data="crud.data"
      :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="title"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="60">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
        </template>
      </el-table-column>
      <el-table-column prop="menuSort" align="center" label="排序">
        <template slot-scope="scope">{{ scope.row.menuSort }}</template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column prop="iframe" label="外链" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.iframe">是</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="可见" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.hidden">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="135px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudMenu from '@/api/system/menu'

// crud交由presenter持有
const defaultForm = {
  id: null,
  title: null,
  menuSort: 999,
  path: null,
  component: null,
  componentName: null,
  iframe: false,
  roles: [],
  pid: 0,
  icon: null,
  cache: false,
  hidden: false,
  type: 0,
  permission: null
}
export default {
  name: 'Menu',
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds () {
    return CRUD({
      title: '菜单',
      url: 'api/menus',
      crudMethod: {...crudMenu}
    })
  },
  methods: {
    getMenus (tree, treeNode, resolve) {
      const params = {pid: tree.id}
      setTimeout(() => {
        crudMenu.getMenus(params)
          .then((res) => {
            resolve(res.content)
          })
          .catch((error) => {
            console.log('Get Menus Error')
            console.log(error)
          })
      }, 200)
    }
  }
}
</script>
