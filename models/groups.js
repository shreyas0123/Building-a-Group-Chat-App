const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const groupName=sequelize.define("groupName",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nameOfGroup:Sequelize.STRING,

})

module.exports=groupName