/*
 * @Author: zhipeng
 * @Date: 2020-06-26 18:13:50
 * @LastEditTime: 2020-06-26 18:16:41
 * @LastEditors: Please set LastEditors
 * @Description: Menu Api
 * @FilePath: /vue-admin-platform/src/api/menu.js
 */
import request from '@/utils/request'

export function buildMenus () {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export default {}
