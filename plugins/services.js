import { signIn, signOut } from '@/services/auth.service'
import { request } from '@/services/request.service'

/**
 * INJECTING NUXT AUTH SERVICES
 */
export default ({ app }, inject) => {
  inject('_authServiceSignIn', data => signIn(app, data))

  inject('_authServiceSignOut', () => signOut(app))

  inject('_requestService', (callback, spinnerType) => request(app, callback, spinnerType))
}
