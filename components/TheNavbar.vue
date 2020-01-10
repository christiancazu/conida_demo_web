<template>
<nav class="the-navbar">
  <el-menu
    mode="horizontal"
    :background-color="navbarBgColor"
    :text-color="navbarTextColor"
    :active-text-color="navbarTextColor"
    class="the-navbar__menu"
    @select="selectMenuItem"
  >
    <div class="the-navbar__menu-items">
      <div class="the-navbar__menu-items--left">

        <btn-collapse-sidebar />

        <el-menu-item index="home">
          <el-avatar
            size="small"
            src="/images/conida-logo.jpeg"
            shape="square"
          />
          <span class="the-navbar__menu-items--text">CONIDA</span>
        </el-menu-item>
      </div>

      <div class="the-navbar__menu-items--right">
        <el-submenu index="user">
          <template slot="title">
            <div class="pr-5">
              <el-avatar
                size="small"
                src="/images/veox-logo.png"
              />
              {{ $auth.user.username }}
            </div>
          </template>
          <el-menu-item index="logout">
            <i class="el-icon-unlock text-light" />Cerrar sesión</el-menu-item>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</nav>
</template>

<script>
import BtnCollapseSidebar from '@/components/btn/BtnCollapseSidebar'

import {
  navbarBgColor,
  navbarTextColor
} from '@/assets/sass/_variables.scss'
import { authService } from '@/services/services.types'

export default {
  components: {
    BtnCollapseSidebar
  },

  data () {
    return {
      // scss variables
      navbarBgColor,
      navbarTextColor
    }
  },

  methods: {
    selectMenuItem (key) {
      if (key === 'logout') {
        this.$_auth_service(authService.SIGN_OUT)
      }
    }
  }
}
</script>
