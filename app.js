const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');

require("dotenv").config(); // Load environment variables from .env file

const signupDetails = require('./routes/signupORlogin');

// creating an instance of an Express application
const app = express();

//to allow cross origin request
app.use(
    cors({
        origin: "*",
    })
)
app.use(bodyparser.json());
app.use(signupDetails);

sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running successfully');
    })
})
.catch((error)=>{
    console.log('error while connecting to database',error);
})