import React, { Component } from 'react';
// import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import "./main.css"
import querystring from "query-string"
import ReactHtmlParser from "react-html-parser"
import Suggestions from "./suggestions"

const logo = require("./images/goodmark.ico")
const logo2 = require("./images/good16.ico")
const sad = require("./images/sadmain.ico")

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product:[],
            display: "none",
            comment:"Excellent Product",
            chooserating:5,
            similiarproducts:[],
            similiarproductsbybrand:[]
         }
    }
    componentDidMount =()=>{
        axios.get(`http://localhost:5000/product/${this.props.match.params.details}`)
        .then(res => this.setState({product: res.data}))
        .catch(err => console.warn(err))  
        
        axios.get(`http://localhost:5000/similiar/${this.props.match.params.details}`)
        .then(res => this.setState({similiarproducts: res.data}))
        .catch(err => console.warn(err))  

        axios.get(`http://localhost:5000/similiarbrand/${this.props.match.params.details}`)
        .then(res => this.setState({similiarproductsbybrand: res.data}))
        .catch(err => console.warn(err))  

        const parsedquery = querystring.parse(this.props.match.location);
        console.log("parsequery", parsedquery)

        window.addEventListener("click", this.handlemodalclick)

      }
      handlemodalclick =(e) =>{
        //  this.modaldiv.style.display = "none"
        if(e.target == this.modaldiv){
            this.setState({display:"none"})
        }
      }
       displaymodal =() =>{
         this.setState({display:"block"})
      }
      undisplaymodal =() =>{
        this.setState({display:"none"})
     }
     change =(e) =>{
        this.setState({comment:e.target.value})
        if(this.state.comment.length >= 29){
            alert("please!!! comment cannot exceed 30 characters ")
        }
     }
     change2=(e)=>{
         if(e.target.value > 5){
            return this.setState({chooserating:1})
         }
         else if(e.target.value < 1){
            return this.setState({chooserating:1})
         }
            else if(e.target.value >4 && e.target.value <= 5){
            return    this.setState({comment: "Excellent Product",chooserating:e.target.value})
            }
         else if(e.target.value >3 && e.target.value <= 4){
               this.setState({comment: "Very Good Product",chooserating:e.target.value})
           }
          else if(e.target.value >2 && e.target.value <= 3){
               this.setState({comment: "Good Product",chooserating:e.target.value})
           }
           else if(e.target.value >1 && e.target.value <= 2){
               this.setState({comment: "Average Product",chooserating:e.target.value})
           }
          else if(e.target.value == 1){
               this.setState({comment: "Very Poor",chooserating:e.target.value})
           }          
     }
     submitrating =(e)=>{
         e.preventDefault();
         const data ={
             userId: 20,
             rating: this.state.chooserating,
             comment: this.state.comment
         }
        axios.post(`http://localhost:5000/${this.props.match.params.details}/rate`, {data: JSON.stringify(data)})
        .then(res => console.log(res.data))
        .catch(err => console.log(err)) 

        this.setState({comment:"Thank you for reviewing"})
     }
     changesrc =(src, e)=>{
    this.imgelement.src = src;    
    this.imgelement.style.border = "2px solid black";
    console.log(this)

    }
    render() { 

   return (   
         <div className="container" style={{boxShadow:"2px 1px 3px 3px lightgrey",backgroundColor:"#f5f5f0"}}>
             <Suggestions></Suggestions>
        {this.state.product.map((products) =>
       <div key={products.productId}>
           <small style={{textTransform:"capitalize"}}> <a href="">home</a>  / 
             <a href="">{products.subcat1 }</a>  / <a href="">{products.subcat2 }</a>  / <a href="">{products.subcat3 }</a> / <a href="">{products.brand }</a> 
             <span className="fa fa-arrow-right" style={{padding:"10px"}}></span>
              <span style={{color:"grey"}}>{products.details }</span> - </small>
           <br/>
        <div>
           <center>
        {JSON.parse(products.officialimg)[1] !== undefined && JSON.parse(products.officialimg) !== undefined ? 
        <img src={require (`./images/${JSON.parse(products.officialimg)[1]}`)} style={{maxWidth:"70%"}} /> : null}
               
           </center>
           <br/>
        <div className="row" style={{width:"100%"}}> 
            <div className="col-12 col-lg-6">

            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width:"10%", position:"absolute"}}>
            {Object.values(JSON.parse(products.img1)).map(img =>
            <div key={img} style={{border:"1px solid grey"}}>           
               <img  onClick={() => this.changesrc(require(`./images/${img}`))} src={require(`./images/${img}`)} className="img-responsive" style={{padding:"0px",maxWidth:"100%"}}></img>
            </div> 
          )} 
          </div>

              <img ref={(a)=> this.imgelement = a} src={require (`./images/${JSON.parse(products.img1)[1]}`)} style={{maxWidth:"100%"}} className="img-responsive"></img>
              <h2 style={{float:"right", top:"5%",right:"10%", position: "absolute"}}>
                    <i className="fab fa-gratipay" style={{color:"orange"}}></i>
                </h2>
            </div>
            <div className="col-12 col-lg-6" style={{width:"100%"}} >
            
           <p style={{textTransform:"uppercase"}}>{products.details} -{products.model} -{products.color}</p>
            <small>Brand : {products.brand}</small><br/>
            <small>SKU code : 20202908{products.productId}</small><br/>
            <small>Warranty: {products.warranty}</small><br/>
            <small>
                <h2 style={{float:"right"}}>
                    <i className="fab fa-gratipay" style={{color:"orange"}}></i>
                </h2>
            <div className="outer">
          <div className="inner" style={{width:`${products.percentrating || 0}%`}}>

          </div>
        </div> <b>({products.numOfRating || 0} Reviews) </b>
           </small>
           <hr/>
           {products.initialprice !== null ? <div>
           <h4 style={{float:"left"}}>{products.mainprice}</h4><small style={{float:"left",textIndent:"10px",color:"orange"}}>- {products.discount}%</small><p style={{float:"right",textDecoration:"line-through",color:"grey"}}>{products.initialcost}</p>
           </div> : <h4>{products.mainprice}</h4>}
           <br/>
            <hr/>
            <div className="row">
                <div className="col-4">
                <small>Colours Available: </small>
                </div>
                <div className="col-8">
                { JSON.parse(products.coloursavail).split(",").length > 1 ? JSON.parse(products.coloursavail).split(",").map(colors=>
              <div key={colors}>
                  <input type="checkbox"></input> <small style={{textTransform:"uppercase"}}> {colors}</small>
              </div>  
           )  : <p>{products.color}</p>}   
                </div>
            </div> 
           
            <button type="button" className="cartbutton" style={{}}>
                <span className="fa fa-cart-plus" style={{float: "left", color:"white"}}></span>
            <small style={{fontWeight:"bold",color:"white"}}>ADD TO CART</small></button>
            <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
            <small><a href="">PROMOTIONS</a></small><br/>
            <small>share this product on</small><br/>
            </div>
            </div>   
            <br/>
            <div className="row showcase" style={{position:"sticky",top:"0px",left:"0px",backgroundColor:"white",zIndex:"2",color:"rgb(0, 119, 179)",padding:"10px"}}>
              <div className="col-12">
                 <b style={{textTransform:"uppercase"}}>{products.details} -{products.model} -{products.color}</b><br/>
                <b style={{color:"orange"}}>{products.mainprice}</b><b style={{float:"right"}}>{- products.discount}</b><br/>
              </div>
            </div>
               <center>
                   <h3 style={{textTransform:"uppercase", textAlign:"center"}}>{products.model}</h3>
         <p style={{width:"100%",textTransform:"capitalize"}}>{ReactHtmlParser(products.entrytext)}</p>
         <br/>
         
             {products.brand === "lg" ? <small style={{color:"grey"}}>
             The image of the product are for illustration purpose only and may differ from actual product.
51% Energy Saving In Refrigerator with Inverter Linear Compressor(ILC).
 Based on third party test under standard test conditions (ISO 15502) conducted exclusively for energy consumption,
  Models tested GBB530NSQWB (Reciprocating Compressor),
  GBB530NCXE (Inverter Linear Compressor).
 Actual Results may vary from model to model and also depends upon the kind of usage under general conditions.
             </small> : null}
        
         <div className="row">
            <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-between",overflow:"auto"}}>
         {products.featuresimg !== null && JSON.parse(products.img1)[2] !== undefined ? Object.keys(JSON.parse(products.featuresimg)).map(featureimg =>
         <div  key={featureimg} style={{padding:"15px"}}>
              <img src={require(`./images/${JSON.parse(products.featuresimg)[featureimg]}`)} style={{maxWidth:"100%",maxHeight:"100%"}} alt=""/>
         <div style={{color:"grey"}}>{ReactHtmlParser(featureimg)}</div>
          </div>         
         ) : null }
         
         </div>
        </div>
        </center> 

            <br/>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px"}}>Key Features :</p>
                {products.features !== null ? JSON.parse(products.features).split(',').map(feature =>
                <div style={{border: "1px solid lightgrey", padding:"2px",margin:"0px"}}>
                <small>
            <ul key={feature} style={{listStyleImage: `url(${logo})`}}>
                <li style={{textTransform: "capitalize"}}>{ReactHtmlParser(feature)}</li>
            </ul>   
            </small>   
            </div>      
                ) : "N/A"}
                </div>
            {JSON.parse(products.img1)[2] !== undefined ? 
           <div className="col-12 col-lg-6">
              <img src={require (`./images/${JSON.parse(products.img1)[2]}`)} style={{width:"100%"}} className="img-responsive" alt=""/>
           </div> : 
           <div className="col-12 col-lg-6" style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
           {JSON.parse(products.featuresimg) !== null ? Object.keys(JSON.parse(products.featuresimg)).map(featureimg =>
            <div key={featureimg} style={{padding:"15px"}}>
                <img src={require(`./images/${JSON.parse(products.featuresimg)[featureimg]}`)} alt=""/>
           <p style={{color:"grey"}}>{featureimg}</p>
            </div>
           ) : null}
           </div>
           } 
            </div>
         <br/>
         <center>
         <h3>ABOUT THE PRODUCT</h3>
         <small style={{textTransform:"capitalize"}}>
         {ReactHtmlParser(products.productdescription)}
         </small>
         </center>
        <br/><br/>
            <div className="row">
            {JSON.parse(products.img1)[3] !== undefined ? 
           <div className="col-12 col-lg-6">
              <img src={require (`./images/${JSON.parse(products.img1)[3]}`)} style={{width:"100%"}} className="img-responsive" alt=""/>
           </div> : null} 

                <div className="col-12 col-lg-6">
                <p>Usage / Maintenance : </p>
                {products.maintenance !== null ? JSON.parse(products.maintenance)["usage"].split(',').map(usage =>
                <small>                  
                    <ul key={usage} style={{listStyleImage: `url(${logo2})`}}>
                <li style={{textTransform: "capitalize"}}>{usage}</li>
               </ul>   
                </small>           
                ) : null}
                </div>
            </div>
           <br/>

            <center>
           <h3>ABOUT THE BRAND</h3>
         <small style={{textTransform:"capitalize"}}>
         {ReactHtmlParser(products.branddescription)}
         </small>
         </center>
         <br/>
           <div className="row">
                <div className="col-12 col-lg-6">
                    <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px"}}>Key specifications :</p>
                    <div style={{border: "0.5px solid lightgrey", padding:"10px", margin:"0px"}}>
                        <small>
                             <b>Brand : {products.brand}</b><br/>
                <b>Model : {products.model}</b><br/>
                <b>Colour : {products.color}</b><br/>
                <b>Colours Available : {JSON.parse(products.coloursavail) || products.color}</b><br/>
                <b>Capacity: {products.size}{products.subcat1==="refrigerator" ? " Litres" : products.subcat1==="fan" ? " inches" : " kg" }</b><br/>
                <b>Weight : {products.weight || null}</b><br/>
                <b>Sku Code : 20202908{products.productId}</b><br/>
                <b>Store : {products.store}</b><br/>
                <b>Ratings : {products.numOfRating || 0}</b><br/>
                <b>Total no of searches : {products.rating}</b><br/>
                        </small>
                       
                    </div>
                
                </div>
            {(JSON.parse(products.img1)[4]) !== undefined ? 
           <div className="col-12 col-lg-6">
              <img src={require (`./images/${JSON.parse(products.img1)[4]}`)} style={{width:"100%"}} className="img-responsive" alt=""/>
           </div> : null} 
            </div>

     <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.state.display}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="modaldiv"  style={{backgroundColor:"white"}}>
             <div className="inner-modal">
                     <h4 style={{padding:"10px"}}>Comment</h4>
                     <center>   
                       <div className="outer" >
                        <div className="inner" style={{width:`${this.state.chooserating*20}%`}}>
                         </div>
                       </div>
                       <div><br/>
             <form onSubmit={this.submitrating}>
    <input type="number" name=""  maxLength="1" onChange={this.change2}  value={this.state.chooserating} style={{width:"10%",position:"absolute",right:"5%",top:"20%"}}/><br/>
<textarea name="comment"  maxLength="30" cols="5" rows="3" value={this.state.comment} onChange={this.change} className="form-control" style={{width:"70%"}}></textarea>
                     <span style={{color:"grey"}}>{this.state.comment.length}/30</span> <br/><br/>
<button className="btn btn-link"   onClick={this.undisplaymodal} style={{color:"red"}} type="button">Cancel</button> 
<button className="btn btn-link" style={{float:"right"}} type="submit">Submit</button>
                     </form>
                
               </div>
             </center>
         </div>

     </div>
 </div>
<div className="row">
{typeof(JSON.parse(products.officialimg)) === "object" ? Object.values(JSON.parse(products.officialimg)).map(officialimgs => 
  <div className="col-6">
    <img src={require(`./images/${officialimgs}`)} style={{width:"100%"}} className="img-responsive"/>
  </div>
  ) : null}
</div>
         <br/>
<div className="row">
            <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:"white",padding:"10px"}}>
             <small style={{fontSize:"20px"}}>Customer Reviews</small><button style={{float:"right"}} onClick={this.displaymodal}><a href="#modaldiv">Rate</a></button><br/>
             <hr/>
             <div className="row">
             <div className="col-4">
                 <p style={{padding:"0px",margin:"0px"}}>RATING ({products.numOfRating || 0} ) </p>
            <h1>{(products.percentrating/20).toFixed(2)} </h1>
          <div className="outer">
          <div className="inner" style={{width:`${products.percentrating || 0}%`}}>
             </div>
            </div>

             </div>
             <div className="col-8">
             <p style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({products.numOfRating || 0} ) </p>
             {Object.keys(JSON.parse(products.productrating)).map((key)=> 
               <div>                 
                    <p style={{padding:"0px"}}><span className="fa fa-comment-dots"></span> {JSON.parse(products.comments)[key]}</p>
                    <small>by {key} </small> <br/>
             <small>{JSON.parse(products.productrating)[key].split(",")[1]}</small>
                <div className="outer" style={{float:"right"}}>
                <div className="inner" style={{width:`${(JSON.parse(products.productrating)[key].split(",")[0])*20 || 0}%`}}>
                </div>
                </div>
                <hr/>
               </div>
              
             )}
             </div>
             </div>
            </div>
        </div>  
