import Vue from 'vue'
import App from './App.vue'
import VuxDatepicker from './bundle'
Vue.config.productionTip = false
Vue.use(VuxDatepicker)
new Vue({
  render: h => h(App)
}).$mount('#app')
