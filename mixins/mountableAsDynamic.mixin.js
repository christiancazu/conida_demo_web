export default {
  /**
   ** emiting title to dynamic parent wrapper (dialog/drawer)
   */
  mounted () {
    this.$emit('set-dynamic-title', this.dynamicTitle)
  },

  activated () {
    this.$emit('set-dynamic-title', this.dynamicTitle)
  }
}
