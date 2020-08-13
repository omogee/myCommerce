import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getProducts} from './store'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {checkfilter} from "./store"
import axios from 'axios';

class Sidenavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             displaybrand: "",
             displaysize: "",
             filteredbrand:[],
             filteredsize:[],
             first:true,
             testedproducts:[],
             highestprice : 0,
             lowestprice:0,
             price:{},
             parsedUrl: {},
             applycolour : "black",
             parsedQuery:{
               brand:[],
               color:[],
               sizes:[]
             },
             brand:[],
             color:[],
             sizes:[],
             subcats:[],
             
         }
    }
    componentDidMount =()=>{
        getProducts(this.props.category)

      const parsedQuery = queryString.parse(this.props.location.search);
      const {brand, color,sizes} = parsedQuery;
      if(parsedQuery.brand && parsedQuery.brand.length > 0){
        this.setState({brand}); 
      }
      if(parsedQuery.color && parsedQuery.color.length > 0){
        this.setState({color}); 
      }
      if(parsedQuery.sizes && parsedQuery.sizes.length > 0){
        this.setState({sizes}); 
      }
    
     const data={
       category:this.props.category,
       brand: parsedQuery.brand,
       size: parsedQuery.sizes,
       colour:parsedQuery.color,
       min:parsedQuery.min,
       max:parsedQuery.max,
       page:parsedQuery.page,
       sort:parsedQuery.sort
     }
     
 axios.get(`http://localhost:5000/${this.props.category}/price`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    console.log (res.data[i].highestprice)
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice}, ()=> {
      this.inputelement.max= `${this.state.highestprice}`
      this.inputelement.min =`${this.state.lowestprice}`
    })
   }
 }))
 .then(err => console.warn(err))
 
 
  this.props.checkfilter(data)
    }
    
    brandchange=(e) =>{
      this.setState({displaybrand: e.target.value})
      var filteredbrand = []
      this.props.brands.map(brand => {
        if(brand.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredbrand.push(brand.brand)
        }
        this.setState({filteredbrand})
      })
    }
    sizechange=(e) =>{
      this.setState({displaysize: e.target.value})
      var filteredsize = []
      this.props.sizes.map(size => {
        if(size.size !== null){
        if(size.size.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredsize.push(size.size)
        }
        this.setState({filteredsize})
      }
      })
    }
    change = (e)=>{
      const uri = window.location.href;
     const  parsedQuery = queryString.parse(this.props.location.search);
     if(window.innerWidth >= 700){
      if(parsedQuery[e.target.name] !== undefined){
       // const query = parsedQuery[e.target.name]
        if(uri.indexOf(e.target.value) > -1){
          var query = parsedQuery[e.target.name].split(",");
          console.log(query)
          if(query.length <= 1){
            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.delete(e.target.name);
            window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
          }else{
            const index = query.indexOf(`${e.target.value}`);
            console.log("index",index)
             query.splice(query.indexOf(`${e.target.value}`), 1)
            query = query.join()
        //    const spliturl2 = spliturl.join()
            let currentUrlParams = new URLSearchParams(window.location.search);
           currentUrlParams.set(e.target.name,query);
          window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
          }
        }else{
           let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set(e.target.name,(e.target.value + "," +parsedQuery[e.target.name]) );
        window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
      
        }    
      }
      else{
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name, e.target.value);
        window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
      }   
    }
    else{
   let parsedUrl = this.state.parsedUrl;
     
      if(!this.state.parsedUrl[e.target.name]){
        parsedUrl[e.target.name] = e.target.value
        this.setState({parsedUrl})
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name,e.target.value);
        window.history.pushState(null, null, window.location.pathname +"?"+ currentUrlParams.toString());

      }
      else{
        if(this.state.parsedUrl[e.target.name].indexOf(e.target.value) > -1){
          if(parsedUrl[e.target.name].split(",").length > 1){
          parsedUrl[e.target.name] = parsedUrl[e.target.name].split(",")
          parsedUrl[e.target.name].splice(parsedUrl[e.target.name].indexOf(`${e.target.value}`), 1)
          parsedUrl[e.target.name]= parsedUrl[e.target.name].join()
          this.setState({parsedUrl})
          let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name,this.state.parsedUrl[e.target.name]);
        window.history.pushState(null, null, window.location.pathname +"?"+ currentUrlParams.toString()); 
          }
          else{
            delete parsedUrl[e.target.name]
            this.setState({parsedUrl})
            let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.delete(e.target.name);
        window.history.pushState(null, null, window.location.pathname +"?"+ currentUrlParams.toString()); 
          }
        }else{
          parsedUrl[e.target.name] = parsedUrl[e.target.name] +","+e.target.value
        this.setState({parsedUrl})
         let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name,this.state.parsedUrl[e.target.name]);
        window.history.pushState(null, null, window.location.pathname +"?"+ currentUrlParams.toString()); 
        }   
      }
       
    }  
   }
   pricechange = (e)=>{
     this.setState({highestprice : e.target.value, applycolour :"blue"})
   }
   highestpricechange = (e) =>{
    this.setState({highestprice : e.target.value, applycolour :"blue"})
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
    render() { 
     // console.log(this.state.parsedUrl.brand ? this.state.parsedUrl.brand.split(",") : null)
        return ( 
            <div>
              <small>CATEGORIES</small>
              <br/>
              <ul>
              {this.props.subcategories.map((subcategory,index) =>
                <div key={subcategory}>
                  <a href="" style={{color:"black"}}><small> {subcategory.subcat2}</small></a>
                  <a href="" style={{color:"black"}}><small> {subcategory.subcat3}</small> </a>
                 
                </div>
                )}
                </ul>
                <hr/>
                <small>PRICES (₦)</small> <small style={{float:"right"}}> <a href="" style={{color:`${this.state.applycolour}`}} onClick={this.pricefilter}>Apply Filter</a></small><br/>
                 <center>
                <input type="range" ref={(a)=> this.inputelement = a} name="price" min="" max="" value={this.state.highestprice} onChange={this.pricechange}/>
                <br/>
                <div className="row">
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.lowestprice} name="lowestprice" onChange={this.lowestpricechange} style={{width:"100%"}}/>
                  </div>
                  -
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.highestprice} style={{width:"100%"}} name="highestprice"  onChange={this.highestpricechange}/>
                  </div>
                </div>              
              </center>
              <hr/>
              <small> CUSTOMER RATINGS</small>
              <hr/>
              <small>BRAND</small>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="search brands.." name="displaybrand" onChange={this.brandchange} value={this.state.displaybrand} className="form-control" style={{borderLeft:"none"}} />
        </div>

{this.state.filteredbrand.length > 0 ? 
this.state.filteredbrand.map(product => 
 <div key={product}>
  <small> <ul style={{lineHeight:'1px'}}>
<li style={{listStyleType:'none',display:`${this.state.display}`}}> 
<input type='checkbox' onChange={this.change} checked={this.state.brand.includes(product) ? true : false } name='brand' value={product}/>
<a style={{color:"black"}} href={`/product/${product}?search=standing fan&brand=${product}`}> {product}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
</li>
  </ul></small>
</div>)
: this.props.brands.map(product =>  <div key={product.brand}>
              <small> <ul style={{lineHeight:'1px'}}>
            <li style={{listStyleType:'none',display:`${this.state.display}`}}> 
<input type='checkbox' onChange={this.change} checked={this.state.brand.includes(product.brand)  ? true : false } name='brand' value={product.brand}/>
            <a style={{color:"black"}} href={`/product/${product.brand}?search=standing fan&brand=${product.brand}`}> {product.brand}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
            </li>
              </ul></small>
            </div>)}

            
            <hr/>
               <small>COLOURS :</small>
               <br/><br/>
            {this.props.colours.map(product =>  <div key={product.color}>
              <small> <ul style={{lineHeight:'1px'}}>
            <li style={{listStyleType:'none'}}> 
<input type='checkbox' onChange={this.change} checked={this.state.color.includes(product.color) ? true : false } name='color' value={product.color}/>
            <a style={{color:"black"}} href={`/product/${product.color}?search=standing fan&color=${product.color}`}> {product.color}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.colory}</small>
            </li>
              </ul></small>
            </div>)}
            <hr/>
            
