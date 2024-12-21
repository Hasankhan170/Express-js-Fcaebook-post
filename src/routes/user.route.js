import express from 'express';
import { register } from '../controllers/user.controllers.js';
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router()

router.post("/register", upload.single("profileImage"), register);

export default router;