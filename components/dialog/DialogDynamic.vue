<template>
<el-dialog
  :title="`some title`"
  :close-on-click-modal="false"
  :visible.sync="visible"
  append-to-body
  destroy-on-close
  top="2vh"
  class="dialog-responsive"
  @close="closeModal()"
>
  <component :is="dynamicComponent" />

</el-dialog>
</template>

<script>
// import { CLOSE_MODAL } from '@/store/mutations.types'
/* eslint-disable no-irregular-whitespace */

export default {
  props: {
    component: {
      type: Object,
      default: () => ({})
    },
  },

  data: () => ({
    visible: false
  }),

  computed: {
    dynamicComponent () {
      const { folderPath, name } = this.component
      // const importx = `~/components/${folderPath + '/' + name}`
      // console.warn(importx)
      // return () => import(`./widgets/${this.componentName}.vue`);
      return () => import(`@/components/${folderPath + '/' + name}`)
    }
  },

  mounted () {
    console.warn(this.component)
    setTimeout(() => {
      this.visible = true
    }, 200)
  },
  //   props: {
  // modal: {
  //   type: Object,
  //   default: () => ({
  //     store: { type: String, required: true },
  //     title: { type: String, default: ' ' }
  //   })
  // },
  // modalType: { type: String, required: true }
  //   },

  //   computed: {
  //     title () {
  //       return this.modal.title !== ' '
  //         ? this.modal.title
  //         : this.$store.state[this.modal.store][this.modalType].title
  //     }
  //   },

  methods: {
    closeModal () {
      this.$emit('close-modal')
    //   this.$store.commit(`${this.modal.store}/${CLOSE_MODAL}`, this.modalType)
    }
  }
}
</script>
