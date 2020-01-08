import {
  SET_DATA_CONTEXT,
  ADD_ITEM_CONTEXT
} from '@/store/mutations.types'

import {
  setDataContext
} from '@/use/store.mutations'

import {
  getDataContext,
  create
} from '@/use/store.actions'

const API = '$polygonAPI'

export const state = () => ({
  dataContext: []
})

export const actions = {
  getDataContext: getDataContext(API),

  create: create(API)
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [ADD_ITEM_CONTEXT]: (state, payload) => {
    state.dataContext.push(payload)
  }
}