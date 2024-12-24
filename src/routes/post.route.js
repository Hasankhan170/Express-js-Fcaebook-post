import express from "express"
import { postCreate } from "../controllers/post.controllers.js"

const router = express.Router()

router.post("/post/:userId",postCreate)

export default router;