import './scss/inject.scss';
import App from './App.vue';


require('@/utils/register-assets')
require('@/utils/register-components')

new Vue({
    el: '.vue-app',
    render: h => h(App),
  })