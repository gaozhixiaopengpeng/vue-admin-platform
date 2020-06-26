/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-06-21 14:23:34
 * @LastEditors: Please set LastEditors
 * @Description: setting vue-router
 * @FilePath: /vue-admin-platform/src/router/index.js
 */
import router from './routers'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  // set web title
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start() // show progress bar
  next()
  NProgress.done() // finish progress bar
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
