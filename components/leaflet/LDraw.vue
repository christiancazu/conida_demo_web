<script>
/**
 * Listener on click buttons to bindPopup menu buttons
 * accessing to vue.obserbable $ctxLDraw instance component
 */
document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('btn-leaflet-popup')) {
    const action = e.target.getAttribute('data-action')
    const id = Number(e.target.getAttribute('data-leaflet-id'))
    // eslint-disable-next-line no-undef
    $nuxt.$ctxLDraw.instance.onClickBtnPopupMenu(action, id)
  }
})

import { Control, Draw } from 'leaflet'

import { findRealParent } from 'vue2-leaflet'

import 'leaflet-draw'

export default {
  data () {
    return {
      LFeatureGroup: null,
      LMap: null
    }
  },

  mounted () {
    /**
     * assigning context on Vue.observable to be access from outside Vue instance
     *
     * @instance $ctxLDraw.instance
     */
    this.$ctxLDraw.instance = this

    // LFeatureGroup parent
    this.LFeatureGroup = findRealParent(this.$parent).mapObject
    // LMap parent
    this.LMap = findRealParent(this.$parent.$parent).mapObject

    this.LMap.addLayer(this.LFeatureGroup)

    this.mapObject = new Control.Draw({
      edit: {
        featureGroup: this.LFeatureGroup
      },
      // draw settings
      draw: {
        marker: false,
        circle: false,
        circlemarker: false
      }
    })

    this.LMap.addControl(this.mapObject)

    this.LFeatureGroup.addTo(this.LMap)

    // Lmap events with leaflet-draw plugin
    this.onDrawCREATED()
    /**
     * TODO: DRAW EVENTS
     */

    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
    })
  },

  methods: {
    /**
     * from popupMenu buttons, action & _leaflet_id
     *
     * @param {String, int}
     */
    onClickBtnPopupMenu (action, id) {
      let currentLayer = null

      this.LMap.eachLayer((layer) => {
        if(layer._leaflet_id === id) currentLayer = layer
      })

      switch (action) {
      case 'register':
        this.onRegisterLayer(currentLayer)
        break
      case 'edit':
        this.onEditLayer(currentLayer)
        break
      case 'delete':
        this.onDeleteLayer(currentLayer)
        break
      }
    },

    /**
     * Lmap event @event CREATED
     * @package leaflet-draw
     */
    onDrawCREATED () {
      this.LMap.on(Draw.Event.CREATED, ({ layer }) => {
        this.LFeatureGroup.addLayer(layer)
        // bindPopup to layer created
        layer.bindPopup(this.popupTemplate(layer._leaflet_id))
      })
    },

    /**
     * @emits register-layer
     * @param {Layer<Leaflet>}
     */
    onRegisterLayer (layer) {
      this.$emit('selected-geojson', layer.toGeoJSON())
    },

    /**
     * @emits edit-layer
     * @param {Layer<Leaflet>}
     */
    onEditLayer (layer) {
      layer.editing.enable()
    },

    /**
     * @emits delete-layer
     * @param {Layer<Leaflet>}
     */
    onDeleteLayer (layer) {
      this.LFeatureGroup.removeLayer(layer)
    },

    /**
     * custom popup menu buttons template
     *
     * @param {id}
     */
    popupTemplate (id) {
      return `
        <button 
          data-tooltip="guardar"
          data-leaflet-id="${id}"
          data-action="register"
          class="btn-leaflet-popup el-button el-button--success is-circle"
        >
          <i class="el-icon-circle-plus-outline"></i>
        </button>
        <button 
          data-tooltip="editar"
          data-leaflet-id="${id}"
          data-action="edit"
          class="btn-leaflet-popup el-button el-button--warning is-circle"
        >
          <i class="el-icon-edit"></i>
        </button>
        <button 
          data-tooltip="eliminar"
          data-leaflet-id="${id}"
          data-action="delete"
          class="btn-leaflet-popup el-button el-button--danger is-circle"
        >
          <i class="el-icon-delete"></i>
        </button>
      `
    }
  },

  render: () => ({})
}
</script>
