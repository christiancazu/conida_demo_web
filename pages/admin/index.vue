<template>
<div>
  <el-row>
    <el-col
      :sm="12"
      :md="18"
      :lg="18"
    >
      <div class="pa-2 header-projects">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
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
  <dialognew :visiblemodal="dialogFormVisible" />
</div>
</template>

<script>
import dialognew from '~/components/admin/project/dialog_new.vue'
import projectcard from '~/components/admin/project/card.vue'
import { mapState } from 'vuex'

export default {
  layout: 'admin',
  components: {
    dialognew,
    projectcard
  },
  data () {
    return {
      dialogFormVisible: false,
      projects: [
        {
          id: 1,
          name: 'Arequipa',
          description: 'Proyecto de Arequipa.',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'
        },
        {
          id: 2,
          name: 'Proyecto de ejemplo',
          description: 'Este es un proyecto de ejemplo para realizar pruebas.',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'
        },
        {
          id: 3,
          name: 'Proyecto de ejemplo 2',
          description: 'Este es un proyecto de ejemplo para realizar pruebas.',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'
        },
        {
          id: 4,
          name: 'Proyecto de ejemplo 3',
          description: 'Este es un proyecto de ejemplo para realizar pruebas.',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Imagen_Satelital_de_Cucuta.jpg'
        }
      ]
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
