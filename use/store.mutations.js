export const openModal = (state, { typeModal, component }) => Object.assign(state[typeModal], component)

export const closeModal = (state, payload) => {
  state[payload].visible = false
  state[payload].title = ' '
  state[payload].type = 'component'
  state[payload].folderPath = 'fallback'
  state[payload].name = 'Fallback'
}

export const setModalVisible = (state, { typeModal }) => (state[typeModal].visible = true)

export const setModalTitle = (state, { typeModal, dialogTitle }) => (state[typeModal].title = dialogTitle)
