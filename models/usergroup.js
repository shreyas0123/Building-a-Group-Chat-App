const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const usergroupdb=sequelize.define("usergroup",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    isAdmin:Sequelize.BOOLEAN
})

module.exports=usergroupdb