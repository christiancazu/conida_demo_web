import {
  SET_DATA_CONTEXT,
  SET_SATELITAL_IMAGES_FILTERED,
  TOGGLE_VISIBLE_LAYER
} from '@/store/mutations.types'

const API = '$satelitalImageAPI'

export const state = () => ({
  dataContext: [],
  satelitalImagesFiltered: []
})

export const actions = {
  getDataContext: async function ({ commit }, project) {
    const data = await this[API].getSatelitalImages({project})
    commit(SET_DATA_CONTEXT, data)
  },

  search: async function ({ commit }, form) {
    const data = await this[API].search(form)
    commit(SET_SATELITAL_IMAGES_FILTERED, data)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => {
    state.dataContext = []

    if (payload.length) {
      payload.forEach(item => {
        state.dataContext.push({
          ...item,
          visible: false
        })
      })
    }
  },

  [SET_SATELITAL_IMAGES_FILTERED]: (state, payload) => {
    state.satelitalImagesFiltered = []

    if (payload.length) {
      payload.forEach(item => {
        state.satelitalImagesFiltered.push({
          ...item,
          visible: false
        })
      })
    }
  },

  [TOGGLE_VISIBLE_LAYER]: (state, payload) => {
    const layerIndex = state[payload.stateContext].findIndex(sif => sif.id === payload.layer.id)

    state[payload.stateContext][layerIndex].visible = !state[payload.stateContext][layerIndex].visible
  }
}
