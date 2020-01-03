import BaseModal from '@/components/base/BaseModal'

import { mapActions } from 'vuex'

export default {
  components: {
    BaseModal
  },

  computed: {
    $dynamicComponent () {
      const { type, folderPath, name } = this.$store.state[this.storeBase.name].modalMain
      return type === 'page'
        ? () => import(`@/pages/${folderPath}/${name}`)
        : () => import(`@/components/${folderPath}/${name}`)
    }
  },

  methods: {
    ...mapActions({
      $setDynamicComponentAsModal({}, component) {
        this.$store.dispatch(`${this.storeBase.name}/setDynamicModal`, {
          typeModal: 'modalMain',
          component
        })
      }
    }),

    $openModal(component) {
      this.$setDynamicComponentAsModal(this.modalMain[component])
    }
  }
}
