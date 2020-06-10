import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import WediaVue, { getPropsFromBootNode } from 'wedia-vue';

Vue.use(WediaVue, {
  store,
  legacy: {
    'entities.toEntity': 3,
    'carts.cart.contentMode': 'cart', // 'cursor',
    'carts.hugeCartsProofed': true,
    'carts.render': 2,
    'store.query': true,
    'store.aggregates': true,
  },
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


const props = getPropsFromBootNode(document.getElementById('app'));

new Vue({
  components: { App },
  router,
  store,
  render: (h) => {
    return h('WeApplicationProvider', {
      props,
      scopedSlots: {
        default: (params) => {
          if (params.status === 'signed-in') {
            return h(App)}
          }
      },
    });
  }
}).$mount('#app')
