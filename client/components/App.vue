<template>
  <div id="app">
    <header>
      <span class="logo">Inta<span class="logo-accent">s</span>k</span>
    </header>
    <div class="main">
      <todo-list ref="list" />
    </div>
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

<style src="../assets/css/main.css"></style>
