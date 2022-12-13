import { Router } from "express";

import newsController from "../controllers/news.controllers.js"

const router = Router();

router.post('/', newsController.create)
router.get('/', newsController.findAll)

export default router;