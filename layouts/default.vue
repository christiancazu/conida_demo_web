<template>
<main>
  <the-navbar v-if="$auth.loggedIn" />

  <nuxt />

</main>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  components: {
    TheNavbar
  }
}
</script>
