import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getProducts, setLoadingtoTrue,submitsearcher,allsubcategories} from './store'
import {compose} from 'redux'
import {withRouter,Redirect} from 'react-router-dom'
import queryString from 'query-string'
import {checkfilter} from "./store"

class catalogueSearchSidenavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           customerrating:null,
             displaybrand: "",
             displaysize: "",
             displayinches:"",
             displaylitres:"",
             displaywattage:"",
             displayvendor: "",

             filteredbrand:[],
             filteredsize:[],
             filteredinches:[],
             filteredlitres:[],
             filteredWattage:"",
             filteredvendor:[],

             first:true,
             testedproducts:[],
             highestprice : 0,
             lowestprice:0,
             price:{},
             parsedUrl: {},
             applycolour : "black",
             val:[],

             pendingBrand:"",
            pendingLitres:"",
            pendingInches:"",
            pendingColor:"",
            pendingWattage:"",
            pendingvendor:"",

             brandDisplayIcon:"fas fa-chevron-right",
             brandDisplay:"none",
             displaybrandsave:"none",
             colorDisplayIcon:"fas fa-chevron-right",
             colorDisplay:"none",
             displaycolorsave:"none",
             inchesDisplayIcon:"fas fa-chevron-right",
             inchesDisplay:"none",
             displayinchessave:"none",
             litresDisplayIcon:"fas fa-chevron-right",
             litresDisplay:"none",
             displaylitressave:"none",
             wattageDisplayIcon:"fas fa-chevron-right",
             wattageDisplay:"none",
             displaywattagesave:"none",
             vendorDisplayIcon:"fas fa-chevron-right",
             vendorDisplay:"none",
             displayvendorsave:"none",

             brand:[],
             color:[],
             inches:[],
             litres:[],
             wattage:[],
             vendor:[],

             subcats:[],
             rating:""
             
         }
    }

    componentDidMount =()=>{
  //      getProducts(this.props.category)
  const parsedQuery = queryString.parse(this.props.location.search);
  const data={
    search: parsedQuery.q,
    category:this.props.category,
    brand: parsedQuery.brand,
    inches: parsedQuery.inches,
    litres:parsedQuery.litres,
    colour:parsedQuery.color,
    page:parsedQuery.page,
    max:parsedQuery.max,
    min:parsedQuery.min
  }

      this.props.submitsearcher(data)
    //  this.props.allsubcategories(data.category)
   
      const {brand, color,inches,litres,wattage,vendor,rating} = parsedQuery;
      if(parsedQuery.brand && parsedQuery.brand.length > 0){
        this.setState({brand:parsedQuery.brand.split(",")}); 
      }
      if(parsedQuery.color && parsedQuery.color.length > 0){
        this.setState({color:parsedQuery.color.split(",")}); 
      }
      if(parsedQuery.vendor && parsedQuery.vendor.length > 0){
        this.setState({vendor:parsedQuery.vendor.split(",")}); 
      }
      if(parsedQuery.inches && parsedQuery.inches.length > 0){
        this.setState({inches:parsedQuery.inches.split(",")}); 
      }
      if(parsedQuery.litres && parsedQuery.litres.length > 0){
        this.setState({litres:parsedQuery.litres.split(",")}); 
      }
      if(parsedQuery.rating && parsedQuery.rating.length > 0){
        this.setState({rating}); 
      }
      if(parsedQuery.wattage && parsedQuery.wattage.length > 0){
        this.setState({wattage:parsedQuery.wattage.split(",")}); 
      }
this.inputelement.max= `${this.state.highestprice}`
this.inputelement.min =`${this.state.lowestprice}`
this.inputelement.value=`${this.state.highestprice}`
    }
    navigation=()=>{
      let currentUrlParams = new URLSearchParams(window.location.search);
      let currencat =currentUrlParams.get("q")
      currentUrlParams.set("search", currencat) 
      currentUrlParams.delete("q")
      window.location.assign(`/category/search` +"?"+ currentUrlParams.toString());
    }
    brandchange=(e) =>{
      this.setState({displaybrand: e.target.value})
      var filteredbrand = []
      this.props.searchedbrands.map(brand => {
        if(brand.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredbrand.push({"brand":brand.brand,"brandy":brand.brandy})
        }
        this.setState({filteredbrand})
      })
    }  
    vendorchange=(e) =>{
      this.setState({displayvendor: e.target.value})
      var filteredvendor = []
      this.props.searchedvendor.map(vendor => {
        if(vendor.store.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredvendor.push({"store":vendor.store,"storey":vendor.storey})
        }
        this.setState({filteredvendor})
      })
    }  
    incheschange=(e) =>{
      this.setState({displayinches: e.target.value})
      var filteredinches = []
      this.props.searchedinches.map(size => {
        if(size.inches !== null){
        if(size.inches.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredinches.push({"inches":size.inches,"inchesy":size.inchesy})
        }
        this.setState({filteredinches}) 
      }
      })
    }
    wattagechange=(e) =>{
      this.setState({displaywattage: e.target.value})
      var filteredWattage = []
      this.props.searchedwattage.map(size => {
        if(size.wattage !== null){
        if(size.wattage.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
          filteredWattage.push({"wattage":size.wattage,"wattagey":size.wattagey})
        }
        this.setState({filteredWattage}) 
      }
      }) 
    }
    litreschange=(e) =>{
      this.setState({displaylitres: e.target.value})
      var filteredlitres = []
      this.props.searchedlitres.map(size => {
        if(size.litres !== null){
        if(size.litres.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredlitres.push({"litres":size.litres,"litresy":size.litresy})
        }
        this.setState({filteredlitres}) 
      }
      })
    }
    brandedchange = (e)=>{ 
      let brand = this.state.brand
      let pendingBrand = this.state.pendingBrand.split(",")
      if(brand.includes(e.target.value)){
         brand.splice(brand.indexOf(e.target.value), 1)
       this.setState({brand,displaybrandsave:"block"})
      }else if(pendingBrand.includes(e.target.value)){
        pendingBrand.splice(pendingBrand.indexOf(e.target.value), 1)
      this.setState({pendingBrand:pendingBrand.join(),displaybrandsave:"block"})
      if(this.state.pendingBrand.length === 1){
        this.setState({displaybrandsave:"none"})
      }  
     }
      else{
    if(this.state.pendingBrand.length > 0){
     this.setState({pendingBrand:this.state.pendingBrand+","+e.target.value,displaybrandsave:"block"},()=>{
     })
    }else{
      this.setState({pendingBrand:e.target.value,displaybrandsave:"block"})
    }
  }
   }
   vendoredchange = (e)=>{ 
     /*
    let vendor = this.state.vendor
    let pendingvendor = this.state.pendingvendor.split(",")
    if(vendor.includes(e.target.value)){
       vendor.splice(vendor.indexOf(e.target.value), 1)
     this.setState({vendor,displayvendorsave:"block"})
    }else if(pendingvendor.includes(e.target.value)){
      pendingvendor.splice(pendingvendor.indexOf(e.target.value), 1)
    this.setState({pendingvendor:pendingvendor.join(),displayvendorsave:"block"})
    if(this.state.pendingvendor.length === 1){
      this.setState({displayvendorsave:"none"})
    }  
   }
    else{
  if(this.state.pendingvendor.length > 0){
   this.setState({pendingvendor:this.state.pendingvendor+","+e.target.value,displayvendorsave:"block"},()=>{
   })
  }else{
    this.setState({pendingvendor:e.target.value,displayvendorsave:"block"})
  }
}*/

 }
   inchesedchange = (e)=>{ 
    let inches = this.state.inches
    let pendingInches = this.state.pendingInches.split(",")
    if(inches.includes(e.target.value)){
      inches.splice(inches.indexOf(e.target.value), 1)
     this.setState({inches,displayinchessave:"block"})
    }else if(pendingInches.includes(e.target.value)){
      pendingInches.splice(pendingInches.indexOf(e.target.value), 1)
    this.setState({pendingInches:pendingInches.join(),displayinchessave:"block"})
    if(this.state.pendingInches.length === 1){
      this.setState({displayinchessave:"none"})
    }  
   }else{
    if(this.state.pendingInches.length > 0){
     this.setState({pendingInches:this.state.pendingInches+","+e.target.value, displayinchessave:"block"},()=>{
      console.log("pendingInches",this.state.pendingInches.split(",").length)
     })
    }else{
      this.setState({pendingInches:e.target.value,displayinchessave:"block"})
    }
   }
  }
  litresedchange = (e)=>{ 
    let litres = this.state.litres
    let pendingLitres = this.state.pendingLitres.split(",")
    if(litres.includes(e.target.value)){
      litres.splice(litres.indexOf(e.target.value), 1)
     this.setState({litres,displaylitressave:"block"})
    }else if(pendingLitres.includes(e.target.value)){
      pendingLitres.splice(pendingLitres.indexOf(e.target.value), 1)
    this.setState({pendingLitres:pendingLitres.join(),displaylitressave:"block"})
    if(this.state.pendingLitres.length === 1){
      this.setState({displaylitressave:"none"})
    }  
   }else{
    if(this.state.pendingLitres.length > 0){
     this.setState({pendingLitres:this.state.pendingLitres+","+e.target.value, displaylitressave:"block"},()=>{
      console.log("pendingLitres",this.state.pendingLitres.split(",").length)
     })
    }else{
      this.setState({pendingLitres:e.target.value,displaylitressave:"block"})
    }
   }
  }
  wattagedchange = (e)=>{ 
    let wattage = this.state.wattage
    let pendingWattage = this.state.pendingWattage.split(",")
    if(wattage.includes(e.target.value)){
      wattage.splice(wattage.indexOf(e.target.value), 1)
     this.setState({wattage,displaywattagesave:"block"})
    }else if(pendingWattage.includes(e.target.value)){
      pendingWattage.splice(pendingWattage.indexOf(e.target.value), 1)
    this.setState({pendingWattage:pendingWattage.join(),displaywattagesave:"block"})
    if(this.state.pendingWattage.length === 1){
      this.setState({displaywattagesave:"none"})
    }  
   }else{
    if(this.state.pendingWattage.length > 0){
     this.setState({pendingWattage:this.state.pendingWattage+","+e.target.value, displaywattagesave:"block"},()=>{
      console.log("pendingWattage",this.state.pendingWattage.split(",").length)
     })
    }else{
      this.setState({pendingWattage:e.target.value,displaywattagesave:"block"})
    }
   }
  }
   coloredchange = (e)=>{
    let color = this.state.color
    let pendingColor = this.state.pendingColor.split(",")
    if(color.includes(e.target.value)){
      color.splice(color.indexOf(e.target.value), 1)
     this.setState({color,displaycolorsave:"block"})
    }else if(pendingColor.includes(e.target.value)){
      pendingColor.splice(pendingColor.indexOf(e.target.value), 1)
    this.setState({pendingColor:pendingColor.join(),displaycolorsave:"block"})
    if(this.state.pendingColor.length === 1){
      this.setState({displaycolorsave:"none"})
    }  
   }else{
    if(this.state.pendingColor.length > 0){
     this.setState({pendingColor:this.state.pendingColor+","+e.target.value,displaycolorsave:"block"},()=>{
      console.log("pendingColor",this.state.pendingColor.split(",").length)
     })
    }else{
      this.setState({pendingColor:e.target.value,displaycolorsave:"block"})
    }
  }
   }
   saveBrand = ()=>{
     if(this.state.brand.length > 0){   
    let currentUrlParams = new URLSearchParams(window.location.search);
    const getbrand = currentUrlParams.get("brand");
    const newbrand = this.state.pendingBrand+","+getbrand
    currentUrlParams.set("brand", newbrand);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
     }else{ 
       if(this.state.pendingBrand.length >0){
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("brand", this.state.pendingBrand);
      window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
       }else{
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.delete("brand");
        window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
       }
     }
   }
   saveVendor = (e)=>{
   
    if(this.state.vendor.length > 0){  
   let currentUrlParams = new URLSearchParams(window.location.search);
   let getvendor = currentUrlParams.get("vendor");
   if(getvendor.split(",").includes(e.target.value)){
     if(getvendor.split(",").length===1){
      currentUrlParams.delete("vendor");
      window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
     }else{
      const  parsedQuery = queryString.parse(this.props.location.search);
      getvendor = parsedQuery["vendor"].split(",")
      const index = getvendor.indexOf(`${e.target.value}`);
      getvendor.splice(getvendor.indexOf(`${e.target.value}`), 1)
      getvendor = getvendor.join()
  //    const spliturl2 = spliturl.join()
     currentUrlParams.set("vendor",getvendor);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
     }
   }else{
    const newvendor = e.target.value+","+ getvendor
    currentUrlParams.set("vendor", newvendor);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
   }
  }
  else{
    let currentUrlParams = new URLSearchParams(window.location.search);
    const newvendor = e.target.value
    currentUrlParams.set("vendor", newvendor);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
   }
  
  }
   saveInches = ()=>{
    if(this.state.inches.length > 0){   
   let currentUrlParams = new URLSearchParams(window.location.search);
   const getinches = currentUrlParams.get("inches");
   const newinches = getinches+","+this.state.pendingInches
   currentUrlParams.set("inches", newinches);
   window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }else{
     let currentUrlParams = new URLSearchParams(window.location.search);
     currentUrlParams.set("inches", this.state.pendingInches);
     window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
  }
  saveWattage = ()=>{
    if(this.state.wattage.length > 0){ 
   let currentUrlParams = new URLSearchParams(window.location.search);
   const getwattage = currentUrlParams.get("wattage");
   const newwattage = getwattage+","+this.state.pendingWattage
   currentUrlParams.set("wattage", newwattage);
   window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }else{
     let currentUrlParams = new URLSearchParams(window.location.search);
     currentUrlParams.set("wattage", this.state.pendingWattage);
     window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
  }
  saveLitres = ()=>{
    if(this.state.litres.length > 0){ 
   let currentUrlParams = new URLSearchParams(window.location.search);
   const getlitres = currentUrlParams.get("litres");
   const newlitres = getlitres+","+this.state.pendingLitres
   currentUrlParams.set("litres", newlitres);
   window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }else{
     let currentUrlParams = new URLSearchParams(window.location.search);
     currentUrlParams.set("litres", this.state.pendingLitres);
     window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
  }
   saveColor = ()=>{
    if(this.state.color.length > 0){
    
   let currentUrlParams = new URLSearchParams(window.location.search);
   const getcolor = currentUrlParams.get("color");
   const newcolor = getcolor+","+this.state.pendingColor
   currentUrlParams.set("color", newcolor);
   window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }else{
     let currentUrlParams = new URLSearchParams(window.location.search);
     currentUrlParams.set("color", this.state.pendingColor);
     window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
  }
   pricechange = (e)=>{
     this.setState({highestprice : e.target.value,price:e.target.value, applycolour :"blue"})
   }
   highestpricechange = (e) =>{
    this.setState({highestprice : e.target.value, applycolour :"blue"})
    console.log(this.state.highestprice)
   }
   lowestpricechange = (e) => {
    this.setState({lowestprice : e.target.value, applycolour : "blue"})
   }
   pricefilter=(e)=>{
     e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("max",this.state.highestprice);
    console.log("max", this.state.highestprice)
    currentUrlParams.set("min",this.state.lowestprice);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
   }
  resetproductrating=()=>{
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.delete("rating");
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
  }
   customerratingchange =(e)=>{
    e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("rating",e.target.value);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
   }
   brandDisplay =()=>{
       if(this.state.brandDisplay === "none"){
           this.setState({brandDisplay:"block",colorDisplay:"none",sizeDisplay:"none"})
           let currentUrlParams = new URLSearchParams(window.location.search);
      //    this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString()+"#inche")
       }else{
        this.setState({brandDisplay:"none"})
       }
       if(this.state.brandDisplayIcon === "fas fa-chevron-right"){
        this.setState({brandDisplayIcon:"fas fa-chevron-left",colorDisplayIcon:"fas fa-chevron-right",sizeDisplayIcon:"fas fa-chevron-right"})
    }else{
     this.setState({brandDisplayIcon:"fas fa-chevron-right"})
    }
   }
 
   colorDisplay =()=>{
    if(this.state.colorDisplay === "none"){
        this.setState({colorDisplay:"block",brandDisplay:"none",sizeDisplay:"none"})
    }else{
     this.setState({colorDisplay:"none"})
    }
    if(this.state.colorDisplayIcon === "fas fa-chevron-right"){
     this.setState({colorDisplayIcon:"fas fa-chevron-left",brandDisplayIcon:"fas fa-chevron-right",sizeDisplayIcon:"fas fa-chevron-right"})
 }else{
  this.setState({colorDisplayIcon:"fas fa-chevron-right"})
 }
}

inchesDisplay =()=>{
    if(this.state.inchesDisplay === "none"){
        this.setState({inchesDisplay:"block",brandDisplay:"none",colorDisplay:"none"})
    }else{
     this.setState({inchesDisplay:"none"})
    }
    if(this.state.inchesDisplayIcon === "fas fa-chevron-right"){
     this.setState({inchesDisplayIcon:"fas fa-chevron-left",brandDisplayIcon:"fas fa-chevron-right",colorDisplayIcon:"fas fa-chevron-right"})
 }else{
  this.setState({inchesDisplayIcon:"fas fa-chevron-right"})
 }
}
litresDisplay =()=>{
  if(this.state.litresDisplay === "none"){
      this.setState({litresDisplay:"block",inchesDisplay:"none",colorDisplay:"none",sizeDisplay:"none"})
  }else{
   this.setState({litresDisplay:"none"})
  }
  if(this.state.litresDisplayIcon === "fas fa-chevron-left"){
   this.setState({litresDisplayIcon:"fas fa-chevron-right",inchesDisplayIcon:"fas fa-chevron-left",colorDisplayIcon:"fas fa-chevron-left",sizeDisplayIcon:"fas fa-chevron-left"})
}else{
this.setState({litresDisplayIcon:"fas fa-chevron-left"})
}
}
wattageDisplay =()=>{
  if(this.state.wattageDisplay === "none"){
      this.setState({wattageDisplay:"block",litresDisplay:"none",inchesDisplay:"none",colorDisplay:"none",sizeDisplay:"none"})
  }else{
   this.setState({wattageDisplay:"none"})
  }
  if(this.state.wattageDisplayIcon === "fas fa-chevron-left"){
   this.setState({wattageDisplayIcon:"fas fa-chevron-right",litresDisplayIcon:"fas fa-chevron-left",inchesDisplayIcon:"fas fa-chevron-left",colorDisplayIcon:"fas fa-chevron-left",sizeDisplayIcon:"fas fa-chevron-left"})
}else{
this.setState({wattageDisplayIcon:"fas fa-chevron-left"})
}
}
updateCategory=(data)=>{
 let currentUrlParams = new URLSearchParams(window.location.search);
 currentUrlParams.set("q",data);
window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
}
    render() { 
      console.log(this.props.allcategory,this.props.allsubcat1)
        return (
            <div className="container" style={{backgroundColor:"rgb(242, 242, 242)",padding:"5px"}}>
               <small>FILTERS SELECTED</small>
              <div className="row" style={{padding:"5px"}}>
              {this.state.val.length > 1 ? this.state.val.map(value => 
                <div key={value} className="col-3" style={{padding:"2px"}}>
                <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
               <center>
               <small style={{fontSize:"11px"}}> {value.length > 8 ? value.slice(0,8)+"..." : value}</small>
               </center>
              </div>
               </div>            
      ) : this.state.val.length == 1 ?
      <div className="col-4" style={{padding:"2px"}}>
      <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
      <center>
      <small> {this.state.val[0].length > 13 ? this.state.val.slice(0,13)+"..." : this.state.val[0]}</small>
      </center>
    </div>
     </div>   
      : null}
              </div>
              <hr/>
              <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
                <div style={{ width:"100%", padding:"0px 10px"}} >
              <small> POPULAR CATEGORIES</small>
              <hr/>          
              {this.props.allcategory.length > 1 ?
                this.props.allcategory.map((category) => 
                <div key={category}>
         <small  style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.updateCategory(category.category)}>
         <input type="radio"/>   {category.category}</small>       
                </div>
                )
                :
                this.props.allsubcat1.map((subcat1) => 
                <div key={subcat1.subcat1}>
        <input type="radio"/> <small style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.updateCategory(subcat1.subcat1)}>
            {subcat1.subcat1}</small> 
           <small style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.updateCategory(subcat1.subcat2)}>
            {subcat1.subcat2}</small> 
            <small style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.updateCategory(subcat1.subcat3)}>
            {subcat1.subcat3}</small> 
                </div>
                )}
                </div>
                </div>
         <div style={{boxShadow:"1px 2px 5px 2px lightgrey",backgroundColor:"white",marginBottom:"5px", width:"100%", padding:"15px 10px"}}>
                <small>PRICES (₦)</small> <small   className={this.state.applycolour !== "black" ?"btn btn-warning btn-sm" : null} style={{float:"right"}}> <a href="" style={{color:`${this.state.applycolour}`}} onClick={this.state.applycolour !== "black" ? this.pricefilter : null}>Apply Filter</a></small><br/>
                 <hr/>
                 <center>
                <input type="range"  ref={(a)=> this.inputelement = a} name="price" min="" max="" value={this.state.highestprice} onChange={this.pricechange}/>
                <br/>
                <div className="row">
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.lowestprice} name="lowestprice" onChange={this.lowestpricechange} style={{width:"100%"}}/>
                  </div>
                  -
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.highestprice} style={{width:"100%"}} name="highestprice"  onChange={this.highestpricechange}/>
                  </div>
                  <div className="col-5">
                  <small><b>/{this.props.overallMin}</b></small>
                  </div>
                  <div className="col-5">
                  <small><b>/{this.props.overallMax}</b></small>
                  </div>
                </div>              
              </center>
             </div>
             <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
                <div style={{ width:"100%", padding:"0px 10px"}}>
              <div className="row" style={{padding:"0px 10px"}}>
{this.state.brand.length > 0 ? this.state.brand.map(b =>
   <div key={b} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {b.length > 8 ? b.slice(0,8)+"..." : b}</small>
 </div>
  </div> 
  ) : null}
  </div>
 
              <div>
