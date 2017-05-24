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
      newTodo: {
        content: '',
        modified: new Date(),
        state: false,
      },
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
        const newTodos = this.todos.filter(todo => todo._id != id);
        this.todos = newTodos;
      });
    },
    addTodo() {
      const todo = this.newTodo;
      const todos = this.todos;
      axios.post('api/todos', {
        content: todo.content,
      }).then((res) => {
        const id = res.data.todo._id;
        todos.push({
          _id: id,
          content: todo.content,
          modified: todo.modified,
          state: todo.state,
        });
        todo.content = '';
      });
    },
  },
};
</script>
