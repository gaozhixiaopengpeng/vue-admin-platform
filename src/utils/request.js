/*
 * @Author: zhipeng
 * @Date: 2020-06-21 17:32:07
 * @LastEditTime: 2020-06-26 13:40:51
 * @LastEditors: Please set LastEditors
 * @Description: Api request
 * @FilePath: /vue-admin-platform/src/utils/request.js
 */
import axios from 'axios'
import { Notification } from 'element-ui'
import Config from '@/settings'

// 创建axios实例
const service = axios.create({
  //  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  baseURL: 'http://localhost:8000',
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (getToken()) {
    //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    Notification.error({
      title: '接口请求失败',
      duration: 5000
    })
    return Promise.reject(error)
  }
)
export default service
