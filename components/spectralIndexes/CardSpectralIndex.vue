<template>
<el-card
  shadow="hover"
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
      <div class="is-visible actions">
        <el-button
          type="text"
          class="actions__btn"
          @click="viewInMapSpectralIndex(spectralIndex)"
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
          @click="viewFullscreenSpectralIndex(spectralIndex)"
        >
          <i class="el-icon-full-screen" />
        </el-button>
      </div>
    </div>
  </div>
</el-card>
</template>

<script>
import { SET_SELECTED_SATELITAL_INDEX } from '@/store/mutations.types'
export default {

  props: {
    spectralIndex: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isVisible: false
  }),

  methods: {
    viewInMapSpectralIndex (item) {
      this.isVisible = !this.isVisible
      const layerBase = {
        geometry: item.geometry,
        baseUrl: item.service,
        layer: item.layer.base,
        typeImage: 'layerBase',
        visible: this.isVisible
      }
      const layerResult = {
        baseUrl: item.service,
        layer: item.layer.result,
        typeImage: 'layerResult',
        visible: this.isVisible
      }

      this.$store.commit(`satelitalIndexes/${SET_SELECTED_SATELITAL_INDEX}`, [
        layerBase,
        layerResult
      ])


    },
    viewFullscreenSpectralIndex (item) {
      console.log(item)


    },
  },
}
</script>
