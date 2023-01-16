const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type:String},
    email: {type:String,unique:true},
    gender:{type:String}, 
    password: {type:String}
},{versionKey:false})

const UserModel = mongoose.model("users", userSchema);

module.exports = {UserModel};