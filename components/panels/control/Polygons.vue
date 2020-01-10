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
      if (createdPolygon) this.$L.map.fitBounds(createdPolygon.getBounds())

      this.$store.commit(`polygons/${SET_ACTIVE_VISIBLE_POLYGON_BUTTON}`, polygon.id)
    },

    /**
     * deletePolygon handler
     * @param {Layer} from polygonLayer
     */
    async deletePolygon (polygon) {
      try {
        await this.$_request_service(this.deleteAction(polygon.id), 'loadingDrawer')

        const polygonExists = this.$_leafLet_service(SERVICES.LEAFLET.FIND_LAYER, polygon, this.$L.projectLayers)

        if (polygonExists) this.$_leafLet_service(SERVICES.LEAFLET.DELETE_LAYER, polygonExists, this.$L.projectLayers)

        this.$_leafLet_service(SERVICES.LEAFLET.SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS, this.$L.projectLayers)

        $_notify_success(SUCCESS.DELETED)
      } catch (error) {
      }
    },

    /**
     * delete callback
     */
    async deleteAction (id) {
      await this.$store.dispatch('polygons/deleteItemContext', id)
      await this.$store.dispatch('polygons/getDataContext')
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
