<!--
 * @Author: zhipeng
 * @Date: 2020-08-30 19:55:59
 * @LastEditTime: 2020-09-02 21:48:29
 * @LastEditors: Please set LastEditors
 * @Description: Zhipeng
 * @FilePath: /vue-admin-platform/src/views/system/user/center.vue
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-row :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center">
              <img
                :src="user.avatar ? baseApi + '/avatar/' + user.avatar : Avatar"
                title="点击上传头像"
                class="avatar"
                @click="toggleShow"
              />
              <my-upload
                v-model="show"
                :headers="headers"
                :url="updateAvatarApi"
                @crop-upload-success="cropUploadSuccess"
                @cropUploadFail="cropUploadFail"
              />
            </div>
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <svg-icon icon-class="login" />登录账号
                  <div class="user-right">{{ user.username }}</div>
                </div>
              </li>
              <li>
                <svg-icon icon-class="user1" />用户昵称
                <div class="user-right">{{ user.nickName }}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" />手机号码
                <div class="user-right">{{ user.phone }}</div>
              </li>
              <li>
                <svg-icon icon-class="email" />用户邮箱
                <div class="user-right">{{ user.email }}</div>
              </li>
              <li>
                <svg-icon icon-class="dept" />所属部门
                <div class="user-right">{{ user.dept }} / {{ user.job }}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" />安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-row>
    </el-row>
    <updateEmail ref="email" :email="user.email" />
    <updatePass ref="pass" />
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import { mapGetters } from 'vuex'
import updatePass from './center/updatePass'
import updateEmail from './center/updateEmail'
import Avatar from '@/assets/images/avatar.png'
import store from '@/store'
import { getToken } from '@/utils/auth'

export default {
  name: 'Center',
  data () {
    return {
      show: false,
      Avatar: Avatar,
      headers: {
        Authorization: getToken()
      }
    }
  },
  components: { updatePass, updateEmail, myUpload },
  computed: {
    ...mapGetters(['user', 'baseApi', 'updateAvatarApi'])
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    cropUploadSuccess (jsonData, field) {
      this.$notify({
        title: '头像修改成功',
        type: 'success',
        duration: 2500
      })
      store.dispatch('GetInfo').then(() => {})
    },
    cropUploadFail (status, field) {
      this.$notify({
        title: status,
        type: 'error',
        duration: 2500
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;

    a {
      color: #317ef3;
    }
  }
}
</style>
