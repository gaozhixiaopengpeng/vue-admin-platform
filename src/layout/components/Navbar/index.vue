<!--
 * @Author: zhipeng
 * @Date: 2020-08-09 18:20:48
 * @LastEditTime: 2020-08-11 18:16:52
 * @LastEditors: Please set LastEditors
 * @Description: Navbar settings
 * @FilePath: /vue-admin-platform/src/layout/components/Navbar/index.vue
-->
<template>
  <div class="navbar">
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <github class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="全屏缩放" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="布局设置" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="user.avatar ? baseApi + '/avatar/' + user.avatar : Avatar"
            alt
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <a target="_blank" href="#">
            <el-dropdown-item>项目文档</el-dropdown-item>
          </a>
          <span style="display:block;" @click="show=true">
            <el-dropdown-item>布局设置</el-dropdown-item>
          </span>
          <router-link to>
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <span style="display:block;" @click="open">
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Github from '@/components/Github'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Avatar from '@/assets/images/avatar.png'

export default {
  components: {
    Github,
    Screenfull,
    SizeSelect
  },
  data () {
    return {
      Avatar: Avatar
    }
  },
  computed: {
    ...mapGetters(['device', 'user', 'baseApi']),
    show: {
      get () {
        return this.$store.state.settings.showSettings
      },
      set (val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    open () {
      this.$confirm('确定注销并退出系统吗？', '退出登陆', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
