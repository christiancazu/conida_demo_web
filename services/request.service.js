/**
 ** REQUEST SERVICES
 */
import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '~/store/mutations.types'

export const request = async (app, callback, spinnerType = null) => {
  try {
    if (spinnerType) app.store.commit(`spinners/${ENABLE_SPINNER}`, spinnerType)

    await callback
  }
  catch (error) {
  }
  finally {
    if (spinnerType) app.store.commit(`spinners/${DISABLE_SPINNER}`, spinnerType)
  }
}
