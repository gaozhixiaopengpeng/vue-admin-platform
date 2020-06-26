/*
 * @Author: zhipeng
 * @Date: 2020-06-21 12:28:32
 * @LastEditTime: 2020-06-21 15:26:16
 * @LastEditors: Please set LastEditors
 * @Description: mian
 * @FilePath: /vue-admin-platform/src/main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import Element from 'element-ui'
import './assets/icons'// svg-icon

/**
 * css
 */
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
