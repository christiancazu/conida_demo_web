<template>
<el-drawer
  ref="drawer"
  :title="title"
  :visible.sync="visible"
  append-to-body
  direction="ltr"
  :size="drawerSize"
  :modal="false"
  custom-class="drawer-right"
>
  <div class="ma-2">
    <keep-alive>
      <component
        :is="dynamicComponent"
        @set-dynamic-title="setDynamicTitle"
      />
    </keep-alive>
  </div>

</el-drawer>
</template>

<script>
import WrapperDynamicSetup from '@/components/base/setup/WrapperDynamicSetup'

export default {
  extends: WrapperDynamicSetup, // parent logic

  props: {
    drawerSize: { type: String, default: '33%' }
  },

  mounted () {
    // prevent tabindex on title when drawer is visible
    this.$refs.drawer.$el.firstChild.querySelector('span').removeAttribute('tabindex')
  }
}
</script>
