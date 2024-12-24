import express from "express"
import { postCreate,singleUserPost} from "../controllers/post.controllers.js"

const router = express.Router()

router.post("/post/:userId",postCreate)
router.get("/SingleUserpost/:userId",singleUserPost)


export default router;