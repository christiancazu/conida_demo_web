import DialogDynamic from '@/components/dialog/DialogDynamic'

export default {
  components: {
    DialogDynamic
  },

  data: () => ({
    dialogDynamicMixin_componentSelected: {
      name: '',
      visible: false
    }
  }),

  methods: {
    $_dialogDynamicMixin_openDialog (componentName) {
      this.dialogDynamicMixin_componentSelected.name = componentName
      this.dialogDynamicMixin_componentSelected.visible = true
    },

    $_dialogDynamicMixin_closeDialog () {
      this.dialogDynamicMixin_componentSelected.visible = false
    }
  }
}