<small>VENDORS  {this.state.vendor.length > 0 ?  `(${this.state.vendor.length})` : null}</small>
<small><span style={{float:"right"}} className={`${this.state.vendorDisplayIcon}`} ></span></small>
              </div>
              <hr/>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search vendors.." name="displayvendor" onChange={this.vendorchange} value={this.state.displayvendor} className="form-control" style={{borderLeft:"none"}} />
        </div>
           
    <div>
{this.state.filteredvendor.length > 0 ? 
this.state.filteredvendor.map(product => 
 <div key={product.store} >
  <small>
<input type='checkbox' onChange={this.saveVendor} checked={this.state.vendor.includes(encodeURI(product.store)) || this.state.pendingvendor.split(",").includes(encodeURI(product.store)) ? true : false }  name='vendor' value={encodeURI(product.store)}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/?search=standing fan&vendor=${product.store}`}> {product.store}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.storey}</small>
</small>
</div>)
: 
<div  id="vendor">
{ this.props.searchedvendor.map(product => 
     <div key={product.vendor}>
              <small style={{fontSize:"12px"}}> 
<input type='checkbox' onChange={this.saveVendor} checked={this.state.vendor.includes(encodeURI(product.store)) || this.state.pendingvendor.split(",").includes(encodeURI(product.store))? true : false } name='vendor' value={encodeURI(product.store)}/>
            <a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/${this.props.match.params.category}?vendor=${product.store}`}> {product.store}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.storey}</small>
      </small>        
            </div>)}
            
            </div>}
            </div>
            </div>
            </div>
  <div style={{boxShadow:"1px 2px 5px 2px lightgrey",backgroundColor:"white",marginBottom:"5px", width:"100%", padding:"15px 10px"}}>
              <small> CUSTOMER RATINGS</small>
              <div style={{float:"right"}}>
