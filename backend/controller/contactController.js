import Contact from "../models/ContactModel.js";

export const getContact = async(req,res)=>{
try {
    const Foundcontact = await Contact.find({}).sort({createdAt:-1}) ;
    res.status(200).json(Foundcontact)
} catch (error) {
    console.log("Error:" + error);
    res.status(500).json({message:"Internal Server Error get Contact"})
}
}

export const postContact = async(req,res)=>{
    try {
        const {address,phone,email,school,social} = req.body;
        const Id = req.params.id;
        console.log(Id);
        const obj = {
            address,
            phone,
            email,
            school,
            social
        }
     const newContact =await Contact.findByIdAndUpdate(Id,obj,{new: true})
     res.status(200).json(newContact)    
     if(newContact){
        res.status(200).json({message:"Updated Successfully!!!"})
     }else{
        res.status(400).json({message:"Fail to update"})
     }    
    } catch (error) {
            console.log("Error:" + error);
    res.status(500).json({message:"Internal Server Error patch Contact"})
    }
}


export const deleteContact = async(req,res)=>{
try {
    const Foundcontact = await Contact.deleteMany();
    res.status(200).json(Foundcontact)
} catch (error) {
    console.log("Error:" + error);
    res.status(500).json({message:"Internal Server Error get Contact"})
}
}
