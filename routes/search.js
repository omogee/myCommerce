var express = require('express')
var conn = require('./connection')
const router = express.Router()

 router.get('/items/search', (req,res) =>{ 
    const search = req.query.search;
    let min= req.query.min; 
    let max = req.query.max;
    console.log("min", min,max) 
    
    if(req.query.brand !== "undefined" || req.query.size !== "undefined" || req.query.colour !== "undefined"){
        var brands = req.query.brand
    var sizes = req.query.size
    var colors = req.query.colour
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length 
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)  
    let sort = req.query.sort;
    switch (sort){
        case "low-high":
            sorter = "sellingprice"
            setting= "ASC"
            break;
            case "high-low":
            sorter = "sellingprice"
            setting= "DESC"
            break;
            case "cust-rating":
            sorter = "customerRating"
            setting= "ASC"
            break;
            case "warranty":
            sorter = "warranty"
            setting= "ASC"
            break;
            default:
            sorter = `FIELD(brand, ${brands})`
            setting="ASC"
            break;
    }
    conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")) AND details LIKE '%"+search+"%'  AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')", (err, nofile)=>{
        if (err) throw err;
        const numOfRows = nofile[0].numOfRows;
        const numPages = Math.ceil(numOfRows/20)
        const pagee = req.query.page || 1;  
        const mainpage = parseInt(pagee)
        console.log(mainpage)  
    const skips = (mainpage-1)*20;
    console.log("skips",skips)          
    var currentPage = parseInt(req.query.page) 
    var numPerPage =20;
    conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")) AND details LIKE '%"+search+"%' AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"') ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
        if (err) throw err;
        files.map(file => { 
    file["authur"] = "Eze... Ogbonnaya..."
            if(file.productrating){      
                file["authur"] = "Eze... Ogbonnaya..."
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
        console.log("fetching")
        res.json({files,numPages,currentPage,numOfRows})
    })  
})
}else{
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE details LIKE '%"+search+"%' AND sellingprice >= '"+min+"' AND sellingprice <= '"+max+"' ", (err, nofile)=>{
    if (err) throw err;
    let sort = req.query.sort;
    switch (sort){
        case "low-high":
            sorter = "sellingprice"
            setting= "ASC"
            break;
            case "high-low":
            sorter = "sellingprice"
            setting= "DESC"
            break;
            case "cust-rating":
            sorter = "customerRating"
            setting= "ASC"
            break;
            case "warranty":
            sorter = "warranty"
            setting= "ASC"
            break;
            default:
            sorter = "rating"
            setting="ASC"
            break;
    }
    const numOfRows = nofile[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20)
    const pagee = parseInt(req.query.page) || 1; 
const mainpage = pagee - 1;
const skips = mainpage*20;
console.log(skips)
var currentPage = parseInt(req.query.page)
var numPerPage =20;
conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE details LIKE '%"+search+"%' AND sellingprice >= '"+min+"' AND sellingprice <= '"+max+"' ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
    if (err) throw err;
    files.map(file => { 
        file["authur"] = "Eze... Ogbonnaya..."
        console.log("prating",file.productrating)
        if(file.productrating){      
            file["authur"] = "....Eze... Ogbonnaya..."
           
          const prating =JSON.parse(file.productrating)
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
          // <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.griddetails}`}}>
          //         <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.listdetails}`}}>
     //<ModalSideNavbar/> put back in app.js
        }) 
    console.log("fetching only search")
    res.json({files,numPages,currentPage,numOfRows})
}) 
})  
}   
})    
router.post('/search', (req,res)=>{
     const search = JSON.parse(req.body.data);
conn.query("SELECT COUNT(*) AS numOfRows from product WHERE details LIKE '%"+search+"%'", (err, nofile)=>{
    if (err) throw err;
    const numOfRows = nofile[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20);
    const pagee = parseInt(req.body.page) || 1; 
    const mainpage = pagee - 1;
    const skips = mainpage*20;
    var currentPage = parseInt(req.body.page) || 1;
    var numPerPage =20;
    console.log(numOfRows)
    conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE details LIKE '%"+search+"%' LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
        if (err) throw err;
        files.map(file => {   
            file["authurrr"] = "Eze..... Ogbonnaya"
            if(file.productrating){      
                file["authur"] = "Eze Okereke"
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
        res.json({files,numPages,currentPage,numOfRows})
    }) 
})
})
router.get('/items/searchbrand', (req,res)=>{
    const search = req.query.search 
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT brand FROM product WHERE details LIKE '%"+search+"%' ",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.get('/items/searchcolour', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT color FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.get('/items/searchsize', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})


router.post('/searchbrand', (req,res)=>{
    const search = JSON.parse(req.body.data); 
   conn.query("SELECT DISTINCT brand FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.post('/searchcolour', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT color FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.post('/searchsize', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})


router.get('/category/searched/price', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") ORDER BY FIELD(brand, "+brands+")",(err,file)=>{
       if (err) throw err;
       console.log(file)
       res.send(file)
   })
})


 module.exports = router;