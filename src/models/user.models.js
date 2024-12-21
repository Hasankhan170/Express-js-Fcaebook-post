import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,   
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String,
        required : true,
    },
    friends :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]},
    {
        timestamps : true,
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

export default mongoose.model("User",userSchema)