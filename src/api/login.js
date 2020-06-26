/*
 * @Author: zhipeng
 * @Date: 2020-06-21 17:38:11
 * @LastEditTime: 2020-06-21 19:02:21
 * @LastEditors: Please set LastEditors
 * @Description: Login Api
 * @FilePath: /vue-admin-platform/src/api/login.js
 */
import request from '@/utils/request'

export function getCodeImg () {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}
