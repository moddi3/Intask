/* eslint-disable import/prefer-default-export */

import log from 'winston';
import * as Todo from '../models/Todo';

export const index = (req, res) => {
  res.json({
    name: 'project initium v.0.0.1',
    apiVer: '0.0.1',
    date: Date(),
  });
};

export const all = (req, res) => {
  Todo.all((err, todos) => {
    if (!err) {
      return res.send(todos);
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    }
  });
};

export const create = (req, res) => {
  Todo.create(req.body.content, (err, todo) => {
    if (!err) {
      log.info('Todo created');
      return res.send({ status: 'OK', todo });
    } else {
      log.error(err);
      if (err.name === 'ValidationError') {
        res.statusCode = 400;
        res.send({ error: 'Validation error' });
      } else {
        res.statusCode = 500;
        res.send({ error: 'Server error' });
      }
      log.error('Internal error(%d): %s', res.statusCode, err.message);
    }
  });
};

export const find = (req, res) => {
  Todo.find(req.params.id, (err, todo) => {
    if (!todo) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if (!err) {
      return res.send({ status: 'OK', todo });
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    }
  });
};

export const update = (req, res) => {
  Todo.update(req.params.id, (err, todo) => {
    if (!todo) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    todo.content = req.body.content;
    todo.state = req.body.state;
    return todo.save(() => {
      if (!err) {
        log.info('todo updated');
        return res.send({ status: 'OK', todo });
      } else {
        if (err.name === 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        log.error('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
};

exports.delete = (req, res) => {
  Todo.delete(req.params.id, (err, todo) => {
    if (!todo) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    return todo.remove(() => {
      if (!err) {
        log.info('todo deleted');
        return res.send({ status: 'OK', todo });
      } else {
        if (err.name === 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        log.error('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
};
