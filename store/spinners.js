import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from './mutations.types'

export const state = () => ({
  processingForm: false,
  loadingDrawer: false,
  loadingPage: false
})

export const mutations = {
  [ENABLE_SPINNER]: (state, payload) => (state[payload] = true),

  [DISABLE_SPINNER]: (state, payload) => (state[payload] = false)
}
