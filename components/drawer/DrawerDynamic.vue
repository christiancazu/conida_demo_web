<template>
<el-drawer
  ref="drawer"
  :title="title"
  :visible.sync="visible"
  append-to-body
  direction="ltr"
  size="33%"
  :modal="false"
  custom-class="drawer-right"
>

  <keep-alive>
    <component
      :is="dynamicComponent"
      @set-dynamic-title="setDynamicTitle"
    />
  </keep-alive>

</el-drawer>
</template>

<script>
import WrapperDynamicSetup from '@/components/base/setup/WrapperDynamicSetup'

export default {
  extends: WrapperDynamicSetup, // parent logic

  mounted () {
    // prevent tabindex on title when drawer is visible
    this.$refs.drawer.$el.firstChild.querySelector('span').removeAttribute('tabindex')
  }
}
</script>
