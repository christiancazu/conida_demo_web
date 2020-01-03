<template>
<h1>
  {{ appName }}
</h1>
</template>

<script>
export default {
  data: () => ({
    appName: process.env.APP_NAME
  })
}
</script>
