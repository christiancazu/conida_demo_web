<template>
<div>
  <el-card
    class="card mb-3"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <nuxt-link :to="{ path: `/projects/${data.id}` }">
      <img :src="data.image || 'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'">
      <div class="content">
        <h5 class="text-uppercase">{{ data.name }}</h5>
        <p>{{ data.description }}</p>
      </div>
    </nuxt-link>
    <div class="el-card__footer right">

      <el-tooltip
        content="Editar"
        class="item"
        effect="dark"
        placement="top"
      >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-edit"
          circle
          @click="$_dialogDynamicMixin_dialogOpen('editProject')"
        />
      </el-tooltip>
      <el-tooltip
        content="Compartir"
        class="item"
        effect="dark"
        placement="top"
      >
        <el-button
          type="success"
          size="mini"
          icon="el-icon-share"
          circle
        />
      </el-tooltip>
      <el-tooltip
        content="Eliminar"
        class="item"
        effect="dark"
        placement="top"
      >
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          circle
          @click="openConfirmDelete(data)"
        />
      </el-tooltip>
    </div>
  </el-card>
  <dialog-dynamic
    ref="dialogDynamic"
    :component="dialogDynamic[dialogDynamicMixin_componentSelected]"
    @dialog-close="$_dialogDynamicMixin_dialogClose"
  />
</div>
</template>

<script>
import dialogDynamicMixin from "@/mixins/dialogDynamic.mixin"

export default {

  mixins: [dialogDynamicMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  data () {
    return {
      dialogDynamic: {
        editProject: {
          type: 'component',
          path: 'projects/EditProject'
        }
      }
    }
  },
  methods: {
    openConfirmDelete () {
      this.$confirm('¿ Esta seguro de eliminar el proyecto ?', 'Eliminar proyecto', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'error'
      }).then(() => {
        // deleted
      }).catch(() => {
        //error al eliminar
      })
    }
  },
}
</script>

<style lang="sass" scoped>
.card
  img
    width: 100%
  .content
    padding: 1em
</style>
