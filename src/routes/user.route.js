import {Router} from 'express';
const router = Router();
import userController from '../controllers/user.controller.js'
import { isValidId, isValidUser } from '../middlewares/global.middlewares.js'

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', isValidId, isValidUser, userController.findById);
router.patch('/:id', isValidId, isValidUser, userController.update);

export default router