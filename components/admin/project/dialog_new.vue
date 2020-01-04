<template>
<div>
  <el-dialog
    title="Nuevo proyecto"
    :visible.sync="visiblemodal"
  >
    <el-steps
      :active="active"
      finish-status="success" align-center class="mb-3"
    >
      <el-step title="Crear proyecto" />
      <el-step title="Confirmación" />
    </el-steps>
    <el-form
      :model="form"
      size="small"
    >
      <el-form-item
        label="Nombre:"
        :label-width="'150px'"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Descripción:"
        :label-width="'150px'"
      >
        <el-input
          v-model="form.description"
          type="textarea"
        />
      </el-form-item>
      <div class="text-right">
        <el-button
          plain
          circle
          type="success"
          icon="el-icon-arrow-right"
          @click="next"
        />
      </div>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['visiblemodal'],
  data () {
    return {
      active: 0,
      form: {},
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>

<style>

</style>