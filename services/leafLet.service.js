/* eslint-disable array-bracket-newline */
/* eslint-disable array-element-newline */
import { SERVICES } from './services.types'

import { geoJson } from "leaflet"

import { SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS } from '@/store/mutations.types'

export default {
  [SERVICES.LEAFLET.FIND_LAYER]: function (...args) {
    const [{ id }, groupLayers] = [...args]
    let layerFound = null

    groupLayers.eachLayer(layer => {
      layer.eachLayer(l => {
        if (l.feature.properties.id === id) layerFound = layer
      })
    })
    return layerFound
  },

  [SERVICES.LEAFLET.DELETE_LAYER]: function (...args) {
    const [layer, groupLayers] = [...args]
    groupLayers.removeLayer(layer)
  },

  [SERVICES.LEAFLET.ADD_LAYER]: function (...args) {
    const [layer, groupLayers] = [...args]
    const layerExists = this[SERVICES.LEAFLET.FIND_LAYER](...args)

    if (layerExists) {
      this[SERVICES.LEAFLET.DELETE_LAYER](layerExists, groupLayers)
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

  [SERVICES.LEAFLET.GET_LAYERS]: function (...args) {
    const [groupLayers] = [...args]
    return groupLayers.getLayers()
  },

  /**
   *
   * @param  {...any} args
   */
  [SERVICES.LEAFLET.FETCH_PROJECT_LAYERS]: async function (...args) {
    const [groupLayers, app] = [...args]
    const layersIds = []

    try {
      await app.$_request_service(app.store.dispatch('polygons/getDataContext'), 'loadingDrawer')

      groupLayers.eachLayer(layer => {
        layer.eachLayer(l => {
          layersIds.push(l.feature.properties.id)
        })
      })

      app.store.commit(`polygons/${SET_ACTIVE_VISIBLE_POLYGONS_BUTTONS}`, layersIds)
    } catch (error) {
    }
  },
}
