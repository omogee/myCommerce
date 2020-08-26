var express = require('express')
var conn = require('./connection')
const jwt = require('jsonwebtoken')
const {check,validationResult}= require('express-validator')
const bcryptjs = require("bcrypt")
const cookieParser= require('cookie-parser')
const csrf = require('csurf');
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()

 const csrfProtection= csrf({cookie:true, value : (req) => (req.cookies.csrfToken)});
  //router.use(csrfProtection);
 // router.use(csrfProtection)
  router.use(cookieParser())
 router.get('/csrftoken',csrfProtection,(req,res)=>{
     res.send(req.csrfToken())
   })
router.post("/submit/login",(req,res)=>{
    const data = JSON.parse(req.body.data)
    const email = data.email;
    const password = data.password;
  //  res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, { sameSite: true, httpOnly: true }); (req) => (req.cookies.csrfToken)
    const emailregex= /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const passwordregex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    const isvalidemail = email.match(emailregex);
    const isvalidpassword = password.match(passwordregex)
    if(!isvalidemail || email.length === 0 || !isvalidpassword || password.length === 0){
        res.json("Login details is null or not valid").status(401)
    }else{
    conn.query("SELECT userId,email,hash FROM users WHERE email= ? ",[email],(err,file)=>{
       if (err) throw err;
     if(file.length === 0){ 
        res.json("Incorrect Login details").status(403)
     }else{
        const hashedpassword = file[0].hash;
        bcryptjs.compare(password, hashedpassword,(err,result)=>{
          //  if (err) throw err;
            console.log(password,file[0].hash)
            if(result){
                const user={
                    userId:file[0].userId,
                    username:file[0].email
                }
        const secret ="a667bc75dfff555f1f66c58ec41d7011653220dca6f3d72de1f027deb2883b009e55134ea82bd509cf0bc4e381a4cef79f14e1828f839a8b364a682af4d0c07e";        
               const signature= jwt.sign({user}, secret, (err, token)=>{
                   if (err) throw err;
                   res.cookie('jwt',signature,{
                    maxAge:3600,
                    httpOnly: true,
                    secure: true
                },console.log(`${token} is set`)) 
                user["token"]=token
                user["message"]="Login Successful"
                res.send(user);               
               })
            }else{
                res.send("Password is Incorrect!!!")
            }
        })
     } 
    })
    }
})
router.post("/submit/register", (req,res)=>{
    const data = JSON.parse(req.body.data)
    let navigation = data.navigation;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const contact = data.contact;
    const email = data.email;
    const gender = data.gender;
    const password = data.password;
    var regex = /^[A-Za-z0-9 ]+$/
    var regex2 = /^[0-9]+$/
    var regex3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    var isvalidfirstname = firstname.match(regex)
    var isvalidlastname = lastname.match(regex)
    var isvalidcontact = contact.match(regex2)
    var isvalidpass = password.match(regex3)
 if(!isvalidfirstname || !isvalidlastname || !isvalidcontact || !isvalidpass){
    res.json("data is invalid").status(401)
 }else{
     conn.query("SELECT * FROM users WHERE email =? ",[email],(err,file)=>{
        if (err) throw err;
        if(file.length=== 0){
     navigation =JSON.stringify(navigation)
    bcryptjs.genSalt(10, (err,salt)=>{
        if (err) throw err;
        bcryptjs.hash(password, salt, (err,hash)=>{
            if (err) throw err;
            conn.query("INSERT INTO users (firstname, lastname,contact, email,gender,hash,navigation) VALUES (?,?,?,?,?,?,?)",[firstname,lastname,contact,email,gender,hash,navigation], (err,file)=>{
                if (err) throw err;
                const register={
                   message:"registration recieved successfully",
                   register: true
                }
                res.send(register)
            })
        })
      })
}
else{
    res.send("This email is already registered on fruget")
}
})
}    
})
 
