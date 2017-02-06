var express = require('express');
var router  = express.Router();

var todo    = require('../controllers/todoApiCtrl');

router.get(   '/',          todo.index);

router.get(   '/todos',     todo.all);

router.post(  '/todos',     todo.create);

router.get(   '/todos/:id', todo.find);

router.put(   '/todos/:id', todo.update);

router.delete('/todos/:id', todo.delete);

module.exports = router;
