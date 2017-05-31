<template>
  <div class="task-item" :class="{'task-item__completed': todo.state, 'task-item_editing': this.editedTodo !== null}">
    <div class="cell">
      <input type="checkbox" :id="todo._id" v-model="todo.state" @change="updateTodo(todo._id)">
      <label :for="todo._id" class="task-item__complete-button" v-if="todo !== editedTodo">
        <span></span>
      </label>
    </div>
    <div class="cell" @dblclick="editTodo(todo)">
      <div class="task-item__content" v-if="todo !== editedTodo">{{ todo.content }}</div>
      <input
        class="task-item__input"
        id="editing"
        type="text"
        v-model="todo.content" 
        v-if="todo === editedTodo"
        autofocus
        @keyup.esc="endEditing(todo)"
        @keyup.enter="endEditing(todo)"
        @blur="endEditing(todo)"
      >
    </div>
    <div class="cell">
      <button type="button" class="delete" @click="removeTodo(todo._id)"><span></span></button>
    </div>
  </div>
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
    // completeTodo
    removeTodo(id) {
      this.$emit('remove', id);
    },
    editTodo(todo) {
      this.editedTodo = todo;
      this.focusOnEdit();
    },
    endEditing(todo) {
      if (todo.content.trim() === '') {
        this.editedTodo = null;
        this.removeTodo(todo._id);
      } else if (this.editedTodo === todo) {
        this.editedTodo = null;
      } else this.updateTodo(todo._id);
    },
    focusOnEdit() {
      this.$nextTick(() => {
        const el = document.getElementById('editing');
        if (el) el.focus();
      });
    },
    updateTodo(id) {
      const todo = this.todo;
      axios.put(`api/todos/${id}`, todo);
    },
  },
};
</script>
