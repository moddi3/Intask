<template>
<div id="app">
  <img src="./assets/logo.png">
  <ul>
    <!-- <form class="" action="/" method="post"> -->
    <input type="text" name="content" autofocus autocomplete="off" v-model="newTodo" @keyup.enter="addTodo">

    <li v-for="todo in todos">
      <input class="toggle" type="checkbox" name="state" v-model="todo.state" @change="updateTodo(todo.slug)">
      <label>{{ todo.content }}</label>
      <button class="delete" @click="removeTodo(todo.slug)">X</button>
    </li>
  </ul>
  <pre>{{ $data }}</pre>
</div>
</template>

<script>
  export default {
    name: 'todo',
    data: function() {
      return {
        todos: {},
        newTodo: '',
      }
    },

    mounted: function() {
      this.getTodos()
    },
    // updated: function() {
    //   this.getTodos()
    // },
    methods: {
      getTodos: function() {
        this.$http.get('api/todos', {
          before(request) {
            if (this.previousRequest) {
              this.previousRequest.abort();
            }
            this.previousRequest = request;
          }
        }).then(function(todos) {
          return this.todos = todos.body
        })
      },
      addTodo: function() {
        let data = this.newTodo.trim()
        let todos = this.todos
        this.$http.post('api/todos', { content: data }).then(
          function(response) {
            console.log('Success!:', response.status)
          },
          function(response) {
            console.log('Error!:', response.body)
          }
        )
        this.newTodo = ''
      },
      updateTodo: function(slug, state) {
        this.$http.put(`api/todos/${slug}`, {state: !this.state})
      },
      removeTodo: function(slug) {
        this.$http.delete(`api/todos/${slug}`).then(
          function(response) {
            console.log('Success!:', response.status)
          },
          function(response) {
            console.log('Error!:', response)
          }
        )
      }
    }
  }
</script>

 <style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
