/*
 * @Author: zhipeng
 * @Date: 2020-06-26 18:13:50
 * @LastEditTime: 2020-09-13 17:26:45
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

export function add (data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

export function edit (data) {
  return request({
    url: 'api/menus',
    method: 'put',
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

export function getMenus (params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

export default {add, edit, del, buildMenus, getMenus}
