<!--
 * @Author: zhipeng
 * @Date: 2020-06-26 17:32:31
 * @LastEditTime: 2020-07-02 22:10:35
 * @LastEditors: Please set LastEditors
 * @Description: Sidebar Item
 * @FilePath: /vue-admin-platform/src/layout/components/Sidebar/SidebarItem.vue
-->
<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      &&!item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          ></item>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './Link'
import { isExternal } from '@/utils/validate'
import path from 'path'
import Item from './Item'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { AppLink, Item },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }, // end hasOneShowingChil
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }

      if (isExternal(this.basePath)) {
        return this.basePath
      }

      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
