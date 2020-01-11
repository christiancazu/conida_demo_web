<template>
<div>
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
  <dialognew :visiblemodal="dialogFormVisible" />
</div>
</template>

<script>
import dialognew from '~/components/admin/project/dialog_new.vue'
export default {
  layout: 'admin',
  components: {
    dialognew
  },
  data () {
    return {
      dialogFormVisible: false,
    }
  }
}
</script>

<style>
</style>
