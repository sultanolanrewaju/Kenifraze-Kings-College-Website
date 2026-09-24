import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async(req,res)=>{
   try{
     const {email,password} = req.body;

    // Check if user exists
    const admin = await Admin.findOne({email})
    if(!admin){
        return res.status(404).json({message:"Admin Not Found"})
    }
    // Check if password is correct
    const isPassword  = await bcrypt.compare(password,admin.password)
    if(!isPassword){
        return res.status(400).json({message:"Invalid Password"})
    }
    //   Create token
    
    const token =jwt.sign(
        // Payload
        {id:admin._id,email:admin.email},
        
        // Secret Key
        process.env.JWT_SECRET,
        {expiresIn:"3d"},
    )
    console.log(admin.email + " " + admin.password)

return res.status(200).json({
    message:"Login Successful",
    token:token,
    admin:{id:admin._id,email:admin.email},
})
   }catch(error){
    res.status(500).send("Error While attempting to Login")
    console.log("Error:" + error)
   }
}