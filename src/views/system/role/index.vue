<!--
 * @Author: your name
 * @Date: 2020-09-23 17:30:43
 * @LastEditTime: 2020-11-08 22:07:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/views/system/role/index.vue
-->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.blurry"
          size="small"
          clearable
          placeholder="输入名称或者描述搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col
        :xs="24"
        :sm="24"
        :md="16"
        :lg="16"
        :xl="17"
        style="margin-bottom: 10px"
      >
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table
            ref="table"
            v-loading="crud.loading"
            highlight-current-row
            style="width: 100%"
            :data="crud.data"
            @selection-change="crud.selectionChangeHandler"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              type="selection"
              :selectable="selectedLevel"
            ></el-table-column>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="dataScope" label="数据权限" />
            <el-table-column prop="level" label="角色级别" />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="description"
              label="描述"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              width="135px"
              prop="createTime"
              label="创建日期"
            >
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-permission="['admin', 'roles:edit', 'roles:del']"
              label="操作"
              width="130px"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <udOperation
                  v-if="scope.row.level >= level"
                  :data="scope.row"
                  :permission="permission"
                />
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip
              class="item"
              effect="dark"
              content="选择指定角色分配菜单"
              placement="top"
            >
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              v-permission="['admin', 'roles:edit']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
              >保存</el-button
            >
          </div>
          <el-tree
            ref="menu"
            lazy
            :data="menus"
            :default-checked-keys="menuIds"
            :load="getMenuDatas"
            :props="defaultProps"
            check-strictly
            accordion
            show-checkbox
            node-key="id"
            @check="menuChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudRoles from '@/api/system/role'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import { getMenusTree, getChild } from '@/api/system/menu'

const defaultForm = {}

export default {
  name: 'Role',
  data () {
    return {
      // 懒加载
      defaultProps: { children: 'children', label: 'label', isLeaf: 'leaf' },
      level: 3,
      menuLoading: false,
      showButton: false,
      menus: [],
      menuIds: [],
      permission: {
        add: ['admin', 'roles:add'],
        edit: ['admin', 'roles:edit'],
        del: ['admin', 'roles:del']
      }
    }
  },
  components: {
    pagination,
    DateRangePicker,
    rrOperation,
    crudOperation,
    udOperation
  },
  cruds () {
    return CRUD({
      title: '角色',
      url: 'api/roles',
      sort: 'level,asc',
      crudMethod: { ...crudRoles }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  created () {
    crudRoles
      .getLevel()
      .then((data) => {
        this.level = data.level
      })
      .catch((error) => {
        console.log('Get Role Level Error')
        console.log(error)
      })
  },
  methods: {
    getMenuDatas (node, resolve) {
      setTimeout(() => {
        getMenusTree(node.data.id ? node.data.id : 0)
          .then((res) => {
            resolve(res)
          })
          .catch()
      }, 100)
    },
    [CRUD.HOOK.afterRefresh] () {
      this.$refs.menu.setCheckedKeys([])
    },
    /**
     * 是否可以被勾选 仅对type=selection 的列有效，类型为 Function
     */
    selectedLevel (row) {
      return row.level >= this.level
    },
    /**
     * 触发单选
     */
    handleCurrentChange (val) {
      if (val) {
        const _this = this
        // 清空菜单的选中
        this.$refs.menu.setCheckedKeys([])
        // 保存当前的角色id
        this.currentId = val.id
        // 初始化默认选中的key
        this.menuIds = []
        val.menus.forEach(function (data) {
          _this.menuIds.push(data.id)
        })
        this.showButton = true
      }
    },
    menuChange (menu) {
      // 获取该节点的所有子节点， id 包含自身
      getChild(menu.id)
        .then((childIds) => {
          // 判断是否在 menuIds 中，如果存在则删除，否则添加
          if (this.menuIds.indexOf(childIds) !== -1) {
            for (let i = 0; i < childIds.length; i++) {
              const index = this.menuIds.indexOf(childIds[i])
              if (index !== -1) {
                this.menuIds.splice(index, 1)
              }
            }
          } else {
            for (let i = 0; i < childIds.length; i++) {
              this.menuIds.push(childIds[i])
            }
          }
          this.$refs.menu.setCheckedKeys(this.menuIds)
        })
        .catch((error) => {
          console.log('Get Menu Childs Error')
          console.log(error)
        })
    },
    saveMenu () {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.role-span {
  font-weight: bold;
  color: #303133;
  font-size: 15px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
::v-deep .vue-treeselect__multi-value {
  margin-bottom: 0;
}
::v-deep .vue-treeselect__multi-value-item {
  border: 0;
  padding: 0;
}
</style>
