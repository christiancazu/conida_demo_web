<template>
<div class="login-page">

  <sign-in>

    <template slot="second-button">
      <el-button
        :disabled="$store.state.spinners.processingForm"
        class="sign-in__form__btn"
        type="primary"
        plain
        @click="openModal('signUpComponent')"
      >
        Registrarse
      </el-button>
      <el-button
        :disabled="$store.state.spinners.processingForm"
        class="sign-in__form__btn"
        type="primary"
        plain
        @click="openModal('testComponent')"
      >
        test
      </el-button>
    </template>

  </sign-in>

  <!-- <base-modal
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
  </base-modal> -->

  <dialog-dynamic
    v-if="selectedComponent.visible"
    :component="modalMain[selectedComponent.name]"
    @close-modal="closeModal"
  />

</div>
</template>

<script>
import SignIn from '@/components/sign/SignIn'

import dynamicModalSetupMixin from '@/mixins/dynamicModalSetup.mixin'

import DialogDynamic from '@/components/dialog/DialogDynamic'

export default {
  layout: 'login',

  components: {
    SignIn,
    DialogDynamic
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
      },
      testComponent: {
        type: 'component',
        folderPath: 'dialog',
        name: 'Test'
      }
    },
    selectedComponent: {
      name: '',
      visible: false
    }
  }),

  methods: {
    openModal (componentName) {
      this.selectedComponent.name = componentName
      this.selectedComponent.visible = true
      // console.warn(this.modalMain[this.selectedComponent]);
      // this.$openModal('signUpComponent')
    },

    closeModal () {
      this.selectedComponent.visible = false
    }
  }
}
</script>
