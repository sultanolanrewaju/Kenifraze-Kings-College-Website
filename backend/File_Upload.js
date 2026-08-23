import express from "express"
const app = express();

import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({storage})


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.send("Uploaded Successfully")
    console.log(req.file);
})


app.listen(3000,()=>{
    console.log("Server is up an running");
    
})