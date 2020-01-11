import { SET_DATA_CONTEXT } from '@/store/mutations.types'
import { setDataContext } from '@/use/store.mutations'
import {
  getDataContext,
  create,
  deleteItemContext
} from '@/use/store.actions'

const API = '$projectAPI'

export const state = () => ({
  dataContext: [],
})

export const actions = {
  getDataContext: getDataContext(API),

  create: create(API),

  deleteItemContext: deleteItemContext(API)
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext
}
