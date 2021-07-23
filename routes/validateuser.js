const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    const bearerHead = req.headers["authorization"]
    const bearer = bearerHead && bearerHead.split(" ")[1];
    if (bearer === null){
        console.log("no bearer")
        res.json("you are not authorized to access this page").status(404);
    }
    const secret = "a667bc75dfff555f1f66c58ec41d7011653220dca6f3d72de1f027deb2883b009e55134ea82bd509cf0bc4e381a4cef79f14e1828f839a8b364a682af4d0c07e";
    jwt.verify(bearer, secret, (err, isAuthUser)=>{
     if (err){
          return res.status(403).json("you are not authorized to access this page")
     }else{
         console.log("user",req.user)
     req.user = isAuthUser;
     }
     next() 
    })
} 
module.exports = verifyToken; 
