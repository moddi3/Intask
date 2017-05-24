<template>
  <div id="app">
    <img src="../assets/logo.png">
    <todo-list></todo-list>
  </div>
</template>

<script>
  import TodoList from './TodoList.vue';

  export default {
    name: 'app',
    components: {
      TodoList,
    },
  };
</script>

<style>
html,body { height: 100%; }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
</style>
