<template>
<div class="page">
  <pageheader title="Mis proyectos" />
  <div class="row">
    <div class="col-xs-12 col-md-9">
      <div class="row">
        <div class="col-xs-12">
          <div class="mb-3">
            <el-button
              round
              plain
              type="primary"
              icon="el-icon-plus"
              @click="dialogFormVisible = true"
            >Nuevo</el-button>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="project in projects"
          :key="project.id" class="col-xs-12 col-md-4"
        >
          <projectcard :data="project" />
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-3">
      <el-card class="app-card-info">
        <h1>¿Qué es un proyecto?</h1>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro animi quam velit, minus consectetur sint neque ex aperiam laboriosam magnam laborum fugit beatae accusamus. Explicabo culpa laudantium eius et voluptas!</span>
      </el-card>
    </div>
  </div>
  <dialognew :visiblemodal="dialogFormVisible" />
</div>
</template>

<script>
import pageheader from '~/components/admin/page-header.vue'
import projectcard from '~/components/admin/project/card.vue'
import dialognew from '~/components/admin/project/dialog_new.vue'
export default {
  layout: 'admin',
  components: {
    pageheader,
    projectcard,
    dialognew
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
  }
}
</script>