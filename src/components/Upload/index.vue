<!--
 * @Author: zhipeng
 * @Date: 2020-09-01 20:36:33
 * @LastEditTime: 2020-09-01 20:51:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/components/Upload/index.vue
-->
<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="https://httpbin.org/post"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleImageSuccess (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="">
</style>
