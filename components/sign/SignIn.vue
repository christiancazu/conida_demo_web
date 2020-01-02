<template>
<div class="sign-in">
  <el-card class="sign-in__form">
    <el-image
      class="sign-in__form__logo"
      src="/images/veox-logo.png"
      fit="fill"
    />
    <h1 class="sign-in__form__title">VEOX</h1>
    <el-form
      ref="form"
      :disabled="$store.state.spinners.processingForm"
      :model="form"
      :rules="rules"
      @submit.native.prevent="signIn"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="Usuario"
          prefix-icon="el-icon-user"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="Contraseña"
          prefix-icon="el-icon-lock"
          type="password"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="$store.state.spinners.processingForm"
          class="sign-in__form__btn"
          type="primary"
          native-type="submit"
        >
          Iniciar sesión
        </el-button>
      </el-form-item>
      <el-form-item>

        <slot name="second-button" />

      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import { required } from '@/config/form.rules'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: required('el', 'usuario'),
        password: required('la', 'contraseña')
      }
    }
  },

  methods: {
    signIn () {
      this.$_authServiceSignIn(this.form)
    }
  }
}
</script>
