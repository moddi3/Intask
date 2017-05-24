/* eslint-disable import/prefer-default-export */

import Todo from '../config/mongoose';

export const all = cb => Todo
  .find((err, todos) => cb(err, todos))
  .sort('modified');

export const create = (content, cb) => {
  const todo = new Todo({ content });
  return todo.save((err) => {
    cb(err, todo);
  });
};

export const find = (id, cb) => Todo
  .findById(id, (err, todo) => {
    cb(err, todo);
  });

exports.update = (id, cb) => Todo
  .findById(id, (err, todo) => {
    cb(err, todo);
  });

exports.delete = (id, cb) => Todo
  .findById(id, (err, todo) => {
    cb(err, todo);
  });
