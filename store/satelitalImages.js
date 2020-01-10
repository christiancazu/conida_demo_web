import {
  SET_DATA_CONTEXT,
} from '@/store/mutations.types'

import {
  setDataContext
} from '@/use/store.mutations'


const API = '$satelitalImageAPI'

export const state = () => ({
  dataContext: []
})

export const actions = {
  async getDataContext ({ commit }, payload) {
    const data = await this[API].getSatelitalImages(payload)
    commit(SET_DATA_CONTEXT, data)
  },

}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext
}
