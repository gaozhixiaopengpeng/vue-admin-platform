/*
 * @Author: zhipeng
 * @Date: 2020-02-20 09:34:22
 * @LastEditTime: 2020-08-29 10:13:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/layout/mixin/ResizeHandler.js
 */
import store from '@/store'
const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route () {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler () {
      // 判断浏览器当前标签页是否激活
      if (!document.hidden) {
        const isMobile = this.$_isMobile()

        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    },
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
  }
}
