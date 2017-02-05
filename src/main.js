import Vue from 'vue'
import App from './App.vue'
console.log(15+35);
new Vue({
  el: '#app',
  render: h => h(App)
})
// document.getElementById('app').innerHTML = 'Привет, я готов. Как дела?'
module.hot.accept();
