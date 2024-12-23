import mongoose from "mongoose"

const disLikeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser',
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbPost',
        required : true
    }},
    {
        timestamps : true,
    }
)

export default mongoose.model("FbDislike", disLikeSchema)