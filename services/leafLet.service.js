/* eslint-disable array-bracket-newline */
/* eslint-disable array-element-newline */
import { leafLetService } from './services.types'

import { geoJson } from "leaflet"

import { SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS } from '@/store/mutations.types'

export default {
  [leafLetService.FIND_LAYER]: function (...args) {
    const [{ id }, groupLayers] = [...args]
    console.warn(id, groupLayers)
    let layerFound = null

    groupLayers.eachLayer(layer => {
      layer.eachLayer(l => {
        if (l.feature.properties.id === id) layerFound = layer
      })
    })
    return layerFound
  },

  [leafLetService.DELETE_LAYER]: function (...args) {
    const [layer, groupLayers] = [...args]
    groupLayers.removeLayer(layer)
  },

  [leafLetService.ADD_LAYER]: function (...args) {
    const [layer, groupLayers] = [...args]
    const layerExists = this[leafLetService.FIND_LAYER](...args)

    if (layerExists) {
      this[leafLetService.DELETE_LAYER](layerExists, groupLayers)
      return
    }

    let layerWithCustomProperties = {
      type: "Feature",
      properties: {
        id: layer.id,
        visible: true
      },
      geometry: JSON.parse(layer.geometry)
    }

    return geoJson(layerWithCustomProperties).addTo(groupLayers)
  },

  [leafLetService.GET_LAYERS]: function (...args) {
    const [groupLayers] = [...args]
    return groupLayers.getLayers()
  },

  [leafLetService.SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS]: function (...args) {
    const [groupLayers, app] = [...args]
    const layersIds = []

    groupLayers.eachLayer(layer => {
      layer.eachLayer(l => {
        layersIds.push(l.feature.properties.id)
      })
    })

    app.store.commit(`polygons/${SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS}`, layersIds)
  },
}

// this.$_leafLet_service(leafLetService.GET_LAYERS_IDS, this.$L.projectLayers)