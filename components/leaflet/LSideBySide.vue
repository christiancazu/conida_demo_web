<template>
<div>
  <!-- <l-w-m-s-tile-layer
    base-url="http://35.238.229.238:8080/geoserver/conida/wms"
    layers="conida:RGB_S2A_MSIL2A_20191227T151701_N0213_R125_T18LWM_20191227T185645"
    :visible="true"
    name="xxx"
    layer-type="overlay"
    :transparent="true"
    format="image/png"
    @ready="layerTest = $event"
  /> -->
  <l-w-m-s-tile-layer
    v-for="(item, i) in satelitalIndex"
    :key="i"
    :base-url="item.baseUrl"
    :layers="item.layer"
    layer-type="overlay"
    :transparent="true"
    format="image/png"
    :detect-retina="true"
    @ready="$event => test($event, item)"
  />

</div>

</template>
<script>
import SideBySide from 'leaflet-side-by-side'
import { findRealParent, LWMSTileLayer } from "vue2-leaflet"
import { geoJSON } from 'leaflet'
import { SET_LAYER_SATELITAL_INDEX } from '@/store/mutations.types'
import { mapState } from 'vuex'

export default {
  components: {
    LWMSTileLayer
  },
  data () {
    return {
      LMap: {},
      layerBase: null,
      layerResult: null,
      LSideBySide: null,
      visible: false
    }
  },

  computed: {
    ...mapState({
      sideBySideVisible: (state) => state.satelitalIndexes.sideBySideVisible,
      satelitalIndex: (state) => state.satelitalIndexes.layerSatelitalIndex
    }),
    geometry: function () {
      return this.satelitalIndex[0] ? this.satelitalIndex[0].geometry : null
    }
  },

  watch: {
    sideBySideVisible: function (val) {
      if (!val) {
        this.removeSideBySide()
      }
    },
    satelitalIndex: function (val) {
      console.log(val)
      // this.addSideBySide()
    }
  },

  mounted () {
    this.LMap = findRealParent(this.$parent).mapObject
  },

  methods: {
    test (layer, item) {
      console.log('cargo nuevos layers')
      let typeIndex = item.typeImage
      this[typeIndex] = layer
      this.addSideBySide()
    },

    addSideBySide () {
      if (this.layerBase && this.layerResult) {
        this.$nextTick(() => {
          this.LSideBySide = SideBySide(this.layerBase, this.layerResult)
          this.LSideBySide.addTo(this.LMap)
          let geometry = JSON.parse(this.geometry)
          this.LMap.fitBounds(geoJSON(geometry).getBounds())
        })
      }
    },

    removeSideBySide () {
      this.LMap.removeControl(this.LSideBySide)
      this.$store.commit(`satelitalIndexes/${SET_LAYER_SATELITAL_INDEX}`, [])
      this.LSideBySide = null
      this.layerBase = null
      this.layerResult = null
    }
  },
  render: () => ({})
}
</script>
