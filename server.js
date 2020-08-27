const express = require ('express');
const mysql = require ('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const  MySQLStore = require('express-mysql-session')(session);
const cookieParser= require('cookie-parser')
const {check,validationResult}= require('express-validator') 
const Rcustomer = require("./routes/customer");
const Rsearch = require("./routes/search")
const Rproducts = require("./routes/products")
const Rdetails = require("./routes/details")
const path = require("path") 
 
const app = express();  
const options = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',       
    password: '8b36306e',  
    database: 'heroku_ea5621dea112dad'
   }  

const conn = mysql.createPool(options)
   
    console.log('mysql connected successfully')
   
const sessionStore= new MySQLStore(options);
app.use(cookieParser())
app.use(session({ 
    key: 'session_cookie_name',
    secret: 'otosh',
    store: sessionStore,       
    resave: false,      
    saveUninitialized: false,   
    checkExpirationInterval: 900000,
    // The maximum age of a valid session; milliseconds
    expiration: 200000, 
}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())  

 app.use('/customer',Rcustomer);
 app.use('/search',Rsearch);
 app.use('/products',Rproducts); 
 app.use("/details",Rdetails)  
app.get('/suggestions/suggestion',(req,res)=>{
    conn.query('SELECT brand,subcat1,subcat2,subcat3,mainimg,details FROM product',(err,files)=>{
        if (err) throw err;
        res.send(files)  
    }) 
}) 
if(process.env.NODE_ENV === "production"){ 
app.use(express.static("ogbmain/build"))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'ogbmain','build', 'index.html'));
})
} 
const port = process.env.PORT || 5000;   
app.listen(port, ()=>{   
    console.log('connected on 5000 expected')
})