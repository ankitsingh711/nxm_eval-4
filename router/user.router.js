const express = require("express");
const app = express();
const UserRouter = express.Router();
const mongoose = require("mongoose");
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

UserRouter.post("/register", async(req,res)=>{
    const {name,email,gender,password} = req.body;
    try{
        bcrypt.hash(password, 6, async (err,hashPassword)=>{
            const payload = new UserModel({name,email,gender,password:hashPassword});
            await payload.save();
            res.send("User Registered");
        })
    }catch(err){
        console.log(err);
        res.send("Error while registering user");
    }
})

UserRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const UserId = user._id;
    try{
        if(user){
            bcrypt.compare(password, user.password, (err,decoded)=>{
                if(err){
                    console.log(err);
                    res.send("Invalid Credentials");
                }else{
                    const token = jwt.sign({UserId}, process.env.key);
                    res.send({"Message":"LogIn Success", "token":token});
                }
            })
        }
        
    }catch(err){
        console.log(err);
        res.send("Invalid User");
    }
})

module.exports = {UserRouter};