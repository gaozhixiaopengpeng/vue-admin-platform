<!--
 * @Author: your name
 * @Date: 2020-09-23 17:30:43
 * @LastEditTime: 2020-09-23 19:22:29
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
          style="width: 200px;"
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
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table
            ref="table"
            v-loading="crud.loading"
            highlight-current-row
            style="width: 100%;"
            :data="crud.data"
            @selection-change="crud.selectionChangeHandler"
            @current-change="handleCurrentChange"
          >
            <el-table-column type="selection" :selectable="selectedLevel"></el-table-column>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="dataScope" label="数据权限" />
            <el-table-column prop="level" label="角色级别" />
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
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
              v-permission="['admin','roles:edit','roles:del']"
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

const defaultForm = {}

export default {
  name: 'Role',
  data () {
    return {
      level: 3,
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
    selectedLevel () {},
    // 触发单选
    handleCurrentChange () {}
  }
}
</script>
