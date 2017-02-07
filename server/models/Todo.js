var Todo = require('../config/mongoose').Todo;

exports.all = function(cb){
  return Todo
    .find(function(err, todos) { cb(err, todos); })
    .sort('-modified')
}

exports.create = function(content, cb){
  var todo = new Todo({
    content: content,
  })
  return todo.save(function(err) {
    cb(err, todo);
  });
}

exports.find = function(id, cb){
  return Todo.findById(id, function(err, todo) {
    cb(err, todo);
  })
}

exports.update = function(id, cb){
  return Todo.findById(id, function(err, todo) {
    cb(err, todo);
  });
}

exports.delete = function(id, cb){
  return Todo.findById(id, function(err, todo) {
    cb(err, todo);
  });
}
