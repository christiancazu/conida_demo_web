<template>
<div>
  <el-menu
    :default-active="'/admin/'"
    background-color="#1b3059"
    active-text-color="#00bcd4"
    text-color="#fff"
    style="height:100%"
    router
  >
    <el-menu-item index="/admin/">
      <i class="fas fa-tachometer-alt" />Inicio
    </el-menu-item>
    <el-menu-item index="/admin/projects">
      <i class="fas fa-building" />Mis proyectos
    </el-menu-item>
    <el-menu-item index="/admin/settings">
      <i class="fas fa-building" />Configuración
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.el-menu-item
  i
    margin-bottom: 3px
    padding-right: 1em
</style>