/*
 * @Author: zhipeng
 * @Date: 2020-06-27 19:02:41
 * @LastEditTime: 2020-08-11 16:57:19
 * @LastEditors: Please set LastEditors
 * @Description: User store
 * @FilePath: /vue-admin-platform/src/store/modules/user.js
 */
import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    loadMenus: false // 第一次加载菜单时用到
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      console.log('loadMenus====================')
      console.log(loadMenus)
      state.loadMenus = loadMenus
    }
  },
  actions: {
    // 登陆
    Login ({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid)
          .then(res => {
            setToken(res.token, rememberMe)
            commit('SET_TOKEN', res.token)
            setUserInfo(res.user, commit)
            // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
            commit('SET_LOAD_MENUS', true)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res)
}

export default user
