import Instructor from "../models/InstructorModel.js"
import upload from "../middlewares/uploadMiddlewares.js"


// Get Instructor

export const getInstructor = async(req,res)=>{
try {
    const FoundInstructor = await Instructor.find()
 res.status(200).json(FoundInstructor) 
} catch (error) {
    res.send("Error in Get Instructor Controller")
    console.log(error);
}

}


// Get Instructor  By Id

export const getInstructorbyId = async(req,res)=>{
try {
    const FoundInstructor = await Instructor.findById(req.params.id)
 res.status(200).json(FoundInstructor) 
} catch (error) {
    res.send("Error in Get Instructor By Id Controller")
    console.log(error);
}

}



export const postInstructor = (upload.single("ImageUrl"),async(req,res)=>{
try {
     const {name,subject,bio,ImageUrl} = req.body;
       const imageUrl = req.file ? req.file.path : null;
       const newInstructor = new Instructor({
         name,
         subject,
         bio,
         ImageUrl:imageUrl,
       })
       await newInstructor.save()
    res.status(200).json(newInstructor)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Post Instructor Controller",error)
    
  }
})

export const putInstructor = async(req,res)=>{
    try {
      const {name,subject,bio,ImageUrl} = req.body;
        const imageUrl = req.file ? req.file.path : null;
        const newInst= {
          name,
          subject,
          bio,
          ImageUrl:imageUrl
        }
        const updatedInstructor = await Instructor.updateOne({_id:req.params.id},{newInst})
        res.status(200).json(updatedInstructor)
    } catch (error) {
        res.status(500).send("Error in Put Instructor Controller",error)
    }
}


export const patchInstructor = async(req,res)=>{
  try {
    const Id = req.params.id;
    const {name,subject,bio,ImageUrl} = req.body;
    const findInstructor = await Instructor.findByIdAndUpdate(
      Id,
      {$set:req.body},
      {returnDocument:"after"}
    )
   
    if(!findInstructor){
      return res.status(404).send("Instructor not found")
    }
  const imageUrl = req.file ? req.file.path : findInstructor.ImageUrl;
  const updatedInstructor = await Instructor.findByIdAndUpdate(Id,{...req.body,ImageUrl:imageUrl},{new:true})  
    res.status(200).json(updatedInstructor)
  } catch (error) {
    res.status(500).send("Error in Patch Instructor Controller",error)
    console.error(`Error in Patch Instructor Controller: ${error}`)
  }
}

export const deleteInstructor = async(req,res)=>{
  try {
    const Id = req.params.id;
    const deletedInstructor = await Instructor.findByIdAndDelete(Id)
    if(!deletedInstructor){
      return res.status(404).send("Instructor not found")
    }
    res.status(200).send(`${deletedInstructor.name} deleted successfully`)  
  } catch (error) { 
    res.status(500).send("Error in Delete Instructor Controller",error)
  }
} 