<template>
<div class="login-page">

  <sign-in>

    <template slot="second-button">
      <el-button
        :disabled="$store.state.spinners.processingForm"
        class="sign-in__form__btn"
        type="primary"
        plain
        @click="signUp"
      >
        Registrarse
      </el-button>
    </template>

  </sign-in>

  <base-modal
    :modal="$store.state[storeBase.name].modalMain"
    modal-type="modalMain"
  >
    <component
      :is="$dynamicComponent"
      :store-mounted="{
        name: storeBase.name,
        typeModal: 'modalMain'
      }"
    />
  </base-modal>

</div>
</template>

<script>
import SignIn from '@/components/sign/SignIn'

import dynamicModalSetupMixin from '@/mixins/dynamicModalSetup.mixin'

export default {
  components: {
    SignIn
  },

  mixins: [dynamicModalSetupMixin],

  data: () => ({
    storeBase: {
      name: 'users'
    },
    modalMain: { // main modal settings
      signUpComponent: {
        type: 'component',
        folderPath: 'sign',
        name: 'SignUp'
      }
    }
  }),

  methods: {
    signUp () {
      this.$openModal('signUpComponent')
    }
  }
}
</script>
