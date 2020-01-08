<template>
<div>
  <base-form @apply-after-submit-form="applyAfterSubmitForm">
    <el-form-item
      label="Nombre"
      prop="name"
    >
      <el-input
        v-model="form.name"
        placeholder="nombre del polígono"
        auto-complete="off"
        clearable
      />
    </el-form-item>
  </base-form>
</div>
</template>

<script>
import BaseForm from "@/components/base/BaseForm"

import mountableAsDynamicMixin from '@/mixins/mountableAsDynamic.mixin'

import { required } from "@/config/form.rules"

import { ADD_ITEM_CONTEXT } from '@/store/mutations.types'

export default {
  components: {
    BaseForm
  },

  mixins: [mountableAsDynamicMixin],

  props: {
    properties: {
      type: Object, default: () => ({})
    }
  },

  data: () => ({
    // defined if mountableAsDynamicMixin is included
    dynamicTitle: 'Registrar Polígono',

    form: {
      name: '',
      geometry: '',
      description: ''
    },
    rules: {
      name: required('el', 'nombre')
    },
    submit: {
      storeName: 'polygons',
      storeAction: 'create',
      notifyType: 'CREATED'
    }
  }),

  mounted () {
    this.setGeometryAsGeoJSON()
  },

  methods: {
    setGeometryAsGeoJSON () {
      this.form.geometry = JSON.stringify(this.properties.toGeoJSON())
    },

    /**
     * setting current polygon layer as dataContext state of polygons store
     */
    applyAfterSubmitForm () {
      this.$store.commit(`${this.submit.storeName}/${ADD_ITEM_CONTEXT}`, {
        name: this.form.name,
        geometry: this.properties.toGeoJSON(),
        description: this.form.description
      })
    }
  }
}
</script>
