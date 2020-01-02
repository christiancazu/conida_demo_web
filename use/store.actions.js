import {
  OPEN_MODAL,
  SET_MODAL_VISIBLE
} from '@/store/mutations.types'

// modal
export const setDynamicModal = ({ commit }, payload) => {
  commit(OPEN_MODAL, payload)
  setTimeout(() => commit(SET_MODAL_VISIBLE, payload), 250)
}