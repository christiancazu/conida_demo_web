<template>
<section>
  <el-card
    v-for="(satelitalImage, index) in satelitalImages" :key="index"
    shadow="hover"
    class="card-satelital-images"
  >
    <el-row type="flex">
      <el-col
        :xs="20" :md="20"
      >
        <div class="el-card__body__details">
          <div class="el-card__body__details--image">
            <el-image
              style="width: 50px"
              :src="satelitalImage.image"
              fit="cover"
            />
          </div>
          <div class="el-card__body__details--text">
            <div style="font-weight: 800">
              {{ satelitalImage.name }}
            </div>
            <div>
              <i class="el-icon-date" /> {{ satelitalImage.date | filterFormat }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="4" :md="4"
      >
        <div
          class="el-card__body__actions"
        >
          <el-tooltip
            content="Ver en mapa"
            class="item" effect="dark" placement="top"
          >
            <el-button
              ref="viewBtn"
              type="primary"
              size="mini"
              icon="el-icon-view"
              circle
              :plain="!satelitalImage.visible"
              @click="viewLayer($event, satelitalImage)"
            />
          </el-tooltip>

          <el-tooltip
            content="Agregar a mi proyecto"
            class="item" effect="dark" placement="top"
          >
            <el-popconfirm
              confirm-button-text="Si"
              cancel-button-text=" No "
              icon="el-icon-info"
              icon-color="teal"
              title="Está seguro de agregar esta imagen a su proyecto?"
              @onConfirm="addToProject(satelitalImage)"
            >

              <el-button
                slot="reference"
                type="success"
                size="mini"
                icon="el-icon-circle-plus-outline"
                circle
              />
            </el-popconfirm>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <h4
    v-if="!satelitalImages"
    class="text-center"
  >No se encontraron imágenes
  </h4>
</section>
</template>

<script>
import objectToFormData from "@/use/objectToFormData"

import { SERVICES } from '@/services/services.types'
import { SPINNERS } from '../../store/mutations.types'
import { $_notify_success } from '../../use/notifications'
import { SUCCESS } from '../../config/messages'

export default {
  filters: {
    filterFormat (val) {
      return val.split('.')[0]
    }
  },

  props: {
    satelitalImages: {
      type: Array, default: () => ([])
    }
  },

  methods: {
    viewLayer (e, satelitalImageLayer) {
      // prevent focus on btn
      e.currentTarget.blur()
      this.$_leafLet_service(SERVICES.LEAFLET.VIEW_LAYER, satelitalImageLayer, this.$L.WMSSatelitalLayers, 'satelitalImages', 'satelitalImagesFiltered')
    },

    async addToProject (satelitalImageLayer) {
      const formData = objectToFormData({
        project: this.$store.state.projects.itemContext.id,
        satelital_image: satelitalImageLayer.id
      })
      try {
        await this.$_request_service(this.$store.dispatch(`projects/addToProject`, formData), SPINNERS.LOADING_DRAWER)
        $_notify_success(SUCCESS.CREATED)
      } catch  {
      }
    }
  }
}
</script>
