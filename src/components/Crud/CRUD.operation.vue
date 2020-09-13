<!--
 * @Author: zhipeng
 * @Date: 2020-09-12 15:32:11
 * @LastEditTime: 2020-09-13 12:33:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/components/Crud/CRUD.operation.vue
-->
<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button
        v-if="crud.optShow.add"
        v-permission="permission.add"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="crud.toAdd"
      >新增</el-button>
      <el-button
        v-if="crud.optShow.edit"
        v-permission="permission.edit"
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
        :disabled="crud.selections.length !== 1"
        @click="crud.toEdit(crud.selections[0])"
      >修改</el-button>
      <el-button
        v-if="crud.optShow.del"
        slot="reference"
        v-permission="permission.del"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :loading="crud.delAllLoading"
        :disabled="crud.selections.length === 0"
        @click="toDelete(crud.selections)"
      >删除</el-button>
      <el-button
        v-if="crud.optShow.download"
        :loading="crud.downloadLoading"
        :disabled="!crud.data.length"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-download"
        @click="crud.doExport"
      >导出</el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
    <el-button-group class="crud-opts-right">
      <el-button size="mini" plain type="info" icon="el-icon-search" @click="toggleSearch()" />
      <el-button size="mini" icon="el-icon-refresh" @click="crud.refresh()" />
      <el-popover placement="bottom-end" width="150" trigger="click">
        <el-button slot="reference" size="mini" icon="el-icon-s-grid">
          <i class="fa fa-caret-down" aria-hidden="true" />
        </el-button>
        <el-checkbox
          v-model="allColumnsSelected"
          :indeterminate="allColumnsSelectedIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox
          v-for="item in tableColumns"
          :key="item.property"
          v-model="item.visible"
          @change="handleCheckedTableColumnsChange(item)"
        >{{ item.label }}</el-checkbox>
      </el-popover>
    </el-button-group>
  </div>
</template>

<script>
import CRUD, { crud } from './crud'

export default {
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hiddenColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    ignoreColumns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tableColumns: [],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      tableUnwatcher: null,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false
    }
  },
  watch: {
    'crud.props.table' () {
      this.updateTableColumns()
      this.tableColumns.forEach((column) => {
        if (this.hiddenColumns.indexOf(column.property) !== -1) {
          column.visible = false
          this.updateTableColumns(column)
        }
      })
    },
    'crud.props.table.store.states.columns' () {
      this.updateTableColumns()
    }
  },
  created () {
    this.crud.updateProp('searchToggle', true)
  },
  methods: {
    toggleSearch () {
      this.crud.props.searchToggle = !this.crud.props.searchToggle
    },
    handleCheckAllChange (val) {
      if (val === false) {
        this.allColumnsSelected = true
        return
      }
      this.tableColumns.forEach((column) => {
        if (!column.visible) {
          column.visible = true
          this.updateColumnVisible(column)
        }
      })
      this.allColumnsSelected = val
      this.allColumnsSelectedIndeterminate = false
    },
    handleCheckedTableColumnsChange (item) {
      let totalCount = 0
      let selectedCount = 0
      this.tableColumns.forEach((column) => {
        ++totalCount
        selectedCount += column.visible ? 1 : 0
      })
      if (selectedCount === 0) {
        this.crud.notify('请至少选择一列', CRUD.NOTIFICATION_TYPE.WARNING)
        this.$nextTick(function () {
          item.visible = true
        })
        return
      }
      this.allColumnsSelected = selectedCount === totalCount
      this.allColumnsSelectedIndeterminate = selectedCount !== totalCount && selectedCount !== 0
      this.updateColumnVisible(item)
    },
    updateColumnVisible (item) {
      const table = this.crud.props.table
      const vm = table.$children.find(e => e.prop === item.property)
      const columnConfig = vm.columnConfig

      if (item.visible) {
        // 找到合适的插入点
        const columnIndex = this.tableColumns.indexOf(item)
        vm.owner.store.commit('insertColumn', columnConfig, columnIndex + 1, null)
      } else {
        vm.owner.store.commit('removeColumn', columnConfig, null)
      }

      this.ignoreNextTableColumnsChange = true
    }
  }
}
</script>

<style>
.crud-opts {
  padding: 4px 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.crud-opts .crud-opts-right {
  margin-left: auto;
}
</style>
