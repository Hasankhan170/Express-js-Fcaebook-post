import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser'
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser'
    }],
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser'
    }],
    dislike : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser'
    }],
    repost : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'repost'
    }]},
    {
        timestamps : true
    }
)

export default mongoose.model("FbPost", postSchema)