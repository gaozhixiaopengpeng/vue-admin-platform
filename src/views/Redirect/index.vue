<!--
 * @Author: zhipeng
 * @Date: 2020-08-17 10:25:23
 * @LastEditTime: 2020-08-17 21:12:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/views/Redirect/index.vue
-->
<script>
export default {
  beforeCreate () {
    console.log('before redirect===========')
    const { params, query } = this.$route
    console.log(this.$route)
    const { path } = params
    console.log(path)
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
