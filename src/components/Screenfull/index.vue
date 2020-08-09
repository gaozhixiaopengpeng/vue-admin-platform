<!--
 * @Author: zhipeng
 * @Date: 2020-08-09 18:49:13
 * @LastEditTime: 2020-08-09 20:10:36
 * @LastEditors: Please set LastEditors
 * @Description: screen full
 * @FilePath: /vue-admin-platform/src/components/Screenfull/index.vue
-->
<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    // API: enabled => isEnabled
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen // Returns a boolean whether fullscreen is active.
    },
    destroy () {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
    click () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }

      screenfull.toggle()
    }
  }
}
</script>
