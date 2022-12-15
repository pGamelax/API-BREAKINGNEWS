import { Router } from "express";

import newsController from "../controllers/news.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isValidId } from "../middlewares/global.middlewares.js";

const router = Router();

router.post('/', authMiddleware, newsController.create)
router.get('/', newsController.findAll)
router.get('/top', newsController.topNews)
router.get('/:id', isValidId, newsController.findById)

export default router;