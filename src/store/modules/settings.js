/*
 * @Author: zhipeng
 * @Date: 2020-06-26 16:07:02
 * @LastEditTime: 2020-06-26 16:23:48
 * @LastEditors: Please set LastEditors
 * @Description: Store: settings
 * @FilePath: /vue-admin-platform/src/store/modules/settings.js
 */
// setting elementui default style
import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { tagsView, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: false,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  uniqueOpened: uniqueOpened,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({commit}, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
