<!--
 * @Author: zhipeng
 * @Date: 2020-09-05 17:45:28
 * @LastEditTime: 2020-09-18 17:32:13
 * @LastEditors: Please set LastEditors
 * @Description: Menu Management
 * @FilePath: /vue-admin-platform/src/views/system/menu/index.vue
-->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.blurry" clearable size="small" placeholder="模糊搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery"/>
        <date-range-picker v-model="query.createTime" class="date-item" />
         <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      lazy
      :load="getMenus"
      :data="crud.data"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="title" />
      <el-table-column prop="icon" label="图标" align="center" width="60px">
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
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="cache" label="缓存" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.cache">是</span>
          <span v-else>否</span>
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
      <el-table-column
        v-permission="['admin','menu:edit','menu:del']"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudMenu from '@/api/system/menu'
import udOperation from '@crud/UD.operation'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import DateRangePicker from '@/components/DateRangePicker'

// crud交由presenter持有
const defaultForm = {
  id: null,
  name: null,
  sort: 999,
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
  components: {
    udOperation,
    rrOperation,
    crudOperation,
    DateRangePicker
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data () {
    return {
      menu: [],
      permission: {
        add: ['admin', 'menu:add'],
        edit: ['admin', 'menu:edit'],
        del: ['admin', 'menu:del']
      }
    }
  },
  cruds () {
    return CRUD({
      title: '菜单',
      url: 'api/menus',
      crudMethod: { ...crudMenu }
    })
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU] (crud, form) {
      this.menus = []
      if (form.id != null) {
        if (form.pid === null) {
          form.pid = 0
        }
        this.getSupDepts(form.id)
      } else {
        this.menus.push({ id: 0, label: '顶级类目', children: null })
      }
    },
    getMenus (tree, treeNode, resolve) {
      const params = { pid: tree.id }
      setTimeout(() => {
        crudMenu.getMenus(params).then(res => {
          resolve(res.content)
        })
      }, 100)
    },
    getSupDepts (id) {
      crudMenu.getMenuSuperior(id).then(res => {
        const children = res.map(function (obj) {
          if (!obj.leaf && !obj.children) {
            obj.children = null
          }
          return obj
        })
        this.menus = [{ id: 0, label: '顶级类目', children: children }]
      })
    },
    // 选中图标
    selected (name) {
      this.form.icon = name
    }
  }
}
</script>
