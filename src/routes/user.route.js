import {Router} from 'express';

import userController from '../controllers/user.controller.js'
import { isValidId, isValidUser } from '../middlewares/global.middlewares.js'

const router = Router();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', isValidId, isValidUser, userController.findById);
router.patch('/:id', isValidId, isValidUser, userController.update);

export default router