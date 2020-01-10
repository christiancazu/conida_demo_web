import {
  SET_DATA_CONTEXT,
  SET_SELECTED_SATELITAL_INDEX
} from '@/store/mutations.types'

import {
  setDataContext
} from '@/use/store.mutations'

const API = '$satelitalIndexAPI'

export const state = () => ({
  dataContext: [],
  selectedSatelitalIndex: []
})

export const actions = {
  async getDataContext ({ commit }, payload) {
    const data = await this[API].get(payload)
    commit(SET_DATA_CONTEXT, data)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,
  [SET_SELECTED_SATELITAL_INDEX]: (state, payload) => (state.selectedSatelitalIndex = payload)
}
