<template>
<div>
  <base-form @apply-after-submit-form="applyAfterSubmitForm">
    <el-form-item
      label="Nombre del proyecto"
      prop="name"
    >
      <el-input
        v-model="form.name"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item
      label="Descripción"
      prop="description"
    >
      <el-input
        v-model="form.description"
        type="textarea"
      />
    </el-form-item>
  </base-form>
</div>
</template>
<script>
import BaseForm from "@/components/base/BaseForm"
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"
import { required } from "@/config/form.rules"

export default {
  components: {
    BaseForm
  },
  mixins: [mountableAsDynamicMixin],
  data () {
    return {
      dynamicTitle: 'Crear proyecto',
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: required('el', 'nombre'),
        description: required('la', 'descripción')
      },
      submit: {
        storeName: 'projects',
        storeAction: 'create',
      }
    }
  },
  methods: {
    applyAfterSubmitForm () {
      this.$store.dispatch('projects/getDataContext')
    }
  },

}
</script>
