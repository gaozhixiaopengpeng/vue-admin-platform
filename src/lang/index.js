/*
 * @Author: zhipeng
 * @Date: 2020-07-08 20:31:23
 * @LastEditTime: 2020-07-08 22:40:30
 * @LastEditors: Please set LastEditors
 * @Description: set locale
 * @FilePath: /vue-admin-platform/src/lang/index.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import Config from '@/settings.js'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
export function getLanguage () {
  // Read the language of the last page closed
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return Config.language
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
