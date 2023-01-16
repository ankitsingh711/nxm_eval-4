const express = require("express");
const app = express();
require("dotenv").config();
const {connection} = require("./config/db.js");
const {UserRouter} = require("./router/user.router");
const {PostRouter} = require("./router/posts.router");
const {Authenticator} = require("./middleware/auth");
const cors = require("cors");

app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/users", UserRouter);
app.use(Authenticator);
app.use("/posts", PostRouter);

let port = process.env.PORT;

app.listen(port, async ()=>{
    try{
        await connection;
        console.log(`Connected to the DB`);
    }catch(err){
        console.log(err);
        console.log("Error while connecting to DB");
    }
    console.log(`Server is running on the PORT ${port}`);
})