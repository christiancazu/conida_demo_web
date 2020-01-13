<template>
<div>
  <el-form
    :model="form"
    label-position="top"
  >
    <el-form-item
      label="Nombre del proyecto"
    >
      <el-input
        v-model="form.name"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item
      label="Descripción"
    >
      <el-input
        v-model="form.description"
        type="textarea"
      />
    </el-form-item>
    <div class="text-right">
      <el-button
        :loading="$store.state.spinners.processingForm"
        type="primary"
        native-type="submit"
      >
        Guardar
      </el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

export default {
  mixins: [mountableAsDynamicMixin],
  data () {
    return {
      dynamicTitle: 'Editar proyecto',
      form: {},
      imageUrl: ''
    }
  },
  methods: {
  },

}
</script>
