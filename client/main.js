/*eslint-disable no-unused-vars*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [
//     { path: '/', component: App },
//     { path: '/todos/:slug', component: App }
//   ],
// });

new Vue({
  el: '#app',
  render: h => h(App)
})
// document.getElementById('app').innerHTML = 'Привет, я готов. Как дела?'
module.hot.accept()
