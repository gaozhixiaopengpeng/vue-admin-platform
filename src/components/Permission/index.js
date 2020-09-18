/*
 * @Author: zhipeng
 * @Date: 2020-09-18 15:16:40
 * @LastEditTime: 2020-09-18 15:38:28
 * @LastEditors: Please set LastEditors
 * @Description: Direact: v-permission
 * @FilePath: /vue-admin-platform/src/components/Permission/index.js
 */
import permission from './permission'

const install = function (Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
