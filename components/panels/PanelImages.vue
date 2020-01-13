<template>
<el-input
  v-model="input"
  placeholder="Buscar imágenes"
  clearable
  class="my-4 ml-2 pa-0"
  style="width: 280px"
/>
</template>

<script>
import {
  sidebarBgColor,
  sidebarActiveTextColor
} from '@/assets/sass/_variables.scss'

export default {
  data: () => ({
    // scss variables
    sidebarBgColor,
    sidebarActiveTextColor,
    // sidebar
    isCollapse: false,
    input: ''
  }),

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
