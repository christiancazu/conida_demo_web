import {
  SET_DATA_CONTEXT
} from '@/store/mutations.types'

// PAGEACTIONS
export const getDataContext = api => async function ({ commit }) {
  const data = await this[api].get()
  commit(SET_DATA_CONTEXT, data)
}

export const create = api => async function ({}, form) {
  await this[api].create(form)
}
