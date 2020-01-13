<template>
<el-tabs
  type="border-card"
  class="the-sidebar"
>

  <el-tab-pane>
    <span
      slot="label"
      class="text-center"
    ><i class="el-icon-picture" /> IMÁGENES</span>

    <panel-images />

  </el-tab-pane>

  <el-tab-pane>
    <span
      slot="label"
      class="text-center"
    ><i class="el-icon-menu" /> MENU</span>

    <panel-control @select-component-dynamic="openDrawerDynamic" />

  </el-tab-pane>

  <drawer-dynamic
    ref="drawerDynamic"
    :component="selectedComponent"
  />

</el-tabs>
</template>

<script>
import PanelControl  from '@/components/panels/PanelControl'
import PanelImages  from '@/components/panels/PanelImages'

import DrawerDynamic from "@/components/drawer/DrawerDynamic"

/**
 * TODO: COLLAPSED MODE
 */
export default {
  components: {
    PanelControl,
    PanelImages,
    DrawerDynamic
  },

  data () {
    return {
      // sidebar
      isCollapse: false,
      // dynamic component
      selectedComponent: {
        type: 'component',
        path: 'fallback/Fallback'
      }
    }
  },

  methods: {
    /**
     ** setting as selectedComponent from sidebar selected item control panel
     */
    openDrawerDynamic (component) {
      this.selectedComponent = component
      this.$refs.drawerDynamic.setDrawerVisible()
    }
  }
}
</script>
