<!--
 * @Author: zhipeng
 * @Date: 2020-08-20 22:05:03
 * @LastEditTime: 2020-08-29 14:30:46
 * @LastEditors: Please set LastEditors
 * @Description: tag view scroll pane
 * @FilePath: /vue-admin-platform/src/components/SizeSelect/ScrollPane.vue
-->
<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default {
  name: 'ScrollPane',
  data () {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper () {
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  mounted () {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, false)
  },
  beforeDestroy () {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  },
  methods: {
    emitScroll () {
      this.$emit('scroll')
    },
    handleScroll (e) {
      // wheelDelta：获取滚轮滚动方向，向上120，向下-120，但为常量，与滚轮速率无关
      // deltaY：垂直滚动幅度，正值向下滚动。电脑鼠标滚轮垂直行数默认值是3
      // wheelDelta只有部分浏览器支持，deltaY几乎所有浏览器都支持
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      // 0到scrollLeft为滚动区域隐藏部分
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    moveToTarget (currentTag) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$parent.$refs.tag

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
