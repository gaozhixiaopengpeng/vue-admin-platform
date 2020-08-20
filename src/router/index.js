/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-08-17 19:53:23
 * @LastEditors: Please set LastEditors
 * @Description: setting vue-router
 * @FilePath: /vue-admin-platform/src/router/index.js
 */
import router from './routers'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { filterAsyncRouter } from '@/store/modules/permission'
import { buildMenus } from '@/api/system/menu'
import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  // set web title
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start() // show progress bar

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo')
          .then(() => {
            // 动态路由，拉取菜单
            loadMenus(next, to)
          })
          .catch((err) => {
            console.log('Get User Info Error')
            console.log(err)
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
      } else if (store.getters.loadMenus) { // 登录时未拉取 菜单，在此处拉取
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {})
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus()
    .then(res => {
      const asyncRouter = filterAsyncRouter(res)
      // 404, 403等配置页
      asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
      store.dispatch('GenerateRoutes', asyncRouter)
        .then(() => {
          router.addRoutes(asyncRouter)
          next({...to, replace: true})
        })
        .catch((error) => {
          console.log('Get Generate Routes Error')
          console.log(error)
        })
    })
    .catch(error => {
      console.log('Get Build Menu Error')
      console.log(error)
    })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
