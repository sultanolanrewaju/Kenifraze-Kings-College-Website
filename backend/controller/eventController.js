import Event from "../models/EventModel.js"

// getting all Event 
export const getEvent = async(req,res)=>{
  try {
      // Check limit
    const limit  = req.query.limit ? Number(req.query.limit) : 0; // Default to 0 if not provided
    const FoundEvent = await Event.find().sort({createdAt:-1}).limit(limit)
    res.status(200).json(FoundEvent)
  } catch (error) {
    console.log(error);
    res.send("Error in  getEvent Controller")
  }
}

// Getting Specific Event
export const getOneEvent = async(req,res)=>{
  try {
  
      const Id = req.params.id;
      console.log(Id);
      
    const FoundEvent = await Event.findOne({_id:Id})
    if (!FoundEvent) {
      return res.status(404).json({ error: "Event not found" });
    }else{
      // console.log("Found Event:", FoundEvent);
      res.status(200).send(FoundEvent)   
  } 
}catch (error) {
    res.send("Error fetching :" +  error)
  }
}


// Posting EVent
export const postEvent = (async(req,res)=>{
try {
   const {title,description,date, location,ImageUrl} = req.body;
   const imageUrl = req.file ? req.file.path : null;
   //logging the received data for debugging
   console.log("Received data:", { title, description, date, location, imageUrl });
   const newEvent = new Event({
    title,
    description,
    date,
     location,
    ImageUrl:imageUrl
   })
   await newEvent.save()
    res.send("Event added Successfully")
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      console.log("Event with the title already exist");
      res.status(409).json({error:"Event with the same title already exists."})
    }else{
      res.status(500).send("Error in Post Event Controller",error)
    }
  }
})

// Updating Event 
export const putEvent = async(req,res)=>{
try {
  const Id = req.params.id;
  const { title, description, date,  location } = req.body;

    // 1. Find existing record first
    const existingEvent = await Event.findById(Id);
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // 2. If user uploaded a NEW image, use req.file.path.
    // Otherwise, retain the EXISTING image URL from database!
    const imageUrl = req.file ? req.file.path : existingEvent.image;

    // 3. Update the fields
    existingEvent.title = title || existingEvent.title;
    existingEvent.description = description || existingEvent.description;
    existingEvent.date = date || existingEvent.date;
    existingEvent. location =  location || existingEvent. location;
    existingEvent.image = imageUrl;

    const updatedEvent = await existingEvent.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
} catch (error) {
  res.send(`Error Updating ${error}`)
}
}


// Updating Event by specific field

export const patchEvent= async(req,res)=>{
  try{
    const Id = req.params.id;
  const {title,description,date,location} = req.body;
   const findEvent = await Event.findById(Id)
   if(!findEvent){
    return res.status(404).send("Event not found")
   }
   const imageUrl = req.file ? req.file.path : findEvent.ImageUrl;
   const updatedEvent = await Event.update(Id,{$set:req.body})
  }catch(error){ 
  res.send("Error in patch Event Controller : ",error)
}
}



// Deleting specific Event
export const deleteOneEvent = async(req,res)=>{
  try {
    const Id = req.params.id;
    const DeletedEvent = await Event.deleteOne(Id) 
    res.status(200).send("Event Deleted Successfully !!!")
  } catch (error) {
    res.send("Error deleting event : " + error)
  }
}




  // Deleting All
  export const deleteAllEvent = async(req,res)=>{
      try{
          const Delete = await Event.deleteMany()
          res.send("Deleted Successfully")
      }catch(error){
          res.send("Error deleting :" + error)
      }
  }
