import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbUser'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FbPost'
    }},
    {
        timestamps : true,
    }
)

export default mongoose.model("Share", shareSchema)