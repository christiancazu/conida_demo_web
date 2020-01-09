<script>
import { sideBySide } from 'leaflet-side-by-side'
import { tileLayer } from "leaflet"
// const sideBySide = require('leaflet-side-by-side')
import { findRealParent } from "vue2-leaflet"

export default {
  props: {
    tile1: { type: Object, default: () => ({}) },
    tile2: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      LMap: {}
    }
  },
  mounted () {
    setTimeout(() => {
      this.LMap = findRealParent(this.$parent.$parent).mapObject
      console.warn(this.LMap)

      console.log(this.tile1, 'tile1')
      console.log(this.tile2, 'tile2')

      const layer1 =tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(this.LMap)
      const layer2 =tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {foo: 'bar'}).addTo(this.LMap)

      const sbs = sideBySide(layer1, layer2).addTo(this.LMap)

      console.info('sbs', sbs)
    }, 3000)

  },

  render: () => ({})
}
</script>
