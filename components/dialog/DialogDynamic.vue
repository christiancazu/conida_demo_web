<template>
<el-dialog
  :title="title"
  :visible.sync="visible"
  :close-on-click-modal="false"
  append-to-body
  destroy-on-close
  center
  @close="dialogClose"
>

  <component
    :is="dynamicComponent"
    @set-dynamic-title="setDynamicTitle"
  />

</el-dialog>
</template>

<script>
import WrapperDynamicSetup from '@/components/base/setup/WrapperDynamicSetup'

export default {
  extends: WrapperDynamicSetup, // parent logic

  methods: {
    dialogClose () {
      this.$emit('dialog-close')
    }
  }
}
</script>
