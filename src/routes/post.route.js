import express from "express"
import { postCreate,singleUserPost,getAllUserPost,deletePost,editPost} from "../controllers/post.controllers.js"
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/post/:userId", authenticateUser,postCreate)
router.get("/SingleUserpost/:userId", authenticateUser,singleUserPost)
router.get("/getAllUserposts",authenticateUser,getAllUserPost)
router.delete("/deletePost/:userId",authenticateUser,deletePost)
router.put("/editPost/:userId",authenticateUser,editPost)






export default router;