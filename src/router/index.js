/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-06-26 14:05:18
 * @LastEditors: Please set LastEditors
 * @Description: Router page
 * @FilePath: /vue-admin-platform/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routers = [
  {
    path: '/login',
    meta: { title: 'Login', noCache: true },
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/dashboard',
    meta: { title: 'Dashboard', noCache: true },
    component: () => import('@/views/Dashboard'),
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
})
