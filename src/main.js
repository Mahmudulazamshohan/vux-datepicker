import Vue from 'vue'
import App from './App.vue'
import VuxDatepicker from './components'
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false
Vue.use(VuxDatepicker)
new Vue({
  render: h => h(App)
}).$mount('#app')
