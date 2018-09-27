// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
require(`vue-dragula/styles/dragula.min.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
require(`quasar/dist/quasar.ie`)
require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, { QModal, QIcon, QInput, QSelect, QDialogSelect, QDatetime, QBtn, QCheckbox, QTooltip, QField, QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QPopover, QList, QItem, QItemMain, QCardMedia, QItemSide, QItemTile, QCollapsible, QOptionGroup, Toast, Dialog } from 'quasar'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueDragula from 'vue-dragula'

Vue.use(Vuelidate)
Vue.use(VueDragula) 

// Install Quasar Framework
Vue.use(Quasar, {
  components: { QModal, QIcon, QInput, QSelect, QDialogSelect, QDatetime, QBtn, QCheckbox, QTooltip, QField, QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QPopover, QList, QItem, QItemMain, QCardMedia, QItemSide, QItemTile, QOptionGroup, QCollapsible }
})

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

Vue.config.productionTip = false

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
  require('./themes/app.mat.styl')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
import store from 'store'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    // store: require('./store.js'),
    router,
    render: h => h(require('./App').default)
  })
})

let API_URL = 'https://www2.sportandhealth.com/clubaxess/joinonline/api/'
// if (DEV) {
//   API_URL = 'http://localhost:56684/'
// }

// Setup Axios Base
var axiosBase = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer {token}'
    // 'Cache-Control': 'no-cache'
  }
})

axiosBase.interceptors.response.use((response) => {
  return response
}, function (error) {
  // alert(error.message)
  console.log(error)
  if (error.response) {
    alert(error.response.data)
  }
  else {
    alert(error.message)
  }
  return Promise.reject(error.response)
})

Vue.prototype.$http = axiosBase
