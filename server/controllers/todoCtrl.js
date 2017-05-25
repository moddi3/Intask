/* eslint-disable import/prefer-default-export */

import Todo from '../models/Todo';

export const all = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) res.send(err);
    return res.render('index', { title: 'full list', todos });
  });
};

