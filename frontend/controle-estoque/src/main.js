import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './components/config/router'

import './assets/scss/app.scss'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
