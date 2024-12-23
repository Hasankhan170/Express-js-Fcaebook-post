import FbPost from "../models/post.models.js"
import FbUser from "../models/user.models.js"


const postCreate = async (req,res)=>{
    const {content,userId} = req.body;
    if(!content) return res.status(404).json({message : "Please enter a content"})
    const user = await FbUser.findById(userId)
    if(!user) return res.status(404).json({message : "User not found"})
    const newPost = await FbPost.create({
        content,
        user : userId
    })

    res.status(200).json({post : newPost})
    
}

export {postCreate}