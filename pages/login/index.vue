<template>
<div class="page-login">

  <sign-in>

    <template slot="second-button">
      <el-button
        :disabled="$store.state.spinners.processingForm"
        class="sign-in__form__btn"
        type="primary"
        plain
        @click="$_dialogDynamicMixin_openDialog('signUp')"
      >
        Registrarse
      </el-button>
    </template>

  </sign-in>

  <dialog-dynamic
    v-if="dialogDynamicMixin_componentSelected.visible"
    :component="dialogDynamic[dialogDynamicMixin_componentSelected.name]"
    @close-modal="$_dialogDynamicMixin_closeDialog"
  />

</div>
</template>

<script>
import SignIn from '@/components/sign/SignIn'

import dialogDynamicMixin from "@/mixins/dialogDynamic.mixin"

export default {
  layout: 'login',

  components: {
    SignIn
  },

  mixins: [dialogDynamicMixin],

  data: () => ({
    dialogDynamic: {
      signUp: {
        type: 'component',
        path: 'sign/SignUp'
      }
    }
  })
}
</script>
