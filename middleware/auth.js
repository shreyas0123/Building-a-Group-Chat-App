const jwt=require("jsonwebtoken")
const userdb=require("../models/signup")

exports.decryptToken=async(req,res,next)=>{
    try{
        const token=req.header("Authorization")
        const user=jwt.verify(token,"fiuhf2bd484fdfhfff656ffhfEwddfkmnv")
        const curUser=await userdb.findByPk(user.userId) 
        req.user=curUser
        next()
    }catch(err){
        console.log("error in authorization",err)
        res.json({Error:err})
    }
}