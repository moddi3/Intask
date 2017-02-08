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
  data: function() {
    return {
      todos: [],
      newTodo: {
        content: '',
        modified: new Date(),
        state: false
      }
    }
  },
  created: function() {
    this.getTodos()
  },
  components: {
    TodoItem
  },
  methods: {
    getTodos: function() {
      let self = this
      this.axios.get('api/todos').then(res => {
        self.todos = res.data
      })
    },
    removeTodo: function(id) {
      let self = this
      this.axios.delete(`api/todos/${id}`).then(
          res => {
            self.getTodos()
            console.log('Success! Deleted!:', res.status)
          })
        .catch(res => console.log('Error!:', res.status))
    },
    addTodo: function(id) {
      let todo = this.newTodo
      let todos = this.todos
      let self = this
      this.axios.post('api/todos', {
        content: todo.content
      }).then(res => {
        // self.getTodos()
        let id = res.data.todo._id
        todos.unshift({
          _id: id,
          content: todo.content,
          modified: todo.modified,
          state: todo.state
        })
        console.log('Success! Added:', res.status)
        todo.content = ''
      }).catch(res => console.log('Error!:', res.status))
    }
  }
}
</script>
