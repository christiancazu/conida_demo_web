<template>
<card-polygon
  v-if="polygons"
  v-loading="$store.state.spinners.loadingDrawer"
  :polygons="polygons"
  @view-polygon="viewPolygon"
  @delete-polygon="deletePolygon"
/>
</template>

<script>
import CardPolygon from '@/components/cards/CardPolygon'

import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

import { mapState } from "vuex"
import { $_notify_success } from '@/use/notifications'
import { SUCCESS } from '@/config/messages'
import { SERVICES } from '@/services/services.types'
import { SET_ACTIVE_VISIBLE_POLYGON_BUTTON } from '@/store/mutations.types'

export default {
  components: {
    CardPolygon
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

  async created () {
    this.init()
  },

  methods: {
    viewPolygon (polygon) {
      const createdPolygon = this.$_leafLet_service(SERVICES.LEAFLET.ADD_LAYER, polygon, this.$L.projectLayers)

      // apply bounds if createdPolygon was created
      if (createdPolygon) this.$L.map.fitBounds(createdPolygon.getBounds(), {
        paddingBottomRight: [
          450, 0
        ]
      })

      this.$store.commit(`polygons/${SET_ACTIVE_VISIBLE_POLYGON_BUTTON}`, polygon.id)
    },

    /**
     * deletePolygon handler
     * @param {Layer} from polygonLayer
     */
    async deletePolygon (polygon) {
      try {
        await this.$_request_service(this.$store.dispatch('polygons/deleteItemContext', polygon.id), 'loadingDrawer')

        const polygonExists = this.$_leafLet_service(SERVICES.LEAFLET.FIND_LAYER, polygon, this.$L.projectLayers)

        if (polygonExists) this.$_leafLet_service(SERVICES.LEAFLET.DELETE_LAYER, polygonExists, this.$L.projectLayers)

        await this.$_leafLet_service(SERVICES.LEAFLET.FETCH_PROJECT_LAYERS, this.$L.projectLayers)

        $_notify_success(SUCCESS.DELETED)
      } catch (error) {
      }
    },

    async init () {
      try {
        await this.$_request_service(this.$store.dispatch('polygons/getDataContext'), 'loadingDrawer')
      } catch (error) {
      }
    }
  }
}
</script>
