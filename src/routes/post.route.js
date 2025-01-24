import express from "express"
import { postCreate,singleUserPost,getAllUserPost,deletePost,editPost} from "../controllers/post.controllers.js"
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/post", authenticateUser,postCreate)
router.get("/SingleUserpost/:id", authenticateUser,singleUserPost)
router.get("/getAllUserposts",authenticateUser,getAllUserPost)
router.delete("/deletePost/:id",authenticateUser,deletePost)
router.put("/editPost/:id",authenticateUser,editPost)






export default router;