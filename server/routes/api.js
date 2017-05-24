import { Router } from 'express';
import * as todo from '../controllers/todoApiCtrl';

const router = Router();
router.get('/', todo.index);

router.get('/todos', todo.all);

router.post('/todos', todo.create);

router.get('/todos/:id', todo.find);

router.put('/todos/:id', todo.update);

router.delete('/todos/:id', todo.delete);

export default router;