router.get("/add-to-cart",verifyToken,(req,res)=>{ 
    const id = req.query.id;
    const user = req.user
    let userIdentity = user.user["userId"]
    conn.query("SELECT * FROM shoppingcart WHERE userId= ? AND productId= ?",[userIdentity,id],(err,file)=>{
        if (err) throw err;
        if(file.length === 0){
conn.query("SELECT productId,details,mainimg,sellingprice,color,size,store FROM product WHERE productId='"+id+"'",(err,file)=>{
        if(err) throw err;
        const details =file[0].details;
conn.query("INSERT INTO shoppingcart (userId,productId,details,mainimg,sellingprice,color,size,seller) VALUES (?,?,?,?,?,?,?,?)",
[userIdentity,file[0].productId,file[0].details,file[0].mainimg,file[0].sellingprice,file[0].color,file[0].size, file[0].store],(err,files)=>{
    if(err) throw err;
    const messages ={
        success: true,
        message: `<b> Added to Cart </b> <br/><center> <small> ${details}</small> <br/></center>`
    }
  res.send(messages)
    })  
})  
        }else{
            conn.query("SELECT details FROM product WHERE productId =?", [id],(err,details)=>{
  let detail = details[0].details
conn.query("UPDATE shoppingcart SET quantity = quantity+1 WHERE userId=? AND productId=?",[userIdentity,id], (err,file)=>{
    if (err) throw err;
    const messages ={
        success: true,
        message: `<b> Added to Cart </b> <br/><center> <small> ${detail}</small> <br/></center>`
    }
    res.send(messages)
})
})
  }
 })
})
router.get("/increasecart", (req,res)=>{
    const details = req.query.details;
    conn.query("UPDATE shoppingcart SET quantity = quantity + 1 WHERE details = ?",[details], (err,file)=>{
        if (err) throw err;
        res.send("quantity increased")
    }) 
})
router.post("/changecart", (req,res)=>{
    const quantity = JSON.parse(req.body.data);
    conn.query("UPDATE shoppingcart SET quantity = ? WHERE details = ?",[quantity,details], (err,file)=>{
        if (err) throw err;
        res.send("quantity updated successfully")
    }) 
})
router.get("/decreasecart", (req,res)=>{
    const details = req.query.details;
    conn.query("SELECT quantity FROM shoppingcart WHERE details = ?", [details], (err, quantity)=>{
        if (err) throw err;
        if(quantity[0].quantity > 1){
         conn.query("UPDATE shoppingcart SET quantity = quantity - 1 WHERE details = ?",[details], (err,file)=>{
        if (err) throw err;
        res.send("quantity increased")
    })    
        }else{
            messages={
                failed:true,
                message:"cannot update when value = 1"
            }
            res.send(messages)
        }
    })
    
})
router.get("/deletecart", (req,res)=>{
    const details = req.query.details;
    conn.query("DELETE FROM shoppingcart  WHERE details = ?",[details], (err,file)=>{
        if (err) throw err;
        res.send("cart deleted")
    }) 
})
router.get("/checkout", (req,res)=>{
    const user = req.query.user;
    conn.query("SELECT * FROM users WHERE userid = ?",[user], (err,file)=>{
        if (err) throw err;
        if(!file) return res.sendStatus(403)
        conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=?",[user],(err,files)=>{
            if (err) throw err;
        conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM shoppingcart WHERE userId =?",[user], (err,totalprice) =>{
            if (err) throw err;
            const filess={
                files,
                totalprice: totalprice[0].totalprice
            }
            res.send(filess)
        })
      })
    })
})
router.get("/save",verifyToken, (req,res)=>{
    const user = req.user;
    console.log(user)
    const details = req.query.details
    let userIdentity = user.user["userId"]
    conn.query("SELECT productId from product WHERE details = ?", [details], (err,productId)=>{
        if (err) throw err;
    conn.query("SELECT savedItem from users WHERE userid=?", [userIdentity],(err, savedItem)=>{
        if (err) throw err;
        if(!savedItem[0].savedItem){
            let newSavedItem = []
            newSavedItem.push(productId[0].productId)
            newSavedItem = JSON.stringify(newSavedItem);
            conn.query("UPDATE users SET savedItem = ? WHERE userid =?", [newSavedItem, userIdentity], (err,file)=>{
              if (err) throw err;
              res.send(`<b> Product Saved Successfully </b> <br/><center> <small> ${details}</small> <br/></center>`);
            })
        }else{
            let oldSavedItem = savedItem[0].savedItem;
            oldSavedItem = JSON.parse(oldSavedItem);
            if(oldSavedItem.includes(productId[0].productId)){
                res.send(`<b>Product has already been saved </b> <br/><center> <small> ${details}</small> <br/></center>`);
            }else{
                oldSavedItem.push(productId[0].productId);
                oldSavedItem = JSON.stringify(oldSavedItem)
                conn.query("UPDATE users SET savedItem = ? WHERE userid =?", [oldSavedItem, userIdentity], (err,file)=>{
                    if (err) throw err;
                    res.send(`<b> Product Saved Successfully </b> <br/><center> <small> ${details}</small> <br/></center>`);
                  })
            }
        }
    })
})
}) 
router.get("/check/save",verifyToken,(req,res)=>{
    const details = req.query.details;
    const user = req.user;
  console.log(user)
   let userIdentity = user.user["userId"]
    conn.query("SELECT productId from product WHERE details = ?", [details], (err,productId)=>{
        if(err) throw err;
    conn.query("SELECT savedItem from users WHERE userid = ?",[71], (err,savedItems)=>{ 
        if (err) throw err;
       if(!savedItems){
           res.send("orange") 
       }else{              
        let savedItem = savedItems[0].savedItem;
        savedItem = JSON.parse(savedItem); 
if(savedItem.includes(productId[0].productId)){        
    res.send("rgb(0, 119, 179)")
}else{ 
    res.send("orange")  
}
       }   
    })
})
})

