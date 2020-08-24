/*
 * @Author: zhipeng
 * @Date: 2020-08-14 13:21:50
 * @LastEditTime: 2020-08-24 22:20:22
 * @LastEditors: Please set LastEditors
 * @Description: Tag view store
 * @FilePath: /vue-admin-platform/src/store/modules/tagsView.js
 */
const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  }
}

const actions = {
  delAllCachedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  addVisitedView ({commit}, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addView ({dispatch}, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addCachedView ({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)

      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
