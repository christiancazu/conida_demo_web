<template>
<div class="page-main">

  <l-map />

</div>
</template>

<script>
import LMap from "@/components/leaflet/LMap"

export default {
  components: {
    LMap
  },

  methods: {
    logout () {
      this.$_authServiceSignOut()
    }
  }
}
</script>
