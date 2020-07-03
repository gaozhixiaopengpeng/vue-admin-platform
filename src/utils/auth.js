/*
 * @Author: zhipeng
 * @Date: 2020-06-27 14:08:57
 * @LastEditTime: 2020-06-27 14:09:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/utils/auth.js
 */
import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
