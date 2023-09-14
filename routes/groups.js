const express=require("express")
const groups=require("../controller/group");
const auth=require("../middleware/auth")

const routes=express.Router()

routes.post("/addName",auth.decryptToken,groups.groupNames)

routes.get("/getName",auth.decryptToken,groups.getAllGroupNames)

module.exports=routes