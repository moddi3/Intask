import Vue from 'vue';

import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';

import App from './components/App.vue';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
module.hot.accept();
