<template>
<el-container>
  <el-aside
    width="300px"
    :class="{ 'app-aside': true}"
  >
    <sidebar />
  </el-aside>
  <el-container>
    <el-header />
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import sidebar from '~/components/admin/sidebar.vue'
export default {
  components: {
    sidebar
  }
}
</script>