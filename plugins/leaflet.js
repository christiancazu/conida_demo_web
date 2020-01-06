import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

import Vue from 'vue'

// Vue.prototype.$test = null
Vue.prototype.XXX = 'x'
export default ({ app }, inject) => {
  inject('test', () => app.XXX)
}