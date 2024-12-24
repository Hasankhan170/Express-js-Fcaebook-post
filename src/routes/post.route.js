import express from "express"
import { postCreate,singleUserPost,getAllUserPost} from "../controllers/post.controllers.js"
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/post/:userId", authenticateUser,postCreate)
router.get("/SingleUserpost/:userId", authenticateUser,singleUserPost)
router.get("/getAllUserposts",getAllUserPost)



export default router;