/*
 * @Author: zhipeng
 * @Date: 2020-06-26 15:21:47
 * @LastEditTime: 2020-09-18 14:53:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/store/getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user.user,
  loadMenus: state => state.user.loadMenus,
  language: state => state.app.language,
  size: state => state.app.size,
  baseApi: state => state.api.baseApi,
  updateAvatarApi: state => state.api.updateAvatarApi
}

export default getters
