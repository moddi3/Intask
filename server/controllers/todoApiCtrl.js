var Todo = require('../models/Todo');
var log = require('../config/log')(module);
var URLSlugs = require('mongoose-url-slugs');

exports.index = function(req, res){
  res.json({
    'name': 'project initium v.0.0.1',
    'api version': '0.0.1',
    'date': Date()
  });
}

exports.all = function(req, res) {
  Todo.all(function (err, todos) {
    if (!err) {
      return res.send(todos);
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({error: 'Server error'});
    }
  });
}

exports.create = function(req, res) {
  Todo.create(req.body.content, function(err, todo) {
    if (!err) {
      log.info("Todo created");
      return res.send({status: 'OK', todo: todo});
    } else {
      console.log(err);
      if (err.name == 'ValidationError') {
        res.statusCode = 400;
        res.send({error: 'Validation error'});
      } else {
        res.statusCode = 500;
        res.send({error: 'Server error'});
      }
      log.error('Internal error(%d): %s', res.statusCode, err.message);
    }
  });
}

exports.find = function(req, res) {
  Todo.find(req.params.id, function(err, todo) {
    if (!todo) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    if (!err) {
      return res.send({status: 'OK', todo: todo});
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({error: 'Server error'});
    }
  });
}

exports.update = function(req, res) {
  Todo.find(req.params.id, function(err, todo) {
    if (!todo) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    todo.content = req.body.content;
    todo.state = req.body.state;
    todo.modified = Date.now();
    return todo.save(function(err) {
      if (!err) {
        log.info("todo updated");
        return res.send({status: 'OK', todo: todo});
      } else {
        if (err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({error: 'Validation error'});
        } else {
          res.statusCode = 500;
          res.send({error: 'Server error'});
        }
        log.error('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
}

exports.delete = function(req, res) {
  Todo.delete(req.params.id, function(err, todo) {
    if (!todo) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    return todo.remove(function (err) {
      if (!err) {
        log.info("todo deleted");
      } else {
        if (err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({error: 'Validation error'});
        } else {
          res.statusCode = 500;
          res.send({error: 'Server error'});
        }
        log.error('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
}

// exports.deleteAll = function(req, res) {
//   Todo.remove({}, function(err, todos) {
//     if (!todos) {
//       res.statusCode = 404;
//       return res.send({error: 'Not found'});
//     }
//   });
// }
