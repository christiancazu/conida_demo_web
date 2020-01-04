<template>
<el-container>

  <el-header
    :height="navbarHeight" class="px-0"
  >
    <the-navbar />
  </el-header>

  <el-container>

    <el-aside :width="sidebarWidth">
      <the-sidebar />
    </el-aside>

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

import {
  navbarHeight,
  sidebarWidth
} from '@/assets/sass/_variables.scss'

export default {
  components: {
    TheNavbar,
    TheSidebar
  },

  data: () => ({
    // scss variables
    navbarHeight,
    sidebarWidth
  })
}
</script>
