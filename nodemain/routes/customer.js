var express = require('express')
var mysql = require('mysql')
const {check,validationResult}= require('express-validator')
const bcryptjs = require("bcrypt")
const cookieParser= require('cookie-parser')
const csrf = require('csurf');


const router = express.Router()


const options = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad'
   }

const conn = mysql.createPool(options)
 console.log('mysql connected successfully')

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
        console.log("data is not valid");
    }else{
    conn.query("SELECT email,hash FROM users WHERE email= ? ",[email],(err,file)=>{
       if (err) throw err;
     if(!file){ 
        res.send("he isnt even registered")
     }else{
        bcryptjs.compare("Nms076295", file[0].hash,(err,result)=>{
          //  if (err) throw err;
            console.log(password,file[0].hash)
            if(result === true){
                res.send("user is a liar")
            }else{
                res.send("user is a authentic")
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
     console.log("this data is not valid")
 }else{
     navigation =JSON.stringify(navigation)
    bcryptjs.genSalt(10, (err,salt)=>{
        if (err) throw err;
        bcryptjs.hash(password, salt, (err,hash)=>{
            if (err) throw err;
            conn.query("INSERT INTO users (firstname, lastname,contact, email,gender,hash,navigation) VALUES (?,?,?,?,?,?,?)",[firstname,lastname,contact,email,gender,hash,navigation], (err,file)=>{
                if (err) throw err;
                console.log(data)
                res.send("data added successfully")
            })
        })
        })
}
    
})
router.get("/save", (req,res)=>{
    const details = req.query.details
    conn.query("SELECT productId from product WHERE details = ?", [details], (err,productId)=>{
        if (err) throw err;
    conn.query("SELECT savedItem from users WHERE userid=?", [1],(err, savedItem)=>{
        if (err) throw err;
        if(!savedItem[0].savedItem){
            let newSavedItem = []
            newSavedItem.push(productId[0].productId)
            newSavedItem = JSON.stringify(newSavedItem);
            conn.query("UPDATE users SET savedItem = ? WHERE userid =?", [newSavedItem, 1], (err,file)=>{
              if (err) throw err;
              res.send("This product has been saved successfully");
            })
        }else{
            let oldSavedItem = savedItem[0].savedItem;
            oldSavedItem = JSON.parse(oldSavedItem);
            if(oldSavedItem.includes(productId[0].productId)){
                res.send("This Item has already been saved");
            }else{
                oldSavedItem.push(productId[0].productId);
                oldSavedItem = JSON.stringify(oldSavedItem)
                conn.query("UPDATE users SET savedItem = ? WHERE userid =?", [oldSavedItem, 1], (err,file)=>{
                    if (err) throw err;
                    res.send("This product has been saved successfully");
                  })
            }
        }
    })
})
})
router.get("/check/save",(req,res)=>{
    const details = req.query.details;
    conn.query("SELECT productId from product WHERE details = ?", [details], (err,productId)=>{
        if(err) throw err;
    conn.query("SELECT savedItem from users WHERE userid = ?",[1], (err,savedItems)=>{
        if (err) throw err;
        let savedItem = savedItems[0].savedItem;
       if(!savedItem.length){
           res.send("orange")
       }else{
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
module.exports = router;