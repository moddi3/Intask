/* eslint-disable import/prefer-default-export */

import Todo from '../models/Todo';

export const index = (req, res) => {
  res.json({
    name: 'project intask v.0.0.1',
    apiVer: '0.0.1',
    date: Date(),
  });
};

export const all = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) res.send(err);
    res.json(todos);
  });
};

export const create = (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err && err.name === 'ValidationError') {
      res.statusCode = 400;
      res.send({ error: 'Validation error' });
    } else if (err) {
      res.statusCode = 500;
      res.send({ error: 'Server error' });
    }
    res.json(todo);
  });
};

export const find = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) res.send(err);
    res.json({ status: 'OK', todo });
  });
};

export const update = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
};

export const remove = (req, res) => {
  Todo.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ message: 'Task successfully deleted' });
  });
};
