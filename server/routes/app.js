import { Router } from 'express';
import * as todo from '../controllers/todoCtrl';

const router = Router();

router.get('/', todo.all);

// router.post('/', todo.create);

// router.put('/:slug', todo.update);

// router.delete('/:slug', todo.delete);

export default router;