<br/>
<div className="row" style={{padding:"0px"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Similiar Products You May Like </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.similiarproducts.map(section3 => 
                    <div className="col-6  col-md-3 col-lg-2" key={section3.productId}  >
                        <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
                        <div style={{height:"100%"}}>
                       <img src={require( `./images/${section3.mainimg}`)} style={{maxWidth:"100%", padding:"0px"}} alt=""/> 
                       </div>
<small><a href="" style={{color:"black",textTransform:"capitalize"}}>{section3.details.length > 30 ? section3.details.slice(0,30)+ "..." : section3.details +"-"+ section3.model +"-"+ section3.color}</a> </small><br/>
                   <b>{section3.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner" style={{width:`${section3.percentrating}%`}}>

                           </div>
                   </div><small style={{fontSize:"12px"}}>({section3.numOfRating})</small>
                   </small>
                   </div>
                    </div>
                    )}
               </div>
             </div>

             <br/>
<div className="row" style={{padding:"0px"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Other Products From This Brand </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.similiarproductsbybrand.map(section3 => 
                    <div className="col-6  col-md-3 col-lg-2" key={section3.productId}  >
                        <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
                       <img src={require( `./images/${section3.mainimg}`)} style={{maxWidth:"100%", padding:"0px"}} alt=""/> 
<small><a href="" style={{color:"black",textTransform:"capitalize"}}>{section3.details.length > 30 ? section3.details.slice(0,30)+ "..." : section3.details +"-"+ section3.model +"-"+ section3.color}</a> </small><br/>
                   <b>{section3.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner" style={{width:`${section3.percentrating}%`}}>

                           </div>
                   </div> <small style={{fontSize:"12px"}}>({section3.numOfRating})</small>
                   </small>
                   </div>
                    </div>
                    )}
               </div>
             </div>
  <br/>


  
           <div>               
                <b style={{textTransform: "uppercase"}}>fails to start</b>
                {products.maintenance !== null ? JSON.parse(products.maintenance)["fts"].split(',').map(ftss =>
                <div>
                   <ul key={ftss} style={{listStyleImage: `url(${sad})`}}>
                <li style={{textTransform: "capitalize"}}>{ftss}</li>
            </ul>   
                </div>
            ) : null}
               
               <b style={{textTransform: "uppercase"}}>blade is rolling slowly :</b>
                {products.maintenance !== null ? JSON.parse(products.maintenance)["frs"].split(',').map(frss =>
                <div>
                     <ul key={frss} style={{listStyleImage: `url(${sad})`}}>
                <li style={{textTransform: "capitalize"}}>{frss}</li>
             </ul>   
                </div>
             ):null}
                
                <b style={{textTransform: "uppercase"}}>blade is blowing backward/ engine is shacking :</b>
                { products.maintenance !== null && JSON.parse(products.maintenance)["bb"] !== undefined ? JSON.parse(products.maintenance)["bb"].split(',').map(bbs =>
               <div>
            <ul key={bbs} style={{listStyleImage: `url(${sad})`}}>
                <li style={{textTransform: "capitalize"}}>{bbs}</li>
            </ul>   
            </div>         
                ) : null}
                
             <b style={{textTransform: "uppercase"}}>Excess repeated noise :</b>
                {products.maintenance !== null ? JSON.parse(products.maintenance)["mn"].split(',').map(mns =>
                <div>
            <ul key={mns} style={{listStyleImage: `url(${sad})`}}>
                <li style={{textTransform: "capitalize"}}>{mns}</li>
            </ul>          
            </div>  
                ): null}
             </div> 
            </div>
           </div>)}
           </div>          
         );
    }
}
 
export default Details;