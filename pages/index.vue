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
      @ready="lMapReady"
    >

      <l-tile-layer
        :url="tileLayer.url"
      />

      <l-feature-group>
        <l-draw @add-polygon="launchAddPolygonDialog" />
      </l-feature-group>

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
  LFeatureGroup
} from 'vue2-leaflet'

// import LDraw from '@/components/leaflet/LDraw'
import LDraw from '@/components/leaflet/LDraw'

import dialogDynamicMixin from "@/mixins/dialogDynamic.mixin"

export default {
  components: {
    LMap,
    LTileLayer,
    LFeatureGroup,
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
        addPolygon: {
          type: 'component',
          path: 'polygons/AddPolygon'
        }
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    launchAddPolygonDialog (layer) {
      this.$_dialogDynamicMixin_dialogOpen('addPolygon')
      this.$refs.dialogDynamic.$setPropertiesToChild(layer)
    },

    /**
     * assigning REFERENCE on Vue.observable to be access from Vue instance
     *
     * @instance $LMap.instance
     */
    lMapReady (mapObject) {
      this.$LMap.instance = mapObject
    },

    init () {
      /**
       * resolving width map when resize
       */
      const $mapWrapper = document.querySelector('.map-wrapper')

      setTimeout(() => $mapWrapper.style.width = '100%', 1)
    },

    logout () {
      this.$_authServiceSignOut()
    }
  }
}
</script>
