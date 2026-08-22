import mongoose from "mongoose"


// Creating Event Schema

const eventSchema = new mongoose.Schema({
  title:{type:String,required:true,unique:true},
  description:{type:String,required:true},
  date:{type:String,required:true},
  location:{type:String,required:true},
   ImageUrl:{type:String,required:true}
},{timestamps:true});

// Creating Model off the Schema

const Event = mongoose.model("Event",eventSchema)

export default Event;