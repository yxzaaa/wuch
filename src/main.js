// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MetaInfo from 'vue-meta-info'
import './assets/css/bootstrap.css'
import './assets/css/reset.css'
import './assets/css/index.css'
import './assets/css/font-awesome.min.css'
// import './assets/css/livemap.css'
// import './assets/css/leftCtrl.css'
// import './assets/css/velset.css'
// import './assets/css/login.css'
// import './assets/css/carlist.css'
// import './assets/css/maininfo.css'
// import './assets/css/account.css'

Vue.config.productionTip = false
Vue.use(MetaInfo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
