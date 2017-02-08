<template>
  <li :class="{ completed:todo.state }">
    <input type="checkbox" v-model="todo.state" @change="updateTodo(todo._id)">
    <label for="checkbox" :class="{ completed: todo.state}" class="edited" v-if="todo !== editedTodo" @dblclick="editTodo(todo)">{{ todo.content }}</label>
    <button class="delete" @click="removeTodo(todo._id)">X</button>
    <input type="text" v-model="todo.content" v-if="todo === editedTodo" v-auto-focus autofocus @keyup.enter="endEditing(todo)"
      @blur="endEditing(todo)">
  </li>
</template>

<script>
  export default {
    name: 'todo-item',
    props: ['todo'],
    data: function () {
      return {
        editedTodo: null
      }
    },
    methods: {
      removeTodo: function (id) {
        this.$emit('remove', id)
      },
      editTodo: function (todo) {
        this.editedTodo = todo;
      },
      endEditing: function (todo) {
        this.editedTodo = null;
        if (todo.content.trim() === "") {
          this.removeTodo(todo._id);
        } else this.updateTodo(todo._id)

      },
      updateTodo: function (id) {
        let data = this.todo.content
        let state = this.todo.state
        this.axios.put(`api/todos/${id}`, {
          content: data,
          state: state
        }).then(res => {
          console.log('Success! Updated!:', res.status)
        })
          .catch(res => console.log('Error!:', res.status))
      },
    },
    directives: {
      'auto-focus': function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
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

.edited {
	display: inline-block;
  width: 90%;
	color: #606060;
	z-index: 2;
	overflow: hidden;
}
/*.edit {
  display: none
}*/
.completed {
  text-decoration: line-through;
}
</style>