const express = require("express");
const router = express.Router();//make Router 

const userLogger = (req,res,next)=>{
  console.log("User Routes Middleware");
  next();
}
router.use(userLogger);

router.get("/",(req,res)=>{
  res.send("Users Home")
});

router.get("/profile",(req,res)=>{
  res.send("Users Profile");
});

module.exports= router;

