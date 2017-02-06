<template>
<li>
  <input type="checkbox" v-model="todo.state" @change="updateTodo(todo._id)">
  <label :class="{ completed:todo.state }"> {{ todo.content }} </label>
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
      this.$emit('remove', id)
    },
    updateTodo: function(id) {
      let data = this.todo.content
      let state = this.todo.state
      this.axios.put(`api/todos/${id}`, {
          content: data,
          state: state
        }).then(res => { console.log('Success!:', res.status)})
          .catch(res => console.log('Error!:', res.status))
    },
  }
}
</script>
<style>
input[type='checkbox'] {
  float: left;
}

button {
  float: right;
}


/*li{
  border: 1px solid #505050;
  margin:3px;
}*/

.completed {
  text-decoration: line-through;
}
</style>
