/*
 * @Author: zhipeng
 * @Date: 2020-09-23 14:52:36
 * @LastEditTime: 2020-09-23 17:00:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/components/IconSelect/requireIcons.js
 */
const req = require.context('../../assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default icons
