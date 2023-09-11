const { json } = require("body-parser")
const messagedb=require("../models/message")
const userdb=require("../models/signup");
const sequelize = require('../util/database');

exports.userMessage=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
        const userMsg=req.body.chat
        const data=await messagedb.create({
         message:userMsg,
         userId:req.user.id
        },{ transaction: t })
        await t.commit();
        res.json({data:data})
    }catch(err){
        await t.rollback();
        console.log("error in BE message",err)
        res,json({Error:err})
    }

}

exports.showMessage=async(req,res)=>{
    try{
        const data=await messagedb.findAll()
        res.json({allData:data})
    }catch(err){
        console.log("error in showing message on the screen",err)
        res.json({Error:err})
    }
}