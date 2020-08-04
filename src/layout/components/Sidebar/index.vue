<!--
 * @Author: your name
 * @Date: 2020-06-26 16:00:20
 * @LastEditTime: 2020-07-31 14:20:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/layout/components/Sidebar/index.vue
-->
<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="$store.state.settings.uniqueOpened"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import variables from '@/assets/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    variables () {
      return variables
    },
    // 当前激活菜单的index
    activeMenu () {
      const router = this.$route
      const { meta, path } = router
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="">
</style>
