<!--
 * @Author: zhipeng
 * @Date: 2020-08-09 20:14:08
 * @LastEditTime: 2020-08-20 21:06:39
 * @LastEditors: Please set LastEditors
 * @Description: change size setting
 * @FilePath: /vue-admin-platform/src/components/SizeSelect/index.vue
-->
<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value"
      >{{ item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data () {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size () {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize (size) {
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message({
        message: '布局设置成功',
        type: 'success'
      })
      window.location.reload()
    },
    refreshView () {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }
}
</script>

<style scoped>
.size-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -4px!important;
}
</style>
