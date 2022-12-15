import { Router } from "express";

import newsController from "../controllers/news.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isValidId } from "../middlewares/global.middlewares.js";

const router = Router();

router.post('/', authMiddleware, newsController.create)

router.get('/', newsController.findAll)
router.get('/top', newsController.topNews)
router.get('/search', newsController.searchByTitle)
router.get('/byUser', authMiddleware, newsController.searchByUser)
router.get('/:id', authMiddleware, newsController.findById)
router.patch('/:id', authMiddleware, newsController.update)
router.delete('/:id', authMiddleware, newsController.erase)

export default router;