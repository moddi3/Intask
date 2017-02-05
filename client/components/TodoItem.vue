<template>
<li>
  <input type="checkbox" v-model="todo.state" @change="updateTodo(todo.slug)">
  <transition name="fade">
    <label :class="{ completed:todo.state }"> {{ todo.content }} </label>
  </transition>
  <button class="delete" @click="removeTodo(todo._id)">X</button>
</li>
</template>

<script>
export default {
  name: 'todo-item',
  props: ['todo'],
  data: function() {
    return {
      // state: false
    }
  },
  methods: {
    removeTodo: function(id) {
      this.$emit('remove', id);
    },
    updateTodo: function(id) {
      let data = this.todo.content
      let state = this.todo.state
      this.$http.put(`api/todos/${id}`, {
        content: data,
        state: state
      }).then(
        function(response) {
          console.log('Success!:', response.status)
        },
        function(response) {
          console.log('Error!:', response)
        }
      )
    },
  }
}
</script>
<style>
input[type='checkbox'] {
  float: left;
}

.completed {
  text-decoration: line-through;
}
</style>
