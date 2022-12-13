import { Router } from "express";
const router = Router();

import authController from "../controllers/auth.controller.js"
import { isValidId, isValidUser } from "../middlewares/global.middlewares.js";

router.post('/', authController.login);

export default router