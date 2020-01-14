<template>
<div>
  <el-divider content-position="left">Polígono</el-divider>
  <el-select
    v-model="value"
    class="full-width"
    placeholder="Elija un polígonos"
    filterable
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <el-divider content-position="left">Rango de fechas</el-divider>
  <el-date-picker
    v-model="date"
    style="width:100%"
    type="daterange"
    align="center"
    start-placeholder="Fecha inicial"
    end-placeholder="Fecha final"
    format="yyyy/MM/dd"
    value-format="yyyy-MM-dd"
    default-value="2020-01-01"
    size="large"
  />

  <el-divider content-position="left">Rango de cobertura de nubes</el-divider>
  <el-row type="flex">
    <el-col
      :xs="17" :sm="17"
    >
      <el-slider
        v-model="cloudCoverRange"
        range
        :min="0"
        :max="100"
        :step="5"
        input-size="large"
        class="pl-2"
        :format-tooltip="(val) => `${val}%`"
      />
    </el-col>
    <el-col
      class="pl-5"
      :xs="7" :sm="7"
    >
      <div>{{ `${cloudCoverRange[0]}% ~ ${cloudCoverRange[1]}%` }}</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

export default {
  // defined if mountableAsDynamicMixin is included
  mixins: [mountableAsDynamicMixin],

  data: () => ({
    dynamicTitle: 'Filtro',

    date: [],
    cloudCoverRange: [
      0, 100
    ],
    form: {
      image_id: '',
      start_date: '',
      end_date: '',
      cloud_cover: [],
      area: ''
    },
  }),

  watch: {
    date (val) {
      this.$attrs.form.start_date = val[0]
      this.$attrs.form.end_date = val[1]
    },

    cloudCoverRange (val) {
      this.$attrs.form.cloud_cover = val
    }
  }
}
</script>