router.get("/:userId/saveditems",(req,res)=>{
    const id= req.params.userId;
    console.log(id)
    conn.query("SELECT savedItem FROM users WHERE userid =?",[id],(err, savedItems)=>{
        if (err) throw err;
        if(!savedItems[0].savedItem){
         res.send("<h1>You Have No Saved Item </h1>")   
        }else{
            let savedItemss = savedItems[0].savedItem
            savedItemss = savedItemss.toString().slice(1,-1);
             console.log(savedItemss)
            conn.query("SELECT *, CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE productId IN ("+savedItemss+")", [savedItems], (err, files)=>{
            if (err) throw err;
            files.map(file => {  
                file["authur"] = "Eze Ogbonnaya"
                if(file.productrating){      
                    const prating =JSON.parse(file.productrating);
                    const mainrating =[];
                    for (var i=0; i<Object.values(prating).length; i++){
                     mainrating.push(parseInt(Object.values(prating)[i][0]))
                  }
                       const reducer = (a,b) => (a+b)
                       const prating2 =mainrating.map(pratings => pratings*20)
                   //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
                       file["numOfRating"] = Object.keys(prating).length
                       if(Object.values(prating).length > 0){
                           file["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
                       }
                      else{
                         file["percentrating"] = 0
                      }
                         }
            })
            const messages={
                files,
                message:"fetching saved products"
            }
    //         console.log(files)
             res.send(messages)
            })
        }
    })
})

router.get("/userprofile/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id)
    conn.query("SELECT * FROM users WHERE userid=?", [id], (err,file)=>{
        if(err) throw err;
        if(file.length === 0){
            res.send("user is not registered")
        }else{
            console.log("goods day")
            const messages={
                file:file[0],
                message:"successful"
            }
            
           res.send(messages)
        }
    })
})
function verifyToken(req,res,next){
    const bearerHead = req.headers["authorization"]
    const bearer = bearerHead && bearerHead.split(" ")[1];
    if (bearer === null) res.status(403).json("you are not authorized to access this page");
    const secret = "a667bc75dfff555f1f66c58ec41d7011653220dca6f3d72de1f027deb2883b009e55134ea82bd509cf0bc4e381a4cef79f14e1828f839a8b364a682af4d0c07e";
    jwt.verify(bearer, secret, (err, isAuthUser)=>{
     if (err){
          return res.status(403).json("you are not authorized to access this page")
     }else{
     req.user = isAuthUser;
     }
     next()
    })
}
module.exports = router;