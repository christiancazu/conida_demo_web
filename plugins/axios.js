import { $_notify_error } from "@/use/notifications"

import { ERRORS } from '@/config/messages'

export default async ({ $axios }) => {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    // handle message error from server or default error message
    let errorMessage = ''

    switch (code) {
    case 'ECONNABORTED': // time expired for request
      errorMessage = ERRORS.ERROR_TRY_LATER
      break
    case 401:
      errorMessage = ERRORS.UNAUTHORIZED
      // store.commit('auth/SET', { key: 'user', value: null })
      // redirect('/login')
      break
    case 404:
      errorMessage = ERRORS.ROUTE_NOT_FOUND
      break
    case 422:
      errorMessage = ERRORS.INVALID_DATA
      break
    default:
      errorMessage =
        typeof error.response !== 'undefined'
          ? error.response.data.message || error.response.data
          : ERRORS.ERROR_TRY_LATER
    }
    $_notify_error(errorMessage)
  })
}
