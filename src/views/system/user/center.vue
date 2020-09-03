<!--
 * @Author: zhipeng
 * @Date: 2020-08-30 19:55:59
 * @LastEditTime: 2020-09-03 21:46:19
 * @LastEditors: Please set LastEditors
 * @Description: Zhipeng
 * @FilePath: /vue-admin-platform/src/views/system/user/center.vue
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
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
      </el-col>
      <!-- 用户资料 & 操作日志 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 用户资料 -->
            <el-tab-pane label="用户资料" name="first">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                style="margin-top: 10px;"
                size="small"
                label-width="65px"
              >
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" style="width: 35%" />
                  <span style="color: #C0C0C0;margin-left: 10px;">用户昵称不作为登录使用</span>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" style="width: 35%;" />
                  <span style="color: #C0C0C0;margin-left: 10px;">手机号码不能重复</span>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.gender" style="width: 178px">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label>
                  <el-button
                    :loading="saveLoading"
                    size="mini"
                    type="primary"
                    @click="doSubmit"
                  >保存配置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--    操作日志    -->
            <el-tab-pane label="操作日志" name="second"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
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
import { isvalidPhone } from '@/utils/validate'
import { editUser } from '@/api/system/user'

export default {
  name: 'Center',
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      Avatar: Avatar,
      headers: {
        Authorization: getToken()
      },
      activeName: 'first',
      form: {},
      rules: {
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      },
      saveLoading: false
    }
  },
  components: { updatePass, updateEmail, myUpload },
  computed: {
    ...mapGetters(['user', 'baseApi', 'updateAvatarApi'])
  },
  created () {
    this.form = {
      id: this.user.id,
      nickName: this.user.nickName,
      gender: this.user.sex,
      phone: this.user.phone
    }
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
    },
    handleClick () {

    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.saveLoading = true

          editUser(this.form)
            .then(res => {
              this.saveLoading = false
              this.$notify({
                title: '编辑成功',
                type: 'success',
                duration: 1500
              })
              store.dispatch('GetInfo').then(() => {})
            })
            .catch(error => {
              this.saveLoading = false
              console.log('Update User Information Error')
              console.log(error)
            })
        }
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
