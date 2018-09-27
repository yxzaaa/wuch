// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MetaInfo from 'vue-meta-info'
import Resource from 'vue-resource'
import './assets/css/bootstrap.css'
import './assets/css/reset.css'
import './assets/css/index.css'
import './assets/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(MetaInfo)
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
