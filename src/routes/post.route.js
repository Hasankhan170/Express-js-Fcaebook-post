import express from "express"
import { postCreate,singleUserPost} from "../controllers/post.controllers.js"
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/post/:userId", authenticateUser,postCreate)
router.get("/SingleUserpost/:userId", authenticateUser,singleUserPost)


export default router;