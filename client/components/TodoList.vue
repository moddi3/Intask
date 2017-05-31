<template>
  <div class="row">
    <div class="col">
      <div class="task-form">
        <input class="task-form__input" type="text" name="content" autofocus autocomplete="off" v-model="newTodo.content" @keyup.enter="addTodo" placeholder="What needs to be done?" />
      </div>
    </div>
    <div class="col">
      <transition-group tag="div" name="list" class="task-list">
        <todo-item v-for="todo in todos" :todo="todo" v-on:remove="removeTodo" :key="todo._id"></todo-item>
      </transition-group>
      <div class="emty-list" v-if="todos.length === 0">
        <div class="empty-list__lead">
          No tasks
        </div>
        <div class="emty-list_secondary">
          You have no task to do!
          <br> Enjoy your day or add task
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import TodoItem from './TodoItem.vue';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default {
  name: 'todo-list',
  data() {
    return {
      todos: [],
      newTodo: {
        content: '',
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
        const newTodos = this.todos.filter(todo => todo._id !== id);
        this.todos = newTodos;
      });
    },
    addTodo() {
      let newTodo = this.newTodo;
      const todos = this.todos;
      if (!isEmpty(newTodo) && newTodo.content.trim() !== '') {
        axios.post('api/todos', newTodo)
          .then((res) => {
            const todo = res.data;
            todos.push(todo);
            newTodo.content = "";
            newTodo = {};
          });
      }
    },
  },
};
</script>
