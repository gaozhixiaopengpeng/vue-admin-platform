<!--
 * @Author: zhipeng
 * @Date: 2020-08-04 18:01:12
 * @LastEditTime: 2020-08-09 18:08:58
 * @LastEditors: Please set LastEditors
 * @Description: Layout
 * @FilePath: /vue-admin-platform/src/layout/index.vue
-->
<template>
  <div :class="classObj" class="classObj">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: needTagsView}" class="main-container">
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { mapState } from 'vuex'
import { Sidebar, Settings } from './components/index'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Settings,
    RightPanel
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: state => state.settings.tagsView,
      showSettings: state => state.settings.showSettings
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        mobile: this.device === 'mobile',
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
