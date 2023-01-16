const jwt = require("jsonwebtoken");

const Authenticator = (req,res,next) =>  {
    const token = req.headers.authorization;
    try{
        if(token){
            jwt.verify(token, process.env.key, async(err,decoded)=>{
                if(err){
                    console.log(err);
                    res.send("Token Invalid");
                }else{
                    const Id = decoded.UserId;
                    req.body.userID = Id;
                    next();
                }
            })
        }else{
            console.log("Unauthorized");
            res.send("Unauthorized User")
        }
    }catch(err){
        console.log(err);
        res.send("Invalid User");
    }
}

module.exports = {Authenticator};