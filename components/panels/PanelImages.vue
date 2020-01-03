<template>
<el-menu
  default-active="2"
  :background-color="sidebarBgColor"
  :active-text-color="sidebarActiveTextColor"
  :collapse="isCollapse"
  @open="handleOpen"
  @close="handleClose"
>
  <el-menu-item index="2">
    <i class="el-icon-menu" />
    <span slot="title">IMAGES PANEL</span>
  </el-menu-item>
</el-menu>
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
    isCollapse: false
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
