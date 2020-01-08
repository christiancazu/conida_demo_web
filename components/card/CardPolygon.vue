<template>
<section>
  <el-card
    v-for="(polygon, index) in polygons" :key="index"
    shadow="hover"
    class="card-polygon"
  >
    <div class="el-card__body__details">
      {{ polygon.name }}
    </div>
    <div class="el-card__body__actions">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-view"
        circle
        @click="$emit('view-polygon', polygon)"
      />
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-delete"
        circle
      />
    </div>
  </el-card>
</section>
</template>

<script>
export default {
  props: {
    polygons: {
      type: Array,
      default: () => []
    },
  }
}
</script>
