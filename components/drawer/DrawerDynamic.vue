<template>
<el-drawer
  ref="drawer"
  :title="title"
  :visible.sync="visible"
  append-to-body
  direction="rtl"
  size="50%"
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
export default {
  props: {
    component: {
      type: Object,
      default: () => ({
        type: 'component',
        path: 'fallback/Fallback'
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
    // prevent tabindex on title when drawer is visible
    this.$refs.drawer.$el.firstChild.querySelector('span').removeAttribute('tabindex')
  },

  methods: {
    /**
     * setting from child dynamic component
     */
    setDynamicTitle (titleFromDynamicChild) {
      this.title = titleFromDynamicChild
    },

    setDrawerVisible () {
      this.visible = true
    }
  }
}
</script>
