var express = require('express')
var mysql = require('mysql')
const {check,validationResult}= require('express-validator')
const bcryptjs = require("bcrypt")
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

 const csrfProtection= csrf();
  //router.use(csrfProtection);

 router.get('/csrftoken',csrfProtection,(req,res)=>{
     res.send(req.csrfToken)
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

module.exports = router;