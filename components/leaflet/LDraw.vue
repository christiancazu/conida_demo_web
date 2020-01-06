<script>
document.addEventListener('click', e => {
  console.log(e.target.tagName === 'BUTTON')
  // eslint-disable-next-line no-undef
  console.warn($nuxt.$refs)
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
    // this.XXX = 'gaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    console.warn(this.$test)
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

    this.parentContainer.on(Draw.Event.CREATED, (e) => {
      const layer = e.layer

      layer.bindPopup(this.popupTemplate())

      console.warn('CREATED', e.target._leaflet_id)
      console.warn(this.$refs)

      this.drawnItems.addLayer(layer)
    })

    this.parentContainer.eachLayer((layer) => {
      layer.on('contextmenu', (l) => {
        console.warn(l.layer._leaflet_id)
        this.drawnItems.removeLayer(l.layer)
      })
    })


    this.parentContainer.on(Draw.Event.CREATED, (e) => {
      this.$emit('draw-start', this.drawnItems, e)

    })
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
    })
  },

  methods: {
    btnAction (e) {
      console.log('BUTTON CLICKED', this.$el, this, e)
      // console.log('event', e.target.getAttribute('data-foo'))
    },

    popupTemplate () {
      return `
        <button 
          type="button"
          class="el-button el-button--succes is-circle pa-0" 
          style="width: 28px; height: 28px;"
        >
          <i class="el-icon-star-off" style="pointer-events: none"></i>
        </button>
        <button 
          type="button"
          class="el-button el-button--warning is-circle pa-0" 
          style="width: 28px; height: 28px;"
        >
          <i class="el-icon-star-off" style="pointer-events: none"></i>
        </button>
        <button 
          type="button"
          class="el-button el-button--danger is-circle pa-0" 
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
