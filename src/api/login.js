/*
 * @Author: zhipeng
 * @Date: 2020-06-21 17:38:11
 * @LastEditTime: 2020-06-27 19:04:19
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

export function login (username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo () {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}
