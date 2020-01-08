<template>
<el-card
  shadow="always"
  class="card-spectral-index"
>
  <div class="content-spectral-index">
    <el-image
      style="width: 70px; height: 70px"
      :src="spectralIndex.image.result"
      fit="cover"
      lazy
    >
      <div
        slot="error"
        class="image-error-slot"
      >
        <i class="el-icon-picture-outline" />
      </div>
    </el-image>
    <div class="detail">
      <h5 class="title">{{ spectralIndex.title }}</h5>
      <p>{{ spectralIndex.description }}</p>
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

  props: {
    spectralIndex: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isVisible: true
  })
}
</script>
