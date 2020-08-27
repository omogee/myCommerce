var express = require('express')
var mysql = require('mysql')
const router = express.Router()
 
const options = {    
    host: 'us-cdbr-east-02.cleardb.com',    
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad'
   }   
  
const conn = mysql.createPool(options)
 console.log('mysql connected successfully')
 router.post("/:details/rate",(req,res)=>{   
    const data = JSON.parse(req.body.data);
    const details = req.params.details; 
    const userId = data.userId;  
    const rating = data.rating;
    const comment = data.comment;
    const currentDate = new Date();         
    conn.query("SELECT productId FROM product WHERE details = '"+details+"'",(err, file)=>{
        if (err) throw err;
        const productId = file[0].productId;
        console.log(productId)

    conn.query("SELECT productrating,comments from product_rating WHERE productId = '"+productId+"'",(err, file)=>{
        if (err) throw err;
        if(file.length > 0){
     file.map(files =>{
         console.log(files.productrating)
         const filerating = JSON.parse(files.productrating)     
             filerating[`${userId}`] =rating +","+ currentDate;
           const filerating2 = JSON.stringify(filerating)
             conn.query("UPDATE product_rating SET productrating ='"+filerating2+"' WHERE productId = '"+productId+"'",(err, file)=>{
                 if (err) throw err;
             console.log("rating have been inserted successfully")
             })  
               // Comment Section
               console.log(files.comments)
      const filecomment = JSON.parse(files.comments)
       filecomment[`${userId}`] = comment;
       const filecomment2 = JSON.stringify(filecomment)
       conn.query("UPDATE product_rating SET comments ='"+filecomment2+"' WHERE productId = '"+productId+"'",(err, file)=>{
        if (err) throw err;
        console.log("comments have been inserted successfuly")
        res.send("rating and comments  have been inserted successfully")
    })       
     })  
    }
    else{
        let myrating = {} 
        myrating[`${userId}`] = rating +","+ currentDate;
        const filerating2 = JSON.stringify(myrating)
        conn.query("UPDATE product_rating SET productrating ='"+filerating2+"' WHERE productId = '"+productId+"'", (err, file)=>{
            if (err) throw err;
            console.log("new rating added successfully")
            res.send("added succesffully")
        })
         
    }
    })
})
})


router.get('/similiar/:details', (req,res)=>{
    const sql = "SELECT * FROM product WHERE  details = '"+req.params.details+"'";
    conn.query(sql, (err,files)=>{
        if (err) throw err;
     var count = files.length;
    for (var i = 0; i < count; i++) {
          arr_brand = files[i].brand;
          arr_subcat2 = files[i].subcat2;
          arr_subcat3 = files[i].subcat3;
          console.log(arr_brand, arr_subcat2, arr_subcat3)
      const sql2 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? AND ( subcat2 = ? OR subcat3= ? ) LIMIT 8;';
    conn.query(sql2 , [arr_brand,arr_subcat2,arr_subcat3],  (err,files2)=>{
    if (err) throw err;
    files2.map(files => { 
        files["authur"] = "Eze Ogbonnaya"
        if(files.productrating){      
            const prating =JSON.parse(files.productrating);
            const mainrating =[];
            for (var i=0; i<Object.values(prating).length; i++){
             mainrating.push(parseInt(Object.values(prating)[i][0]))
          }
               const reducer = (a,b) => (a+b)
               const prating2 =mainrating.map(pratings => pratings*20)
           //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
               files["numOfRating"] = Object.keys(prating).length
               if(Object.values(prating).length > 0){
                   files["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
               }
              else{
                 files["percentrating"] = 0
              }
                 }
    })
    res.send(files2)
    })
    }
    })
    })

    router.get('/similiarbrand/:details', (req,res)=>{
        const sql = "SELECT * FROM product WHERE  details = '"+req.params.details+"'";
        conn.query(sql, (err,files)=>{
            if (err) throw err;
         var count = files.length;
        for (var i = 0; i < count; i++) {
              arr_brand = files[i].brand;
              arr_subcat2 = files[i].subcat2;
              arr_subcat3 = files[i].subcat3;
              console.log(arr_brand, arr_subcat2, arr_subcat3)
const sql2 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? LIMIT 8;';
        conn.query(sql2 , [arr_brand],  (err,files2)=>{
        if (err) throw err;
        files2.map(files => { 
            files["authur"] = "Eze Ogbonnaya"
            if(files.productrating){      
                const prating =JSON.parse(files.productrating);
                const mainrating =[];
                for (var i=0; i<Object.values(prating).length; i++){
                 mainrating.push(parseInt(Object.values(prating)[i][0]))
              }
                   const reducer = (a,b) => (a+b)
                   const prating2 =mainrating.map(pratings => pratings*20)
               //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
                   files["numOfRating"] = Object.keys(prating).length
                   if(Object.values(prating).length > 0){
                       files["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
                   }
                  else{
                     files["percentrating"] = 0
                  }
                     }
        })
        res.send(files2)
        })
        }
        })
        })

        router.get('/product/:details', (req,res)=>{
            const details = req.params.details;
           conn.query("SELECT *, `colors-avail` as coloursavail,CONCAT('₦', FORMAT(sellingprice, 0)) mainprice, CONCAT('₦', FORMAT(initialprice, 0)) initialcost  FROM product INNER JOIN product_rating using (productId) WHERE details = ?",[details],(err,file)=>{
               if (err) throw err;
               file.map(files => { 
                files["authur"] = "Eze Ogbonnaya"
                if(files.productrating){      
           const prating =JSON.parse(files.productrating);
           const mainrating =[];
           for (var i=0; i<Object.values(prating).length; i++){
            mainrating.push(parseInt(Object.values(prating)[i][0]))
         }
              const reducer = (a,b) => (a+b)
              const prating2 =mainrating.map(pratings => pratings*20)
          //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
              files["numOfRating"] = Object.keys(prating).length
              if(Object.values(prating).length > 0){
                  files["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
              }
             else{
                files["percentrating"] = 0
             }
                }
              
            })
               res.send(file)
           })
        })
        

router.get('/product/rating',(req,res)=>{
    conn.query('SELECT * FROM product INNER JOIN product_rating  USING (productId) Where productId = 11', (err,file)=>{
        if (err) throw err;
    //    console.log(file)
    file.map(files => { 
        files["authur"] = "Eze Ogbonnaya"
        if(files.productrating){      
            const prating =JSON.parse(files.productrating);
            const mainrating =[];
            for (var i=0; i<Object.values(prating).length; i++){
             mainrating.push(parseInt(Object.values(prating)[i][0]))
          }
               const reducer = (a,b) => (a+b)
               const prating2 =mainrating.map(pratings => pratings*20)
           //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
               files["numOfRating"] = Object.keys(prating).length
               if(Object.values(prating).length > 0){
                   files["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
               }
              else{
                 files["percentrating"] = 0
              }
                 }
    })
    
        res.send(file)
    })
})





 module.exports = router;