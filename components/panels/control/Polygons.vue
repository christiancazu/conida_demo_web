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
import CardPolygon from '@/components/card/CardPolygon'

import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

import { mapState } from "vuex"
import { $_notify_success } from '@/use/notifications'
import { SUCCESS } from '@/config/messages'
import { leafLetService } from '@/services/services.types'
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
      const createdPolygon = this.$_leafLet_service(leafLetService.ADD_LAYER, polygon, this.$L.projectLayers)

      // apply bounds if createdPolygon was created
      if (createdPolygon) this.$L.map.fitBounds(createdPolygon.getBounds())

      this.$store.commit(`polygons/${SET_ACTIVE_VISIBLE_POLYGON_BUTTON}`, polygon.id)
    },

    /**
     * deletePolygon handler
     * @param {int} id: from polygonLayer
     */
    async deletePolygon ({ id }) {
      try {
        await this.$_request_service(this.deleteAction(id), 'loadingDrawer')

        const layerExists = this.$_leafLet_service(leafLetService.FIND_LAYER, { id }, this.$L.projectLayers)

        if (layerExists) this.$_leafLet_service(leafLetService.DELETE_LAYER, layerExists, this.$L.projectLayers)

        this.$_leafLet_service(leafLetService.SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS, this.$L.projectLayers)

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
