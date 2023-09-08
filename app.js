const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');

require("dotenv").config(); // Load environment variables from .env file

const signupORloginDetails = require('./routes/signupORlogin');
const forgotpassword = require('./routes/forgotpassword');

const User = require('./models/signup');
const Forgotpassword = require('./models/forgotpassword');

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

//ForgotPasswordRequests would have Many to One relationship with User table as Single User can generate multiple forgot password requests
//single user can have multiple password but one password belongs to one particular user only
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running successfully');
    })
})
.catch((error)=>{
    console.log('error while connecting to database',error);
})