<small style={{paddingBottom:"10px",display:`${this.state.rating.length > 0 ? "inline-block" : "none"}`}}>
  <button onClick={this.resetproductrating} className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                Reset
                </button></small>
              </div>
              <hr/>
              <small>
  <small style={{padding:"0px 5px"}}>
    <input type="radio" name="customerrating" checked={this.state.rating === "4&above" ? true : false}  onChange={this.customerratingchange} value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}>
    <input type="radio" name="customerrating" checked={this.state.rating === "3&above" ? true : false} onChange={this.customerratingchange}  value="3&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}>
    <input type="radio" name="customerrating" checked={this.state.rating === "2&above" ? true : false} onChange={this.customerratingchange}  value="2&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" checked={this.state.rating === "1&above" ? true : false} name="customerrating" onChange={this.customerratingchange}  value="1&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}>
    <input type="radio" name="customerrating" checked={this.state.rating === "no_rating" ? true : false} onChange={this.customerratingchange}  value="no_rating"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small> <hr/>
{this.state.rating.length > 0 ? 
<small>
  Selected Filter : {this.state.rating}
</small>
: null}
</div>


 <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
                <div style={{ width:"100%", padding:"0px 10px"}}>
              <div className="row" style={{padding:"0px 10px"}}>
{this.state.brand.length > 0 ? this.state.brand.map(b =>
   <div key={b} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {b.length > 8 ? b.slice(0,8)+"..." : b}</small>
 </div>
  </div> 
  ) : null}
  </div>
 
              <div onClick={this.brandDisplay}>
