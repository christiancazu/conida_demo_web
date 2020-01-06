<template>
<div
  class="map-wrapper"
  style="width: 150%"
>
  <client-only>
    <l-map
      ref="map"
      :center="map.latLng"
      :zoom="map.zoom"
    >

      <l-tile-layer
        :url="tileLayer.url"
      />

      <l-draw @selected-geojson="SelectedGeoJSON" />

      <l-control />

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
  LControl
} from 'vue2-leaflet'

import LDraw from '@/components/leaflet/LDraw'

import dialogDynamicMixin from "@/mixins/dialogDynamic.mixin"

export default {
  components: {
    LMap,
    LTileLayer,
    LControl,
    LDraw
  },

  mixins: [dialogDynamicMixin],

  data () {
    return {
      // leaflet
      map: {
        latLng: [
          -9.190481498666669,
          -74.61914062500001
        ],
        zoom: 4
      },
      tileLayer: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      },
      // dialog
      dialogDynamic: {
        geoJson: {
          type: 'component',
          path: 'LayerDetails'
        }
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    SelectedGeoJSON (geoJSON) {
      this.$_dialogDynamicMixin_dialogOpen('geoJson')
      this.$refs.dialogDynamic.$setPropertiesToChild(geoJSON)
    },

    init () {
      /**
       * resolving width map when resize
       */
      const $mapWrapper = document.querySelector('.map-wrapper')

      setTimeout(() => $mapWrapper.style.width = '100%')
    },

    logout () {
      this.$_authServiceSignOut()
    }
  }
}
</script>
