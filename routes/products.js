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


 router.get('/:category', (req,res)=>{
    const cat = req.params.category;
    const pagee = req.query.page || 1;
    const sort = req.query.sort;
    const currentPage = parseInt(pagee)
    const numPerPage = 20;
    var skip = (pagee-1)*20;
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
 var max = req.query.max ;
var min = req.query.min ;
conn.query('SELECT COUNT(*) as numOfRows,MAX(sellingprice) as max,MIN(sellingprice) as min from product WHERE subcat1 ="'+cat+'" OR subcat2 = "'+cat+'" OR subcat3 = "'+cat+'" ', (err,file)=>{
    if (err) throw err;
const numOfRows = file[0].numOfRows;
const numPages = Math.ceil(numOfRows/numPerPage);
console.log(sorter,numOfRows, max, min)
//(sellingprice >= "'+min+'" AND sellingprice <= "'+max+'") AND 
conn.query('SELECT *,  CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (`subcat1` = "'+cat+'" OR subcat2 = "'+cat+'" OR subcat3 = "'+cat+'") ORDER BY '+sorter+' '+setting+' LIMIT ? OFFSET ?',[numPerPage,skip],(err,file)=>{
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
        res.json({file,numPages,currentPage,numOfRows})
    })
})
})


router.get('/items/filter/:category', (req,res) =>{
    let pagee = parseInt(req.query.page) || null;
    var brands = req.query.brand || null;
    var sizes = req.query.size || null
    var colors = req.query.colour || null
    var min = req.query.min || null
    var max = req.query.max || null
    var sort = req.query.sort;
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
    let sorter ="";
    let setting="";
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
            sorter = `FIELD(brand,${brands})`    
            setting=""
            break;
    }
     console.log(brands, sizes, colors)
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')) AND subcat1='"+category+"'", (err, file)=>{
  if (err) throw err;
    const numOfRows = file[0].numOfRows; 
    const numPages = Math.ceil(numOfRows/20)  
    const pagee = parseInt(req.query.page) || 1; 
    const mainpage = pagee - 1;      
    const skips = mainpage*20;  
    console.log(skips)
    var currentPage = parseInt(req.query.page)    
    var numPerPage =20;
const sql = "SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"'))   AND subcat1='"+category+"' ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?";
conn.query(sql,[numPerPage, skips], (err, files)=>{
    if (err) throw err;
    res.json({files,numPages,currentPage,numOfRows})
})   
})  
})  

router.get('/distinct/subcats', (req,res)=>{
    conn.query("SELECT DISTINCT generalcategory FROM product",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 }) 
 
 //SECTIONS
 
 router.get('/section/one', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='fan' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/section/two', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='stabilizer' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/section/three', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='blender' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/section/four', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='refrigerator' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
 
 
  //Category colour,brand,size
 router.get('/:category/color', (req,res)=>{
     const cat = req.params.category;
    conn.query('select color, COUNT(color) as colory  from product  where `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by color',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 router.get('/:category/subcat2', (req,res)=>{
     const cat = req.params.category;
     conn.query('SELECT DISTINCT `subcat2` FROM product WHERE `subcat1` = "'+cat+'"',(err,files)=>{
         if (err) throw err;
         res.send(files)
     }) 
  })
 router.get('/:category/size', (req,res)=>{
     const cat = req.params.category;
     conn.query('select size, COUNT(size) as sizey  from product  where `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by size',(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/:category/brand', (req,res)=>{
      const cat = req.params.category;
     conn.query('select brand, COUNT(brand) as brandy  from product  where `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by brand',(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/:category/price', (req,res)=>{
     const cat = req.params.category;
    conn.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,file)=>{
        if (err) throw err;
        res.send(file)
    })
 })

 router.get('/:category/category', (req,res)=>{
    const cat = req.params.category;
   conn.query('SELECT DISTINCT subcat2 FROM product  WHERE `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,file1)=>{
       if (err) throw err;
       conn.query('SELECT DISTINCT subcat3 FROM product  WHERE `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,file2)=>{
        if (err) throw err;
       const files = [...file1,...file2]
        res.send(files)
    })
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

router.get("/allcategories", (req,res)=>{
    conn.query("SELECT DISTINCT subcat1 FROM product", (err,file)=>{
        if (err) throw err;
        res.send(file)
    })
})

 module.exports = router;