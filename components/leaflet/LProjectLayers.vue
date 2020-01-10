<script>
import { findRealParent } from 'vue2-leaflet'
import { layerGroup } from 'leaflet'
export default {
  mounted () {
    // getting map.mapObject reference from <l-map> component
    this.$L.map = findRealParent(this.$parent).mapObject

    this.$L.projectLayers = layerGroup()

    this.$L.map.addLayer(this.$L.projectLayers)
  },

  render: () => ({})
}
</script>
