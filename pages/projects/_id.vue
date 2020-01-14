<template>
<div
  class="map-wrapper"
  style="width: 150%"
>
  <client-only>
    <l-map
      :center="map.latLng"
      :zoom="map.zoom"
      @ready="onReadyLMap"
    >

      <l-tile-layer :url="tileLayer.url" />

      <!-- tempLayers -->
      <l-draw @add-polygon="launchAddPolygonDialog" />

      <!-- projectLayers -->
      <l-layer-group @ready="onReadyProjectLayers" />

      <l-side-by-side />

    </l-map>
  </client-only>

  <dialog-dynamic
    ref="dialogDynamic"
    :component="dialogDynamic[dialogDynamicMixin_componentSelected]"
    @dialog-close="$_dialogDynamicMixin_dialogClose"
  />

</div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LLayerGroup
} from 'vue2-leaflet'

import LDraw from '@/components/leaflet/LDraw'
import LSideBySide from '@/components/leaflet/LSideBySide'

import dialogDynamicMixin from '@/mixins/dialogDynamic.mixin'
import { SERVICES } from '@/services/services.types'

export default {
  components: {
    LMap,
    LTileLayer,
    LDraw,
    LSideBySide,
    LLayerGroup
  },

  mixins: [dialogDynamicMixin],

  data () {
    return {
      // leaflet
      map: {
        latLng: [
          -9.190481498666669, -74.61914062500001
        ],
        zoom: 4
      },
      tileLayer: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      },
      // dialog
      dialogDynamic: {
        addPolygon: {
          type: 'component',
          path: 'polygons/AddPolygon'
        }
      }
    }
  },

  mounted () {
    const projectId = this.$route.params.id
    this.$store.dispatch('projects/getItemContext', projectId)
    this.init()
  },

  methods: {
    launchAddPolygonDialog (layer) {
      this.$_dialogDynamicMixin_dialogOpen('addPolygon')
      this.$refs.dialogDynamic.$setPropertiesToChild(layer)
    },

    /**
     * getting map.mapObject reference from <l-map> component
     */
    onReadyLMap (mapObject) {
      this.$L.map = mapObject
    },
    /**
     * assigning layerGroup to projectLayers
     */
    onReadyProjectLayers (mapObject) {
      this.$L.projectLayers = mapObject
    },

    init () {
      /**
       * resolving width map when resize
       */
      const $mapWrapper = document.querySelector('.map-wrapper')

      setTimeout(() => $mapWrapper.style.width = '100%', 1)
    },

    logout () {
      this.$_auth_service(SERVICES.AUTH.SIGN_OUT)
    }
  }
}
</script>
