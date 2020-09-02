/*
 * @Author: zhipeng
 * @Date: 2020-08-11 17:33:18
 * @LastEditTime: 2020-08-31 21:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/store/modules/api.js
 */
const baseUrl = process.env.VUE_APP_BASE_API

const api = {
  // baseUrl，
  baseApi: baseUrl,
  // 修改头像
  updateAvatarApi: baseUrl + '/api/users/updateAvatar'
}

export default api
