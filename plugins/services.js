import { signIn, signOut } from '@/services/auth.service'

/**
 * INJECTING NUXT AUTH SERVICES
 */
export default ({ app }, inject) => {
  inject('_authServiceSignIn', data => signIn(app, data))

  inject('_authServiceSignOut', () => signOut(app))
}
