/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-09-18 15:40:27
 * @LastEditors: Please set LastEditors
 * @Description: main file
 * @FilePath: /vue-admin-platform/src/main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routers'
import store from './store'
import Cookies from 'js-cookie'

// i18n
import i18n from './lang'
import Element from 'element-ui'
import './assets/icons'// svg-icon
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

/**
 * css
 */
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

// permission control
import './router/index'

// 权限指令
import permission from './components/Permission'

Vue.config.productionTip = false

Vue.use(i18n)
Vue.use(Element, {
  size: Cookies.get('size' || 'small') // set element-ui default size
})
Vue.use(permission)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
