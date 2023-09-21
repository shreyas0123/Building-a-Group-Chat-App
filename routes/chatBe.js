const express=require("express")
const userMsg=require("../controller/messages")
const middleware=require("../middleware/auth")

const routes=express.Router()

routes.post("/message",middleware.decryptToken,userMsg.userMessage);

routes.get("/showMessage",userMsg.showMessage);

routes.get("/allUsers",userMsg.getAllUsers)

routes.post("/addToGroup",userMsg.addToGroup)

routes.get("/getUsers",middleware.decryptToken,userMsg.getpreferedUsers)

routes.post("/removeMember",userMsg.removeMember)

module.exports=routes