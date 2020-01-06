<template>
<div>
  <el-card
    class="card mb-3" shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <img :src="data.image">
    <div class="content">
      <h1 class="mb-2">{{ data.name }}</h1>
      <span>{{ data.description }}</span>
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
    min-height: 100px
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