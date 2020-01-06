<template>
<div class="page-login">

  <sign-in>

    <template slot="second-button">
      <el-button
        :disabled="$store.state.spinners.processingForm"
        class="sign-in__form__btn"
        type="primary"
        plain
        @click="$_dialogDynamicMixin_dialogOpen('signUp')"
      >
        Registrarse
      </el-button>
    </template>

  </sign-in>

  <dialog-dynamic
    ref="dialogDynamic"
    :component="dialogDynamic[dialogDynamicMixin_componentSelected]"
    @dialog-close="$_dialogDynamicMixin_dialogClose"
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
