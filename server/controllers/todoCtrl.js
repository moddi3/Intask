/* eslint-disable import/prefer-default-export */

import log from 'winston';
import * as Todo from '../models/Todo';

export const all = (req, res) => {
  Todo.all((err, todos) => {
    if (!err) {
      return res.render('index', { title: 'full list', todos });
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    }
  });
};

