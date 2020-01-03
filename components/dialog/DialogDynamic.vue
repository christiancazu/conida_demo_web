<template>
<el-dialog
  :title="title"
  :close-on-click-modal="false"
  :visible.sync="visible"
  append-to-body
  destroy-on-close
  center
  @close="closeModal"
>

  <component
    :is="dynamicComponent"
    @set-dialog-title="setDialogTitle"
  />

</el-dialog>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      default: () => ({
        type: { type: String, required: true },
        path: { type: String, required: true }
      })
    }
  },

  data: () => ({
    visible: false,
    title: ''
  }),

  computed: {
    dynamicComponent () {
      return this.component.type === 'page'
        ? () => import('@/pages/' + this.component.path)
        : () => import('@/components/' + this.component.path)
    }
  },

  mounted () {
    this.visible = true
  },

  methods: {
    closeModal () {
      this.visible = false
      this.$emit('close-modal')
    },

    /**
     * setting from child dynamic component
     */
    setDialogTitle (titleFromDynamicChild) {
      this.title = titleFromDynamicChild
    }
  }
}
</script>
