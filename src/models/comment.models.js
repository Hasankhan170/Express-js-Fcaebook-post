import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
     comment : {
     type : String,
     required : true
    },
     post : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'FbPost',
     required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser',
        required : true
    }},
    {
        timestamps : true
    }
)

export default mongoose.model("FbComment",commentSchema)