<small>BRAND  {this.state.brand.length > 0 ?  `(${this.state.brand.length})` : null}</small>
<small><span style={{float:"right"}} className={`${this.state.brandDisplayIcon}`} ></span></small>
              </div>
              <hr/>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Brands.." name="displaybrand" onChange={this.brandchange} value={this.state.displaybrand} className="form-control" style={{borderLeft:"none"}} />
        </div>
            <div>
<small onClick={this.saveBrand} style={{paddingBottom:"10px",display:`${this.state.displaybrandsave}`}}>
  <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                save
                </button></small>
              </div>
    <div>
{this.state.filteredbrand.length > 0 ? 
this.state.filteredbrand.map(product => 
 <div key={product.brand} >
  <small>
<input type='checkbox' onChange={this.brandedchange} checked={this.state.brand.includes(encodeURI(product.brand)) || this.state.pendingBrand.split(",").includes(encodeURI(product.brand)) ? true : false }  name='brand' value={encodeURI(product.brand)}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/?search=standing fan&brand=${product}`}> {product.brand}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
</small>
</div>)
: 
<div style={{display:`${this.state.brandDisplay}`}} id="brand">
{ this.props.searchedbrands.map(product => 
     <div key={product.brand}>
              <small style={{fontSize:"12px"}}> 
<input type='checkbox' onChange={this.brandedchange} checked={this.state.brand.includes(encodeURI(product.brand)) || this.state.pendingBrand.split(",").includes(encodeURI(product.brand))? true : false } name='brand' value={encodeURI(product.brand)}/>
            <a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.brand}?search=standing fan&brand=${product.brand}`}> {product.brand}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
      </small>        
            </div>)}
            
            </div>}
            </div>
            </div>
            </div>
            <div style={{boxShadow:"1px 2px 5px 2px lightgrey",backgroundColor:"white",marginBottom:"5px", width:"100%", padding:"15px 10px"}}>
              <small> SELLER RATINGS</small> <hr/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small className="text-muted" style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small>
