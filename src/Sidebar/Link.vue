<!--
 * @Author: zhipeng
 * @Date: 2020-06-27 11:42:20
 * @LastEditTime: 2020-06-27 11:54:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/layout/components/Sidebar/Link.vue
-->
<template>
     <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to)">
         <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps (url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }

      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
