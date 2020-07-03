/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-07-03 21:12:26
 * @LastEditors: Please set LastEditors
 * @Description: Router page
 * @FilePath: /vue-admin-platform/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Sidebar from '@/Sidebar'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: 'Login', noCache: true },
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/',
    component: Sidebar,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
