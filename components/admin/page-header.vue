<template>
<div>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    class="mb-3"
  >
    <el-breadcrumb-item :to="{ path: '/admin/' }">Inicio</el-breadcrumb-item>
    <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-page-header
    :content="title"
    class="mb-2" @back="goBack"
  />
  <hr>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['title'],
  methods: {
    goBack () {
      console.log("Regresando...")
    }
  }
}
</script>