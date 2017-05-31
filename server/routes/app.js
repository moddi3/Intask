import { Router } from 'express';
import * as todo from '../controllers/todoCtrl';

const router = Router();

router.get('/', todo.all);

export default router;
