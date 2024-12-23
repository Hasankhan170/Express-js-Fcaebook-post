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
        ref : 'FbComment'
    }]
    }, 
    {
        timestamps : true
    }
)

export default mongoose.model("FbPost", postSchema)