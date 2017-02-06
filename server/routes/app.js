var express = require('express');
var router  = express.Router();

var todo    = require('../controllers/todoCtrl');

router.get(   '/',     todo.all);

router.post(  '/',     todo.create);

router.put(  '/:slug', todo.update);

router.delete('/:slug', todo.delete);

module.exports = router;