</div>
              
              <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
                <div style={{ width:"100%", padding:"0px 10px"}}>
                <div className="row" style={{padding:"0px 10px"}}>
{this.state.color.length > 0 ? this.state.color.map(c =>
   <div key={c} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {c.length > 8 ? c.slice(0,8)+"..." : c}</small>
 </div>
  </div> 
  ) : null}
  </div>

              <div onClick={this.colorDisplay}>
               <small style={{fontWeight:"bold",padding:"5px"}}>COLOR </small> <small>{this.state.color.length > 0 ?  `(${this.state.color.length})` : null}</small>
                <small><span style={{float:"right"}} className={`${this.state.colorDisplayIcon}`} ></span></small>
               </div>
               <hr/>
               <div>
<small onClick={this.saveColor} style={{paddingBottom:"10px",display:`${this.state.displaycolorsave}`}}>
  <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                save
                </button>
                </small>
                </div>
               <div style={{display:`${this.state.colorDisplay}`}}>
            {this.props.searchedcolours.map(product =>  <div key={product.color}>
              <small style={{fontSize:"12px"}}> 
<input type='checkbox' onChange={this.coloredchange} checked={this.state.color.includes(encodeURI(product.color)) || this.state.pendingColor.split(",").includes(encodeURI(product.color)) ? true : false } name='color' value={encodeURI(product.color)}/>
            <a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.color}?search=standing fan&color=${product.color}`}> {product.color}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.colory}</small>
           </small>
            </div>)}
            </div>
            </div>
            </div>


            <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
                <div style={{ width:"100%", padding:"0px 10px"}}>
                <div className="row" style={{padding:"0px 10px"}}>
{this.state.inches.length > 0 ? this.state.inches.map(i =>
   <div key={i} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {i.length > 8 ? i.slice(0,8)+"..." : i}</small>
 </div>
  </div> 
  ) : null}
  </div>

           <div onClick={this.inchesDisplay} >
           <small style={{fontWeight:"bold",padding:"5px"}}>SIZE  <small style={{fontWeight:"bold"}} className="text-muted"> (inches)</small></small>
 <small><span style={{float:"right"}} className={`${this.state.inchesDisplayIcon}`} ></span>
 {this.state.inches.length > 0 ?  `(${this.state.inches.length})` : null}
 </small>
            </div>
            <hr/>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend">
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes..." onChange={this.sizechange} value={this.state.displaysize} className="form-control" style={{borderLeft:"none"}} />
        </div>
  <div>
<small onClick={this.saveInches} style={{paddingBottom:"10px",display:`${this.state.displayinchessave}`}}>
  <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                save
                </button></small>
                </div>
                <div>
{this.props.searchedinches.length > 1 && this.state.filteredinches.length > 0 ? 
this.state.filteredinches.map(product =>  <div key={product.inches}>
  <small>
<input type='checkbox' onChange={this.inchesedchange} checked={this.state.inches.includes(product.inches) || this.state.pendingInches.includes(encodeURI(product.inches)) ? true : false } name='inches' value={product.inches}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/?search=standing fan&size=${product.inches}`}> {product.inches}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
</small>
</div>)
: 
<div style={{display:`${this.state.inchesDisplay}`}} id="inches">
{this.props.searchedinches.map(product => 
     <div key={product.inches}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.inchesedchange} checked={this.state.inches.includes(encodeURI(product.inches)) || this.state.pendingInches.includes(encodeURI(product.inches)) ? true : false } name='inches' value={encodeURI(product.inches)}/>
            <a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.size}?search=standing fan&size=${product.inches}`}> {product.inches}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
            </small>
            </div>)}
            </div>
            }
            <hr/>
            </div>
            </div>
            </div>



            <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
 <div style={{ width:"100%", padding:"0px 10px"}}>
  <div className="row" style={{padding:"0px 10px"}}>
{this.state.wattage.length > 0 ? this.state.wattage.map(w =>
   <div key={w} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {w.length > 8 ? w.slice(0,8)+"..." : w}</small>
 </div>
  </div> 
  ) : null}
  </div>
            <div onClick={this.wattageDisplay} >
           <small style={{fontWeight:"bold",padding:"5px"}}>Wattage  <small style={{fontWeight:"bold"}} className="text-muted"> </small></small>
 <small><span style={{float:"right"}} className={`${this.state.wattageDisplayIcon}`} ></span>
 {this.state.wattage.length > 0 ?  `(${this.state.wattage.length})` : null}
 </small>
            </div>
            <hr/>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend">
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes..." onChange={this.wattagechange} value={this.state.displaywattage} className="form-control" style={{borderLeft:"none"}} />
        </div>
  <div style={{paddingBottom:"5px"}}>
<small onClick={this.saveWattage} style={{paddingBottom:"10px",display:`${this.state.displaywattagesave}`}}>
  <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                save
                </button></small>
                </div>
                <div>
{this.props.searchedwattage.length > 1 && this.state.filteredWattage.length > 0 ? 
this.state.filteredWattage.map(product =>  <div key={product.wattage}>
  <small>
<input type='checkbox' onChange={this.wattagedchange} checked={this.state.wattage.includes(product.wattage) || this.state.pendingLitres.includes(encodeURI(product.wattage)) ? true : false } name='wattage' value={product.wattage}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/?search=standing fan&size=${product.wattage}`}> {product.wattage}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.wattagey}</small>
</small>
</div>)
: 
<div style={{display:`${this.state.wattageDisplay}`}} id="wattage">
{this.props.searchedwattage.map(product => 
     <div key={product.wattage}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.wattagedchange} checked={this.state.wattage.includes(encodeURI(product.wattage)) || this.state.pendingWattage.includes(encodeURI(product.wattage)) ? true : false } name='wattage' value={encodeURI(product.wattage)}/>
            <a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.size}?search=standing fan&size=${product.wattage}`}> {product.wattage}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.wattagey}</small>
            </small>
            </div>)}
            </div>
            }
            <hr/>
            </div>
            </div>
            </div>

 <div style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"20px 5px"}}>
 <div style={{ width:"100%", padding:"0px 10px"}}>
  <div className="row" style={{padding:"0px 10px"}}>
{this.state.litres.length > 0 ? this.state.litres.map(i =>
   <div key={i} className="col-3" style={{padding:"2px"}}>
   <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
   <small style={{fontSize:"11px"}}> {i.length > 8 ? i.slice(0,8)+"..." : i}</small>
 </div>
  </div> 
  ) : null}
  </div>
            <div onClick={this.litresDisplay} >
           <small style={{fontWeight:"bold",padding:"5px"}}>CAPACITY  <small style={{fontWeight:"bold"}} className="text-muted"> (l)</small></small>
 <small><span style={{float:"right"}} className={`${this.state.litresDisplayIcon}`} ></span>
 {this.state.litres.length > 0 ?  `(${this.state.litres.length})` : null}
 </small>
            </div>
            <hr/>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend">
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes..." onChange={this.litreschange} value={this.state.displaylitres} className="form-control" style={{borderLeft:"none"}} />
        </div>
  <div>
<small onClick={this.saveLitres} style={{paddingBottom:"10px",display:`${this.state.displaylitressave}`}}>
  <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange"}}>
                save
                </button></small>
                </div><br/><br/>
                <div>
{this.props.searchedlitres.length > 1 && this.state.filteredlitres.length > 0 ? 
this.state.filteredlitres.map(product =>  <div key={product.litres}>
  <small>  
<input type='checkbox' onChange={this.litresedchange} checked={this.state.litres.includes(product.litres) || this.state.pendingLitres.includes(encodeURI(product.litres)) ? true : false } name='litres' value={product.litres}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/?search=standing fan&size=${product.litres}`}> {product.litres}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
</small>
</div>)
: 
<div style={{display:`${this.state.litresDisplay}`}} id="litres">
{this.props.searchedlitres.map(product => 
     <div key={product.litres}>
     <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.litresedchange} checked={this.state.litres.includes(encodeURI(product.litres)) || this.state.pendingLitres.includes(encodeURI(product.litres)) ? true : false } name='litres' value={encodeURI(product.litres)}/>
<a style={{color:"black",textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.size}?search=standing fan&size=${product.litres}`}> {product.litres}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
            </small>
            </div>)}
            </div>
            }
            <hr/>
            </div>
            </div>
            </div>
<br/><br/><br/><br/>
            <div style={{position:"fixed",bottom:"0px",marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey", width:"100%", padding:"5px"}}>
                <div className="row" style={{ width:"100%", padding:"0px 10px"}}>
                 <div className="col-6" style={{padding:"5px"}}>
                  <button className="btn btn-lg" style={{width:"100%",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                    Cancel
                  </button>
                 </div>
                 <div className="col-6" style={{padding:"5px"}}>
                 <button onClick={this.navigation} className="btn btn-lg" style={{color:"white",width:"100%",backgroundColor:"orange",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                
          <small>Apply Filter {`(${this.props.numOfRows})`}</small>
         
          
                  </button>
                 </div>
                </div>
                </div>
            </div>
         );
    }
}
 const mapStateToProps =(store) =>{
   return{
    products:store.products,
    searchedbrands:store.searchedbrands,
    searchedcolours: store.searchedcolours,
    searchedsizes: store.searchedsizes,
    subcategories:store.subcategories,
    searchedlitres:store.searchedlitres,
    searchedinches:store.searchedinches,
    searchedwattage:store.searchedwattage,
    searchedvendor:store.searchedvendor,
    allsubcat1:[...store.allsubcat1,...store.allsubcat2,...store.allsubcat3],
    allsubcat2:store.allsubcat2,
    allsubcat3:store.allsubcat3,
    allcategory :store.allcategory,
    price: store.price,
    currentCategory:store.currentCategory,
    min:store.min,
    max:store.max,
    overallMin:store.overallMin,
    overallMax:store.overallMax,
    numOfRows:store.numOfRows,
    loading:store.loading
   }
 }
 const mapDispatchToProps = (dispatch) =>{
   return{
    getProducts:(data)=> dispatch(getProducts(data)),
    checkfilter:(data)=> dispatch(checkfilter(data)),
    setLoadingtoTrue:()=> dispatch(setLoadingtoTrue()),
    checkfilter:(data)=>dispatch(checkfilter(data)),
    submitsearcher:(data)=>dispatch(submitsearcher(data)),
    allsubcategories:(data)=>dispatch(allsubcategories(data))
   }
 }
export default compose(withRouter ,connect(mapStateToProps,mapDispatchToProps))(catalogueSearchSidenavbar);