/*
 * @Author: zhipeng
 * @Date: 2020-06-26 18:13:50
 * @LastEditTime: 2020-09-18 14:00:41
 * @LastEditors: Please set LastEditors
 * @Description: Menu Api
 * @FilePath: /vue-admin-platform/src/api/menu.js
 */
import request from '@/utils/request'

export function getMenusTree (pid) {
  return request({
    url: 'api/menus/lazy?pid=' + pid,
    method: 'get'
  })
}

export function getMenus (params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

export function getMenuSuperior (ids) {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'api/menus/superior',
    method: 'post',
    data
  })
}

export function buildMenus () {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export function add (data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

export function del (ids) {
  return request({
    url: 'api/menus',
    method: 'delete',
    data: ids
  })
}

export function edit (data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}

export default { add, edit, del, getMenusTree, getMenuSuperior, getMenus }
