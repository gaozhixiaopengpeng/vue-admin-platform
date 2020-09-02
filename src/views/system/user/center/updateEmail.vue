<!--
 * @Author: zhipeng
 * @Date: 2020-09-02 20:50:58
 * @LastEditTime: 2020-09-02 22:27:42
 * @LastEditors: Please set LastEditors
 * @Description: Update Email Address
 * @FilePath: /vue-admin-platform/src/views/system/user/center/updateEmail.vue
-->
<template>
  <div style="display: inline-block;">
    <el-dialog
      :visible.sync="dialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      :title="title"
      append-to-body
      width="475px"
      @close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="on" style="width: 200px;" />
          <el-button
            :loading="codeLoading"
            :disabled="isDisabled"
            size="small"
            @click="sendCode"
          >{{ buttonName }}</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" style="width: 320px;" />
        </el-form-item>
        <el-form-item label="当前密码" prop="pass">
          <el-input v-model="form.pass" type="password" style="width: 320px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { validEmail } from '@/utils/validate'
import { resetEmail } from '@/api/system/code'
import { updateEmail } from '@/api/system/user'

export default {
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data () {
    const validMail = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('新邮箱不能为空'))
      } else if (value === this.email) {
        callback(new Error('新邮箱不能与旧邮箱相同'))
      } else if (validEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    return {
      loading: false,
      dialog: false,
      title: '修改邮箱',
      form: { pass: '', email: '', code: '' },
      codeLoading: false,
      isDisabled: false,
      buttonName: '获取验证码',
      time: 60,
      rules: {
        pass: [
          { required: true, message: '当前密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validMail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.resetForm()
    },
    resetForm () {
      this.loading = false
      this.dialog = false
      this.$refs['form'].resetFields()
    },
    sendCode () {
      if (this.form.email && this.email !== this.form.email) {
        this.codeLoading = true
        this.buttonName = '验证码发送中'

        resetEmail()
          .then(res => {
            this.$message({
              showClose: true,
              message: '发送成功，验证码有效期5分钟',
              type: 'success'
            })
            this.codeLoading = true
            this.isDisabled = true

            clearInterval(this.timer)
            this.timer = setInterval(() => {
              this.buttonName = this.time + '秒后重新发送'
              --this.time
              if (this.time < 0) {
                this.time = 60
                this.buttonName = '重新发送'
                this.isDisabled = false
                clearInterval(this.time)
              }
            }, 1000)
          })
          .catch(error => {
            this.codeLoading = false
            this.resetForm()
            console.log('Send Email Error')
            console.log(error)
          })
      }
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          updateEmail(this.form).then(res => {
            this.loading = false
            this.resetForm()
            this.$notify({
              title: '邮箱修改成功',
              type: 'success',
              duration: 1500
            })
            store.dispatch('GetInfo').then(() => {})
          }).catch(error => {
            this.loading = false
            console.log('Update User Email Error')
            console.log(error)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
