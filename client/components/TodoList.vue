<template>
  <ul>
    <input type="text" name="content" autofocus autocomplete="off" v-model="newTodo.content" @keyup.enter="addTodo">
    <todo-item v-for="todo in todos" :todo="todo" v-on:remove="removeTodo"></todo-item>
  </ul>
</template>

<script>

import TodoItem from './TodoItem.vue'

export default {
  name: 'todo-list',
  data:function(content) {
    return {
      todos: [],
      newTodo: {
        content: content,
        state: false
      }
    }
  },
  mounted: function() {
    this.getTodos()
  },
  components: {
    TodoItem
  },
  methods: {
    getTodos: function() {
      this.$http.get('api/todos').then(function(todos) {
        return this.todos = todos.body
      })
    },
    removeTodo: function(id, index) {
      var todos = this.todos
      todos.splice(index, 1)
      this.$http.delete(`api/todos/${id}`).then(
        function(res) {
          console.log(res.status);
          console.log('Success!:', res.status)
        },
        function(res) {
          console.log('Error!:', res)
        }
      )
      console.log(todos);
    },
    addTodo: function(id) {
      let todo = this.newTodo
      let todos = this.todos
      this.$http.post('api/todos', { content: todo.content }).then(
        function(res) {
          let id = res.body.todo._id
          todos.unshift({_id: id, content: todo.content, state: todo.state})
          console.log('Success!:', res.status)
          todo.content = ''
        },
        function(res) {
          console.log('Error!:', res.body)
        }
      )
      console.log(todos);
    }
  }
}
</script>
