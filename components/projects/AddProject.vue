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
      dynamicTitle: 'Crear proyecto',
      form: {},
      imageUrl: ''
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG!')
      }
      if (!isLt2M) {
        this.$message.error('La imagen excede los 2MB!')
      }
      return isJPG && isLt2M
    }
  },

}
</script>
