/*
 * @Author: zhipeng
 * @Date: 2020-09-23 18:48:36
 * @LastEditTime: 2020-09-23 18:49:21
 * @LastEditors: Please set LastEditors
 * @Description: Roles
 * @FilePath: /vue-admin-platform/src/api/system/role.js
 */
import request from '@/utils/request'

export function getAll () {
  return request({
    url: 'api/roles/all',
    method: 'get'
  })
}

export function add (data) {
  return request({
    url: 'api/roles',
    method: 'post',
    data
  })
}

export function get (id) {
  return request({
    url: 'api/roles/' + id,
    method: 'get'
  })
}

export function getLevel () {
  return request({
    url: 'api/roles/level',
    method: 'get'
  })
}

export function del (ids) {
  return request({
    url: 'api/roles',
    method: 'delete',
    data: ids
  })
}

export function edit (data) {
  return request({
    url: 'api/roles',
    method: 'put',
    data
  })
}

export function editMenu (data) {
  return request({
    url: 'api/roles/menu',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, editMenu, getLevel }
