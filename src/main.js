import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from './filters/date.filter'
import currencyFilter from "./filters/currency.filter";
import messagePlugin from './utils/message.plugin'
import Loader from "./components/app/Loader";
import Paginate from 'vuejs-paginate'
import tooltipDirective from './directives/tooltip.directive'
import localizeFilter from "./filters/localize.filter";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDCaq2zL_WoILhfqiJvYmi0WyshI_UG9_0",
  authDomain: "pwa-crm.firebaseapp.com",
  projectId: "pwa-crm",
  storageBucket: "pwa-crm.appspot.com",
  messagingSenderId: "614562744517",
  appId: "1:614562744517:web:be48d9b41b99db06d888ac",
  measurementId: "G-7CCVS3VKMD"
})

// eslint-disable-next-line no-unused-vars
let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
