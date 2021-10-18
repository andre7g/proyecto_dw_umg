import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './services/store/index'
import vuetify from './plugins/vuetify'
import ApiService from "./services/api.service";
import './plugins'

Vue.config.productionTip = false
// API service init
ApiService.init();
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
