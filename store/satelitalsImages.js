import {
  SET_DATA_CONTEXT
} from '@/store/mutations.types'

import {
  setDataContext
} from '@/use/store.mutations'

const API = '$satelitalImageAPI'

export const state = () => ({
  dataContext: []
})

export const actions = {
  // getDataContext: getDataContext(API),

  search: async function ({ commit }, form) {
    const data = await this[API].search(form)
    commit(SET_DATA_CONTEXT, data)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext
}
