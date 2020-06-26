import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

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

Vue.config.productionTip = false;
const props = getPropsFromBootNode(document.getElementById('app'));

new Vue({
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
