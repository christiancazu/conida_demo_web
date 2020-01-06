<template>
<el-main>
  <!-- selected image -->
  <el-autocomplete
    v-model="searchImage"
    :fetch-suggestions="querySearch"
    placeholder="Selecciona una imagen del proyecto"
    clearable
    @select="selectedImage"
  >
    <template slot-scope="{ item }">
      <div class="scope-item">
        <el-avatar
          class="item-image"
          shape="square"
          size="medium"
          src="https://apps.sentinel-hub.com/sentinel-playground/previews/b0eec84c-1-NATURAL-COLOR.jpeg"
        />
        <span class="item-content">
          {{ item.value }}
        </span>
      </div>
    </template>
  </el-autocomplete>

  <card-spectral-index />

</el-main>
</template>

<script>
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"
import CardSpectralIndex from '@/components/spectralIndexes/CardSpectralIndex.vue'

export default {
  components:{
    CardSpectralIndex
  },
  mixins: [mountableAsDynamicMixin],

  data: () => ({
    // defined if mountableAsDynamicMixin is included
    dynamicTitle: 'Indices espectrales',
    searchImage: '',
    images: [
      { "value": "vue", "link": "https://github.com/vuejs/vue" },
      { "value": "element", "link": "https://github.com/ElemeFE/element" },
      { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
      { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
      { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
      { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
      { "value": "babel", "link": "https://github.com/babel/babel" }
    ]
  }),

  methods: {
    querySearch (string, cb) {
      let results = this.images
      if (string) {
        const stringToLowerCase = string.toLowerCase()
        results = this.images.filter(item => {
          return item.value.toLowerCase().includes(stringToLowerCase)
        })
      }
      cb(results)
    },
    selectedImage (item) {
      console.log(item)
    }
  },
}
</script>
