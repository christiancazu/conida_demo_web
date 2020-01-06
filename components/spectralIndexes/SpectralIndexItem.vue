<template>
<el-main>
  <el-card>
    <div class="card-spectral-index">
      <el-avatar
        class="image"
        :size="70"
        src="https://apps.sentinel-hub.com/sentinel-playground/previews/b0eec84c-1-NATURAL-COLOR.jpeg"
      />
      <div class="content">
        <h5>INDICE NDVI</h5>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  </el-card>
</el-main>
</template>

<script>
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

export default {
  mixins: [mountableAsDynamicMixin],

  data: () => ({
    // defined if mountableAsDynamicMixin is included
    dynamicTitle: 'TEST title'
  })
}
</script>
