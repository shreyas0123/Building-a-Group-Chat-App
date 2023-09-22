const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const cron=require("node-cron") //Cron is a tool that allows you to execute something on a schedule.

require("dotenv").config(); // Load environment variables from .env file

const signupORloginDetails = require('./routes/signupORlogin');
const forgotpassword = require('./routes/forgotpassword');
const chat =require("./routes/chatBe");
const groups=require("./routes/groups")

const User = require('./models/signup');
const Forgotpassword = require('./models/forgotpassword');
const message=require("./models/message");
const groupdb=require("./models/groups");
const usergroupdb=require("./models/usergroup");
const archeivedb=require('./models/archeivechat')

// creating an instance of an Express application
const app = express();

//to allow cross origin request
app.use(
    cors({
        origin: "*",
    })
)
app.use(bodyparser.json());
app.use(signupORloginDetails);
app.use(forgotpassword);
app.use("/chat",chat);
app.use("/group",groups);

//one to many relationship
//ForgotPasswordRequests would have Many to One relationship with User table as Single User can generate multiple forgot password requests
//single user can have multiple password but one password belongs to one particular user only
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

////one to many relationship
//one user can make many messages but one particular message belong to one user only
User.hasMany(message);
message.belongsTo(User);

//many to many relationship between groups and user: one user belongs to many groups and one group contains many users
groupdb.belongsToMany(User,{through:usergroupdb});
User.belongsToMany(groupdb,{through:usergroupdb});

sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running successfully');
    })
})
.catch((error)=>{
    console.log('error while connecting to database',error);
})

cron.schedule("0 9 * * *",async()=>{
    const response=await message.findAll()
    for(let i=0;i<response.length;i++){
     const data=await archeivedb.create({
         message:response[i].dataValues.message,
         userId:response[i].dataValues.userId,
         groupId:response[i].dataValues.groupId,
         userName:response[i].dataValues.userName
     })
    await message.destroy({where:{id:response[i].dataValues.id}})
    }
 
 },{
     timezone:'Asia/Kolkata'
 })