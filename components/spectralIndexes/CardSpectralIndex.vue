<template>
<el-card
  shadow="always"
  class="card-spectral-index"
>
  <div class="content-spectral-index">
    <el-image
      style="width: 70px; height: 70px"
      src="https://apps.sentinel-hub.com/sentinel-playground/previews/b0eec84c-1-NATURAL-COLOR.jpeg"
      fit="cover"
    />
    <div class="detail">
      <h5 class="title">INDICE NDVI</h5>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div class="actions">
        <el-button
          type="text"
          class="actions__btn"
          @click="isVisible = !isVisible"
        >
          <i
            v-if="isVisible"
            class="material-icons"
          >visibility</i>
          <i
            v-if="!isVisible"
            class="material-icons"
          >visibility_off</i>
        </el-button>
        <el-button
          type="text"
          class="actions__btn"
        >
          <i class="el-icon-full-screen" />
        </el-button>
      </div>
    </div>
  </div>
</el-card>
</template>

<script>

export default {

  data: () => ({
    isVisible: true
  }),

  methods: {
  },
}
</script>
