<template>
<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; margin-top: 56px">
  <h1>
    {{ appName }}
  </h1>
</div>
</template>

<script>
export default {
  data: () => ({
    appName: process.env.APP_NAME
  }),

  methods: {
    logout () {
      this.$_authServiceSignOut()
    }
  }
}
</script>
