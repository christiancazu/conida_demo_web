<template>
<div>
  <el-row>
    <el-col
      :sm="12"
      :md="7"
      :lg="7"
    >
      <div class="pa-2 header-projects">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="$_dialogDynamicMixin_dialogOpen('addProject')"
        >CREAR PROYECTO</el-button>
        <el-input
          class="pl-3"
          placeholder="Buscar..."
          suffix-icon="el-icon-search"
        />
      </div>
    </el-col>
  </el-row>
  <el-row class="pt-3">
    <el-col
      :sm="12"
      :md="18"
      :lg="18"
    >
      <div class="projects">
        <div
          v-for="project in projects"
          :key="project.id"
          class="card-projects px-2"
        >
          <projectcard :data="project" />
        </div>
      </div>
    </el-col>
    <el-col
      :sm="12"
      :md="6"
      :lg="6"
    >
      <el-card class="app-card-info">
        <h1>¿Qué es un proyecto?</h1>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro animi quam velit, minus consectetur sint neque ex aperiam laboriosam magnam laborum fugit beatae accusamus. Explicabo culpa laudantium eius et voluptas!</span>
      </el-card>
    </el-col>
  </el-row>

  <dialog-dynamic
    ref="dialogDynamic"
    :component="dialogDynamic[dialogDynamicMixin_componentSelected]"
    @dialog-close="$_dialogDynamicMixin_dialogClose"
  />
</div>
</template>

<script>
import dialogDynamicMixin from "@/mixins/dialogDynamic.mixin"
import projectcard from '~/components/projects/card.vue'
import { mapState } from 'vuex'

export default {
  layout: 'admin',
  components: {
    projectcard
  },
  mixins: [dialogDynamicMixin],

  data () {
    return {
      dialogFormVisible: false,
      dialogDynamic: {
        addProject: {
          type: 'component',
          path: 'projects/AddProject'
        }
      }
    }
  },
  computed: {
    ...mapState({
      projects: (state) => state.projects.dataContext
    })
  },

  created () {
    this.$store.dispatch('projects/getDataContext')
  },
}
</script>

<style>
</style>