{this.props.category === "tv&audio" && this.props.sizes.length > 2 ? <small>SCREEN SIZES</small> : <small>SIZES</small>}
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="search sizes..." onChange={this.sizechange} value={this.state.displaysize} className="form-control" style={{borderLeft:"none"}} />
        </div>

{this.props.sizes.length > 1 && this.state.filteredsize.length > 0 ? 

this.state.filteredsize.map(product =>  <div key={product}>
  <small> <ul style={{lineHeight:'1px'}}>
<li style={{listStyleType:'none'}}> 
<input type='checkbox' onChange={this.change} checked={this.state.sizes.includes(product) ? true : false } name='sizes' value={product}/>
<a style={{color:"black"}} href={`/product/${product}?search=standing fan&size=${product}`}> {product}
</a> 
</li>
  </ul></small>
</div>)
: this.props.sizes.map(product =>  <div key={product.size}>
              <small> <ul style={{lineHeight:'1px'}}>
            <li style={{listStyleType:'none'}}> 
<input type='checkbox' onChange={this.change} checked={this.state.sizes.includes(product.size) ? true : false } name='sizes' value={product.size}/>
            <a style={{color:"black"}} href={`/product/${product.size}?search=standing fan&size=${product.size}`}> {product.size}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.sizey}</small>
            </li>
              </ul></small>
            </div>)}
            </div>
         );
    }
}
 const mapStateToProps =(store) =>{
   return{
    products:store.products,
    brands:store.brands,
    colours: store.colours,
    sizes: store.sizes,
    subcategories:store.subcategories,
    price: store.price
    
   }
 }
 const mapDispatchToProps = (dispatch) =>{
   return{
    getProducts: (data)=> dispatch(getProducts(data)),
    checkfilter:(data)=> dispatch(checkfilter(data))
   }
 }
export default compose(withRouter ,connect(mapStateToProps,mapDispatchToProps))(Sidenavbar);