<template>
  <li :class="[todo.state ? 'completed' : 'uncompleted']" @dblclick="editTodo(todo)">
    <input type="checkbox" name="checkbox" v-model="todo.state" @change="updateTodo(todo._id)">
    <label for="checkbox" :class="{ completed: todo.state}" v-if="todo !== editedTodo" >{{ todo.content }}</label>
    <button class="delete" @click="removeTodo(todo._id)">X</button>
    <input type="text" id="edit" v-model="todo.content" v-if="todo === editedTodo" autofocus @keyup.enter="endEditing(todo)" @blur="endEditing(todo)">
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
      this.focusOnEdit();
    },
    focusOnEdit() {
      this.$nextTick(() => {
        const el = document.getElementById('edit');
        if (el) el.focus();
      });
    },
    endEditing(todo) {
      this.editedTodo = null;
      if (todo.content.trim() === '') {
        this.removeTodo(todo._id);
      } else this.updateTodo(todo._id);
    },
    updateTodo(id) {
      const todo = this.todo;
      axios.put(`api/todos/${id}`, todo);
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
