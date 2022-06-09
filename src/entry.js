import './scss/inject.scss';
import Api from '@/api';
import App from './App.vue';
import router from '@/router/router';
import store from '@/store/index';

Vue.use(Api)
// Register local assets & components globally
require('@/utils/register-assets')
require('@/utils/register-components')

new Vue({
  el: '.vue-app',
  router: router(),
  store: store(),
  render: h => h(App),
})