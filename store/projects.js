import { SET_DATA_CONTEXT, SET_ITEM_CONTEXT } from '@/store/mutations.types'
import { setDataContext, setItemContext } from '@/use/store.mutations'
import {
  getDataContext,
  create,
  deleteItemContext
} from '@/use/store.actions'

const API = '$projectAPI'

export const state = () => ({
  dataContext: [],
  setItemContext: null
})

export const actions = {
  getDataContext: getDataContext(API),

  async getItemContext ({ commit }, id) {
    const data = await this[API].getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  create: create(API),

  deleteItemContext: deleteItemContext(API)
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,
  [SET_ITEM_CONTEXT]: setItemContext
}
