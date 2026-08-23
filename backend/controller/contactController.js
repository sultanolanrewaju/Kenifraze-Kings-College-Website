import Contact from "../models/ContactModel.js";

export const getContact = async(req,res)=>{
try {
    const Foundcontact = await Contact.find({}) ;
    res.status(200).json(Foundcontact)
} catch (error) {
    console.log("Error:" + error);
    res.status(500).json({message:"Internal Server Error get Contact"})
}
}

export const postContact = async(req,res)=>{
    try {
        const {address,phone,email,school,social} = req.body;
        const newContact = {
            address,
            phone,
            email,
            school,
            social
        }
     Contact.insertOne(newContact);
     res.status(200).json({newContact})        
    } catch (error) {
            console.log("Error:" + error);
    res.status(500).json({message:"Internal Server Error get Contact"})
    }
}