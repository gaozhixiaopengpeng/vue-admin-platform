/*
 * @Author: zhipeng
 * @Date: 2020-06-27 14:31:18
 * @LastEditTime: 2020-06-27 19:00:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/api/system/user.js
 */
import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add (data) {
  return request({
    url: 'api/users',
    method: 'post',
    data
  })
}

export function del (ids) {
  return request({
    url: 'api/users',
    method: 'delete',
    data: ids
  })
}

export function edit (data) {
  return request({
    url: 'api/users',
    method: 'put',
    data
  })
}

export function editUser (data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data
  })
}

export function updatePass (user) {
  const data = {
    oldPass: encrypt(user.oldPass),
    newPass: encrypt(user.newPass)
  }
  return request({
    url: 'api/users/updatePass/',
    method: 'post',
    data
  })
}

export function updateEmail (form) {
  const data = {
    password: encrypt(form.pass),
    email: form.email
  }
  return request({
    url: 'api/users/updateEmail/' + form.code,
    method: 'post',
    data
  })
}

export default { add, edit, del }
