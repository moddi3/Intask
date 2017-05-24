<template>
  <li :class="[todo.state ? 'completed' : 'uncompleted']">
    <input type="checkbox" v-model="todo.state" @change="updateTodo(todo._id)">
    <label for="checkbox" :class="{ completed: todo.state}" class="edited" v-if="todo !== editedTodo" @dblclick="editTodo(todo)">{{ todo.content }}</label>
    <button class="delete" @click="removeTodo(todo._id)">X</button>
    <input type="text" v-model="todo.content" v-if="todo === editedTodo" v-focus autofocus @keyup.enter="endEditing(todo)" @blur="endEditing(todo)">
  </li>
</template>

<script>
import axios from 'axios';

export default {
  name: 'todo-item',
  props: ['todo'],
  data() {
    return {
      editedTodo: null,
    };
  },
  methods: {
    removeTodo(id) {
      this.$emit('remove', id);
    },
    editTodo(todo) {
      this.editedTodo = todo;
    },
    endEditing(todo) {
      this.editedTodo = null;
      if (todo.content.trim() === '') {
        this.removeTodo(todo._id);
      } else this.updateTodo(todo._id);
    },
    updateTodo(id) {
      const content = this.todo.content;
      const state = this.todo.state;
      axios.put(`api/todos/${id}`, { content, state });
    },
  },
  directives: {
    focus: (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>
<style>
input[type='checkbox'] {
  float: left;
}

button {
  float: right;
}

.edited {
  display: inline-block;
  width: 90%;
  color: #606060;
  z-index: 2;
  overflow: hidden;
}

.completed {
  text-decoration: line-through;
}
</style>
