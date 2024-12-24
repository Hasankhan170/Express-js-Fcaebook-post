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
const getAllUserPost = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 3; 

    const skip = (page - 1) * limit;

    try {
        const posts = await FbPost.find({}).skip(skip).limit(limit);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json({
            message: "All posts found",
            posts,
            length: posts.length,
            page,
            limit,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// single user post delete 
const deletePost = async (req, res) => {
    const { userId } = req.params; 
    const { postId } = req.body;    

    
    const post = await FbPost.findOneAndDelete({
        _id: postId,
        createdBy: userId  
    });

    if (!post) {
        return res.status(404).json({ message: "Post not found or does not belong to the user" });
    }

    res.status(200).json({
        message: "Post deleted successfully",
        deletedPost: post  
    });
}



export {postCreate,singleUserPost,getAllUserPost,deletePost}