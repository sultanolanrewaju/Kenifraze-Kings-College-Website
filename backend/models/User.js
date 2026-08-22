import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // role: "Admin"
})

const User = mongoose.model("User",UserSchema)

export default User

