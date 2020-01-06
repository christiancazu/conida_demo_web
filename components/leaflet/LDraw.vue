<script>
/**
 * Listener on click to bindPopup menu buttons
 */
document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('btn-leaflet-popup')) {
    const action = e.target.getAttribute('data-action')
    const id = Number(e.target.getAttribute('data-leaflet-id'))
    // eslint-disable-next-line no-undef
    $nuxt.$ctxLDraw.instance.onClickBtnPopupMenu(action, id)
  }
})

import 'leaflet-draw'

import { findRealParent } from 'vue2-leaflet'

import { FeatureGroup, Control, Draw } from 'leaflet'

export default {
  data () {
    return {
      drawnItems: null,
      drawControl: null,
      objectMap: null,
      ready: false,
      parentContainer: null
    }
  },

  mounted () {
    // assigning context to $ctxLDraw.instance to be access from out Vue instance
    this.$ctxLDraw.instance = this

    this.parentContainer = findRealParent(this.$parent).mapObject

    this.drawnItems = new FeatureGroup()

    this.parentContainer.addLayer(this.drawnItems)

    this.drawControl = new Control.Draw({
      edit: {
        featureGroup: this.drawnItems
      },
      draw: {
        marker: false,
        circle: false,
        circlemarker: false
      }
    })

    this.parentContainer.addControl(this.drawControl)

    this.drawnItems.addTo(this.parentContainer)

    this.parentContainer.eachLayer((layer) => {
      layer.on('contextmenu', (l) => {
        this.drawnItems.removeLayer(l.layer)
      })
    })

    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
      this.parentContainer.on(Draw.Event.CREATED, (e) => {
        const layer = e.layer

        this.drawnItems.addLayer(layer)
        layer.bindPopup(this.popupTemplate(layer._leaflet_id))
      })
    })
  },

  methods: {
    onClickBtnPopupMenu (action, id) {
      let currentLayer = null

      this.parentContainer.eachLayer((layer) => {
        if(layer._leaflet_id === id) currentLayer = layer
      })

      if (action === 'delete') this.deleteLayer(currentLayer)
      if (action === 'details') this.detailsLayer(currentLayer)
    },

    deleteLayer (layer) {
      this.drawnItems.removeLayer(layer)
    },

    detailsLayer (layer) {
      this.$emit('selected-geojson', layer.toGeoJSON())
      // layersDetails.editing.enable()
    },

    popupTemplate (id) {
      return `
        <button 
          type="button"
          data-leaflet-id="${id}"
          class="btn-leaflet-popup el-button el-button--succes is-circle pa-0" 
          style="width: 28px; height: 28px;"
        >
          <i class="el-icon-star-off" style="pointer-events: none"></i>
        </button>
        <button 
          type="button"
          data-leaflet-id="${id}"
          data-action="details"
          class="btn-leaflet-popup el-button el-button--warning is-circle pa-0" 
          style="width: 28px; height: 28px;"
        >
          <i class="el-icon-star-off" style="pointer-events: none"></i>
        </button>
        <button 
          type="button"
          data-action="delete"
          data-leaflet-id="${id}"
          class="btn-leaflet-popup el-button el-button--danger is-circle pa-0" 
          style="width: 28px; height: 28px;"
        >
          <i class="el-icon-star-off" style="pointer-events: none"></i>
        </button>
      `
    }
  },

  render: () => ({})
}
</script>
