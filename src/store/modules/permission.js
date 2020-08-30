/*
 * @Author: zhipeng
 * @Date: 2020-06-26 17:36:44
 * @LastEditTime: 2020-08-29 16:12:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/store/modules/permission.js
 */
import { constantRouterMap } from '@/router/routers'
import Layout from '@/layout'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    }
  }
}

/**
 * 遍历后台传来的路由字符串，转化成组件对象
 * @param {*} routers: 路由字符串
 * @returns
 */
export const filterAsyncRouter = routers => {
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = view => {
  return () => import(`@/views/${view}`)
}

export default permission
