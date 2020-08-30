<!--
 * @Author: zhipeng
 * @Date: 2020-08-17 10:25:23
 * @LastEditTime: 2020-08-29 16:38:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/views/Redirect/index.vue
-->
<script>
export default {
  beforeCreate () {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
