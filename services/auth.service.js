/**
 ** NUXT AUTH SERVICES
 */

import { $_notify_success } from '@/use/notifications'

import { AUTH_STRATEGY } from '@/config/constants'

import { SESSION } from '@/config/messages'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '~/store/mutations.types'

export const signIn = async (app, data) => {
  try {
    app.store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

    await app.$auth.loginWith(AUTH_STRATEGY, { data })

    $_notify_success('Bienvenido al geoportal', SESSION.STARTED)
  } catch (error) {
  }
  app.store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
}

export const signOut = async app => {
  try {
    app.store.commit(`spinners/${ENABLE_SPINNER}`, 'loadingPage')

    await app.$auth.logout()

    $_notify_success('', SESSION.ENDED)
  } catch (error) {
    app.$auth.setToken(AUTH_STRATEGY, null)
  }
  app.store.commit(`spinners/${DISABLE_SPINNER}`, 'loadingPage')
}
