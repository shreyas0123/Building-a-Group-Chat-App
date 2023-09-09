const express=require("express")
const userMsg=require("../controller/messages")
const middleware=require("../middleware/auth")

const routes=express.Router()

routes.post("/message",middleware.decryptToken,userMsg.userMessage)

module.exports=routes