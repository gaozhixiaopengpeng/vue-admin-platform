/*
 * @Author: zhipeng
 * @Date: 2020-09-18 15:16:25
 * @LastEditTime: 2020-09-18 15:42:04
 * @LastEditors: Please set LastEditors
 * @Description: Valid Permission
 * @FilePath: /vue-admin-platform/src/components/Permission/permission.js
 */
import store from '@/store'

export default {
  inserted (el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }
  }
}
