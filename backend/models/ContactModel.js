import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    social:{type:String,required:true}

})

const Contact = mongoose.model("Contact",contactSchema);


export default Contact