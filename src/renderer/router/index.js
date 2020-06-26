import Vue from 'vue'
import Router from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue/dist/bootstrap-vue.esm'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'landing-page',
      component: require('@/components/App').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
