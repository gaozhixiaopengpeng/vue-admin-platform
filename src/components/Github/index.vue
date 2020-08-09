<!--
 * @Author: zhipeng
 * @Date: 2020-08-09 18:38:18
 * @LastEditTime: 2020-08-09 18:44:51
 * @LastEditors: Please set LastEditors
 * @Description: to github
 * @FilePath: /vue-admin-platform/src/components/Github/index.vue
-->
<template>
  <div>
    <svg-icon icon-class="github" @click="click" />
  </div>
</template>

<script>
export default {
  name: 'Github',
  methods: {
    click () {
      window.open(
        'https://github.com/gaozhixiaopengpeng/vue-admin-platform',
        '_blank'
      )
    }
  }
}
</script>
