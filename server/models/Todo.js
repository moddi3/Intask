var Todo = require('../config/mongoose').Todo;

exports.all = function(cb){
  return Todo
    .find(function(err, todos) { cb(err, todos); })
    .sort( '-modified' );
}

exports.create = function(content, cb){
  var todo = new Todo({
    content: content,
  })
  return todo.save(function(err) {
    cb(err, todo);
  });
}

exports.find = function(slug, cb){
  return Todo.findOne({ slug: slug }, function(err, todo) {
    cb(err, todo);
  })
}

exports.edit = function(slug, cb){
  return Todo.find({ slug: slug }, function(err, todo) {
    cb(err, todo);
  }).sort( '-modified' );
}

exports.update = function(id, cb){
  return Todo.findOne({ _id: id }, function(err, todo) {
    cb(err, todo);
  });
}

exports.delete = function(id, cb){
  return Todo.findById(id, function(err, todo) {
    cb(err, todo);
  });
}
//
// exports.deleteAll = function(cb){
//   return Todo.find(function(err, todos) {
//     cb(err, todos);
//   });
// }
