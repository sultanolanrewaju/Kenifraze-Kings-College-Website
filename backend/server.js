import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv/config"
import mongoose from "mongoose"
import User from "./models/User.js"
const app = express()
app.use(express.json())

const users= [
    {
        name:"Alex",
        email:"me@gmail.com",
        password:"james@234"
    },
    {
       name:"John",
        email:"john24@gmail.com",
        password:"john@26"
    }
]

app.get("/posts",async(req,res)=>{
    try {
        const User =await  User.find({})
        res.status(200).json(User)
    } catch (error) {
     res.status(400).send("Internal Server Error")   
    }
})

app.post("/register",async(req,res)=>{
 try {
     const {name,email,password} = req.body;

     if(!(name && email && password)) {
         res.status(400).send("All field are compulsory")
     }

     // Check if user exist 
     const getusers = users.map((mapped)=>{ return mapped})

     const salt = await bcrypt.genSalt();
     const hashedpassword = await bcrypt.hash(password,salt) 

     if (email === getusers.email) {
         res.status(400).send("User Already Exist ")
     }
       const newUser = {
        name,
        email,
        hashedpassword,
    }
    console.log(hashedpassword);
    
    users.push(newUser);
    res.status(200).json({message:"User Added Successfully!!!"})
 } catch (error) {
    console.log("Eroor Adding new User: ",error);
    res.status(500).send("Internal Server Error")
 }
})

app.post("/login",(req,res)=>{
    const username = req.body.username;
     const user = {name: username}
    const accessToken =    jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken: accessToken})
})

function authenticateToken(req,res,next){
const authHeader = req.headers['Authorization']
const token = authHeader && authHeader.split(" ")[1]
if (token == null ) res.sendStatus(401) 

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if (err)return res.sendStatus(403) 
            req.user = user
        next( )
    })
}

app.delete("/api/login",(req,res)=>{
   try {
     var deleted = users.delete();
     res.send(200).send("Deleted Successfully!!!")
   } catch (error) {
    console.log("Error:",error);    
    res.send("Error in te server")
   }
})


mongoose.connect("mongodb://localhost:27017/Admin").then(()=>{
console.log("Mongodb Connnected Successfully!!!");

    app.listen("5001",()=>{
        console.log("Server is up and running");
        
    })
})
