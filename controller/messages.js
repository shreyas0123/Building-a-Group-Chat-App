const { json } = require("body-parser")
const messagedb=require("../models/message")
const userdb=require("../models/signup");

exports.userMessage=async(req,res)=>{
    try{
        const userMsg=req.body.chat
        const data=await messagedb.create({
         message:userMsg,
         userId:req.user.id
        })
        res.json({data:data})
    }catch(err){
        console.log("error in BE message",err)
        res,json({Error:err})
    }

}