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

import { geoJson } from "leaflet"

import { mapState } from "vuex"
import { $_notify_success } from '@/use/notifications'
import { SUCCESS } from '@/config/messages'

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

      const polygonCreated = geoJson(JSON.parse((polygon.geometry)))
      polygonCreated.id = polygon.id
      polygonCreated.addTo(this.$LMap.instance)


      // .bindPopup(polygonCreated._leaflet_id)
      polygonCreated.bindPopup(this.$LDraw.instance.popupTemplate(polygonCreated._leaflet_id))

      console.warn('poylgon', polygonCreated)
      // this.$LDraw.instance.onDeletePolygon(polygonCreated)
    },

    /**
     * deletePolygon handler
     * @param {int} id: from polygonLayer
     */
    async deletePolygon ({ id }) {
      try {
        await this.$_requestService(this.deleteAction(id), 'loadingDrawer')
        $_notify_success(SUCCESS.DELETED)
      } catch (error) {
      }
    },

    /**
     * delete callback
     */
    async deleteAction (id) {
      await this.$store.dispatch('polygons/deleteItemContext', id)
      this.getDataContext()
    },

    async getDataContext () {
      await this.$store.dispatch('polygons/getDataContext')

    },

    async init () {
      try {
        await this.$_requestService(this.getDataContext(), 'loadingDrawer')
      } catch (error) {
      }
    }
  }
}
</script>
