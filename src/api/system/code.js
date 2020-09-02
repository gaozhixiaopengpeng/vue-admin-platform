/*
 * @Author: zhipeng
 * @Date: 2020-09-02 21:56:18
 * @LastEditTime: 2020-09-02 21:59:47
 * @LastEditors: Please set LastEditors
 * @Description: Send Email
 * @FilePath: /vue-admin-platform/src/api/system/code.js
 */
import request from '@/utils/request'

export function resetEmail (data) {
  return request({
    url: 'api/code/resetEmail?email=' + data,
    method: 'post'
  })
}

export function updatePass (pass) {
  return request({
    url: 'api/users/updatePass/' + pass,
    method: 'get'
  })
}
