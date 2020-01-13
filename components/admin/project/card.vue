<template>
<div>
  <el-card
    class="card mb-3" shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <img :src="data.image || 'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'">
    <div class="content">
      <h1 class="mb-2">{{ data.name }}</h1>
      <span>{{ data.description }}</span>
      <nuxt-link
        class="btn btn-block btn-flat-primary bottom"
        :to="{ path: `/projects/${data.id}` }"
      >
        <p>---></p>
      </nuxt-link>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['data']
}
</script>

<style lang="sass" scoped>
.card
  img
    width: 100%
  .content
    min-height: 70px
    padding: 1em
    h1
      margin: 0
      color: #e91e63
      font-size: 1rem
      font-weight: bolder
    span
      margin: 0
      font-size: .8rem
      font-weight: lighter
      color: #9E9E9E
</style>
