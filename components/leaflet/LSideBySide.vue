<script>
// import * as sideBySide from 'leaflet-side-by-side'
var sideBySide = require('leaflet-side-by-side')
import L from 'leaflet'
// const sideBySide = require('leaflet-side-by-side')
import { findRealParent } from "vue2-leaflet"

export default {
  props: {
    //tile1: { type: Object, default: () => ({}) },
    //tile2: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      LMap: {}
    }
  },
  mounted () {
    this.LMap = findRealParent(this.$parent).mapObject
    let leftLayer = L.tileLayer.wms("http://35.238.229.238:8080/geoserver/conida/wms", {
      layers: "conida:RGB_S2A_MSIL2A_20191227T151701_N0213_R125_T18LWM_20191227T185645",
      format: 'image/png',
      transparent: true,
    })
    this.LMap.addLayer(leftLayer)
    let rightLayer = L.tileLayer.wms("http://35.238.229.238:8080/geoserver/conida/wms", {
      layers: "conida:NDVI_S2A_MSIL2A_20191227T151701_N0213_R125_T18LWM_20191227T185645",
      format: 'image/png',
      transparent: true,
    })
    this.LMap.addLayer(rightLayer)
    //leafletControl.addTo(this.LMap)

    //console.log(L.control({}))
    let leafletControl = sideBySide(leftLayer, rightLayer)

    console.log(leafletControl)
    //console.log(leftLayer._leaflet_id)
    //console.log(rightLayer._leaflet_id)
    //console.log(leafletControl._leaflet_id)




    /**
    console.log(this.LMap)
    setTimeout(() => {

      //console.warn(this.LMap)

      //console.log(this.tile1, 'tile1')
      //console.log(this.tile2, 'tile2')

      let result = tileLayer
        .wms('http://35.238.229.238:8080/geoserver/conida/wms', {
          format: 'image/png',
          transparent: true,
          layers: 'conida:VEGETATION_S2A_MSIL2A_20191227T151701_N0213_R125_T18LWM_20191227T185645'
        }).addTo(this.LMap)
      console.log(result._leflet_id)

      let base = tileLayer
        .wms('http://35.238.229.238:8080/geoserver/conida/wms', {
          format: 'image/png',
          transparent: true,
          layers: 'conida:S2A_MSIL2A_20191227T151701_N0213_R125_T18LWM_20191227T185645'
        }).addTo(this.LMap)
      console.log(base._leflet_id)

      //const sbs = sideBySide(result, base).addTo(this.LMap)

      //console.info('sbs', sbs)

    }, 3000)
*/
  },

  render: () => ({})
}
</script>
