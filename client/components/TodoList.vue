<template>
  <ul>
    <input type="text" name="content" autofocus autocomplete="off" v-model="newTodo.content" @keyup.enter="addTodo">
    <todo-item v-for="(todo, index) in todos" :todo="todo" v-on:remove="removeTodo" key="index"></todo-item>
  </ul>
</template>

<script>
import axios from 'axios';

import TodoItem from './TodoItem.vue';

export default {
  name: 'todo-list',
  data() {
    return {
      todos: [],
      newTodo: {},
    };
  },
  created() {
    this.getTodos();
  },
  components: { TodoItem },
  methods: {
    getTodos() {
      axios.get('api/todos').then((res) => {
        this.todos = res.data;
      });
    },
    removeTodo(id) {
      axios.delete(`api/todos/${id}`).then(() => {
        const newTodos = this.todos.filter(todo => todo._id !== id);
        this.todos = newTodos;
      });
    },
    addTodo() {
      const newTodo = this.newTodo;
      const todos = this.todos;
      axios.post('api/todos', newTodo)
        .then((res) => {
          const todo = res.data;
          todos.push(todo);
          newTodo.content = '';
        });
    },
  },
};
</script>
