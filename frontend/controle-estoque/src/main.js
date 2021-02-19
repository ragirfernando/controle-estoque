import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './components/config/router'
import money from  'vuejs-money'
import './assets/scss/app.scss'
Vue.config.productionTip = false

new Vue({
  money,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
