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

      <l-draw />

      <l-control />

    </l-map>
  </client-only>
</div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControl
} from 'vue2-leaflet'

import LDraw from '@/components/leaflet/LDraw'

export default {
  components: {
    LMap,
    LTileLayer,
    LControl,
    LDraw
  },

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
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      /**
       * resolving width map when resize
       */
      const $mapWrapper = document.querySelector('.map-wrapper')

      await new Promise((res) => setTimeout(() => res($mapWrapper.style.width = '100%')))
    },

    logout () {
      this.$_authServiceSignOut()
    }
  }
}
</script>
