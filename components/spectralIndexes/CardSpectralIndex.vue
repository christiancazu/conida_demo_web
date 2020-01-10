<template>
<div>
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
            v-if="!spectralIndex.isVisible"
            type="text"
            class="actions__btn"
            @click="viewInMapSpectralIndex(spectralIndex)"
          >
            <i class="material-icons">visibility</i>
          </el-button>
          <el-button
            v-else
            type="text"
            class="actions__btn"
            @click="closeInMapSpectralIndex()"
          >
            <i class="material-icons">visibility_off</i>
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
  <el-dialog
    :title="spectralIndex.title"
    :visible.sync="dialogFormVisible"
  >
    <el-image
      style="width: 100%; height: 75vh"
      :src="spectralIndex.image.result"
      fit="contain"
    />
    <!-- <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">Cancelar</el-button>
      <el-button
        type="primary"
        @click="dialogFormVisible = false"
      >Confirm</el-button>
    </span> -->
  </el-dialog>
</div>

</template>

<script>
import { SET_SELECTED_SATELITAL_INDEX, SET_SIDE_BY_SIDE_VISIBLE, SET_LAYER_SATELITAL_INDEX } from '@/store/mutations.types'
import { mapState } from 'vuex'
export default {

  props: {
    spectralIndex: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isVisible: false,
    dialogFormVisible: false
  }),

  computed: {
    ...mapState({
      sideBySideVisible: (state) => state.satelitalIndexes.sideBySideVisible
    }),
  },

  methods: {
    viewInMapSpectralIndex (item) {
      // this.closeInMapSpectralIndex()
      this.$store.commit(`satelitalIndexes/${SET_SIDE_BY_SIDE_VISIBLE}`, true)
      const layerBase = {
        geometry: item.geometry,
        baseUrl: item.service,
        layer: item.layer.base,
        typeImage: 'layerBase',
      }
      const layerResult = {
        baseUrl: item.service,
        layer: item.layer.result,
        typeImage: 'layerResult',
      }

      this.$store.commit(`satelitalIndexes/${SET_SELECTED_SATELITAL_INDEX}`, item)
      this.$store.commit(`satelitalIndexes/${SET_LAYER_SATELITAL_INDEX}`, [
        layerBase, layerResult
      ])
    },
    closeInMapSpectralIndex () {
      this.$store.commit(`satelitalIndexes/${SET_SIDE_BY_SIDE_VISIBLE}`, false)
    },
    viewFullscreenSpectralIndex (item) {
      this.dialogFormVisible = true
      console.log(item)
    },
  },
}
</script>
