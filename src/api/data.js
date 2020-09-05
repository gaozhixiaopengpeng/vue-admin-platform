/*
 * @Author: zhipeng
 * @Date: 2020-09-04 22:06:49
 * @LastEditTime: 2020-09-05 15:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/mixins/crud.js
 */
import request from '@/utils/request'
import qs from 'qs'

export function initData (url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function download (url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
