<template>
<div class="sign-in">
  <el-card class="sign-in__form">
    <el-image
      :class="[
        {'logo-animation': $store.state.spinners.PROCESSING_FORM},
        ['sign-in__form__logo']
      ]"
      src="images/veox-logo.png"
      fit="fill"
    />
    <h1 class="sign-in__form__title">VEOX</h1>
    <el-form
      ref="form"
      :disabled="$store.state.spinners.PROCESSING_FORM"
      :model="form"
      :rules="rules"
      @submit.native.prevent="signIn"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="Usuario"
          prefix-icon="el-icon-user"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="Contraseña"
          prefix-icon="el-icon-lock"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="$store.state.spinners.PROCESSING_FORM"
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

import { $_notify_error } from "@/use/notifications"

import { ERRORS } from "@/config/messages"

import { required } from '@/config/form.rules'
import { SERVICES } from '@/services/services.types'

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
    async signIn () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid)
        this.$_auth_service(SERVICES.AUTH.SIGN_IN, this.form)
      else
        $_notify_error(ERRORS.INVALID_DATA)
    }
  }
}
</script>
