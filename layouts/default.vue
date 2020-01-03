<template>
<el-container>

  <el-header
    height="56px" class="px-0"
  >
    <the-navbar />
  </el-header>

  <el-container>

    <the-sidebar />

    <el-container>

      <el-main class="pa-0">

        <nuxt />

      </el-main>

    </el-container>

  </el-container>

</el-container>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'

export default {
  components: {
    TheNavbar,
    TheSidebar
  }
}
</script>
