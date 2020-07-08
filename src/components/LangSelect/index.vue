<!--
 * @Author: zhipeng
 * @Date: 2019-10-25 10:45:41
 * @LastEditTime: 2020-07-08 22:43:08
 * @LastEditors: Please set LastEditors
 * @Description: I18n language menu item
 * @FilePath: /vue-admin-platform/src/components/LangSelect/index.vue
-->
<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        {{ $t('language.zh') }}
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        {{ $t('language.en') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: this.$t('language.switchLanguage'),
        type: 'success'
      })
    }
  }
}
</script>
