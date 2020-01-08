<template>
<card-polygon
  v-if="polygons"
  :polygons="polygons"
  @view-polygon="viewPolygon"
/>
</template>

<script>
import CardPolygon from '@/components/card/CardPolygon'

import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

import { mapState } from "vuex"

export default {
  components: {
    CardPolygon,
  },

  mixins: [mountableAsDynamicMixin],

  data: () => ({
    // defined if mountableAsDynamicMixin is included
    dynamicTitle: 'Polígonos'
  }),

  computed: {
    ...mapState({
      polygons: (state) => state.polygons.dataContext
    })
  },

  created () {
    const params = { project: 1 }
    this.$store.dispatch('polygons/getDataContext', params)
  },

  methods: {
    viewPolygon (polygon) {
      console.warn(polygon)
    }
  },
}
</script>
