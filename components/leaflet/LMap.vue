<template>

<div
  id="map"
  class="map"
/>

</template>

<script>
import * as L from 'leaflet'

export default {
  data: () => ({
    map: null,
    tileLayer: null
  }),

  mounted () {
    this.initMap()
  },

  methods: {
    initMap () {
      this.map = L.map('map').setView([
        -9.190481498666669,
        -74.61914062500001
      ], 5)
      this.tileLayer = L.tileLayer(
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18
        }
      )
      this.tileLayer.addTo(this.map)
    }
  }
}
</script>
