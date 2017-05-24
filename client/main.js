import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App.vue';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
module.hot.accept();
