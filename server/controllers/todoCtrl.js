var Todo = require('../models/Todo');
var log = require('../config/log')(module);

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
      res.render('index', {
        title: 'full list',
        todos: todos
      });
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
      return res.redirect('/');
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

exports.update = function(req, res) {
  Todo.find(req.params.slug, function(err, todo) {
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
        log.info(todo.state);
        return res.redirect('/');
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
  Todo.find(req.params.slug, function(err, todo) {
    if (!todo) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    return todo.remove(function(err) {
      if (!err) {
        log.info("todo deleted");
        return res.redirect('/');
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
