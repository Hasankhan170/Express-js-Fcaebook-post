import FbPost from "../models/post.models.js"
import FbUser from "../models/user.models.js"

//create user posts
const postCreate = async (req,res)=>{
    const {content} = req.body;
    const {userId} = req.params;
    if(!content) return res.status(404).json({message : "Please enter a content"})

    const user = await FbUser.findById(userId)
    if(!user) return res.status(404).json({message : "User not found"})
    const newPost = await FbPost.create({
        content,
        createdBy : userId
    })

    await user.updateOne({
        $push : {posts : newPost._id}
    })

    res.status(200).json({
        post : newPost,
        user :  await FbUser.findById(userId).populate("posts")
    })
    
}

//get single user posts
const singleUserPost = async (req,res)=>{
    const {userId} = req.params;
    const user = await FbUser.findById(userId).populate("posts")
    if(!user) return res.status(404).json({message : "User not found"})
    
    res.status(200).json({
        message : "post found",
        user
    })

}

// get all user post
const getAllUserPost = async (req,res)=>{
   
    const user = await FbPost.find()
    if(!user) return res.status(404).json({message : "No post found"})
    res.status(200).json({
        message : "All posts found",
        user
    })
}

export {postCreate,singleUserPost,getAllUserPost}