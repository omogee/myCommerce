import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {test} from './store'
import {getProducts,getsidenav,checkfilter} from './store'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import Sidenavbar from "./sidenavbar"
import Suggestions from "./suggestions"
import querystring from 'query-string'
import axios from "axios"
import ReactHtmlParser from "react-html-parser"
import {Pagination, Dropdown} from 'react-bootstrap'
import './main.css'

class App extends Component {
  constructor(props) {
    const { cookies } = props; 
    super(props); 
    this.state = { 
      products:[],
      search: '',
      username: " ",
      password: "",
      signupMessage: '', 
      isLoggedin: false,
      token: {},
      currentPage: 1,
      noPages:0,
      parsedUrl:{},
      parsedQuery:{},
      sidenavbarclass: "d-none d-lg-block col-lg-3 stick",
      appclass: "col-12 col-lg-9",
      displayfilter:"none",
      price:"",
      highestprice:"",
      lowestprice:"",
      viewrow:"col-6 col-md-4 col-lg-3",
      viewcol:"",
      display:"none",
      cartMessage:""
     }
  }
  componentDidMount =()=>{
    var parsedQuery = querystring.parse(this.props.location.search);
    if(parsedQuery.view === "grid"){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3", viewcol:""})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row", viewcol:"col-6"})
    }
    axios.get(`http://fruget.herokuapp.com/${this.props.match.params.category}/price`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice}, () =>{
      var parsedQuery = querystring.parse(this.props.location.search);
      this.setState({parsedUrl:parsedQuery, parsedQuery})
  
      if(parsedQuery.length === 0 || !Object.keys(parsedQuery).includes("brand") || !Object.keys(parsedQuery).includes("size") || !Object.keys(parsedQuery).includes("color")){
        const data ={
          category: this.props.match.params.category,
          page: parsedQuery.page || 1,
          sort:parsedQuery.sort,
          min:parsedQuery.min !== undefined ? parsedQuery.min : this.state.lowestprice,
          max:parsedQuery.max !== undefined ? parsedQuery.max : this.state.highestprice
        }
        this.props.getProducts(data)
      }
      else{ 
      const data ={
        brand : parsedQuery.brand,
        size: parsedQuery.size,
        colour: parsedQuery.color,
        category:this.props.match.params.category,
        max:parsedQuery.max !== undefined ? parsedQuery.max : this.state.highestprice,
        min:parsedQuery.min !== undefined ? parsedQuery.min : this.state.lowestprice,
        page:parsedQuery.page || 1,
        sort:parsedQuery.sort 
      }
      this.props.checkfilter(data)
    }
    })
   }
 }))
 .then(err => console.warn(err))
   
    this.props.getsidenav(this.props.match.params.category)
    window.addEventListener("click", this.handlemodalclick)
  }
  handleChange=(e)=>{
    this.setState({search:e.target.value})
  }
  paginate = (pages) =>{
    const parsedQuery = querystring.parse(this.props.location.search);
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', pages);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
   // const uri= window.location.href
  //  window.location.assign(`${uri}?page=${pages}`)
///category/${this.props.match.params.category}
  }
displayfilter=()=>{
//  this.setState({displayfilter:"block"})
this.setState({sidenavbarclass: "d-block col-sm-12 d-none", appclass:"d-none"})
}
sort =(value) =>{
  let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('sort', value);
    if(this.state.parsedQuery.page){
      currentUrlParams.set('page', 1);
    }  
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
}
grid =() =>{
  let currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set('view',"grid");
  window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
}
list =() =>{
  let currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set('view',"list");
  window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
}
addtocart=(id)=>{
  axios.get(`http://fruget.herokuapp.com/customer/add-to-cart?id=${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
  .then(res =>{
    if(res.data.success){
      this.setState({cartMessage:res.data.message,display:"block"})
    }else{
      window.location.assign("/customer/login")
    }
  })
  .catch(err => console.warn(err))
}
undisplaymodal =() =>{
 this.setState({display:"none"})
}
handlemodalclick =(e) =>{
  //  this.modaldiv.style.display = "none"
  if(e.target == this.modaldiv){
      this.setState({display:"none"})
  }
}
  render() { 
    let active = parseInt(this.props.currentPage) || 1;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
    console.log(Object.keys(this.state.parsedQuery).toString())
    return (  
           <div>
             <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%", height:"300%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
          <div className="container">
          
          <div className="row dodo" style={{backgroundColor:"white"}}>
              <div className="col-9" >
    <small><a href="" style={{color:"black"}}>Home</a> > <a href="" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize"}}>{this.props.match.params.category}</a></small>
<p style={{ textTransform:"capitalize",fontWeight:"bolder",padding:"0px"}}>{this.props.match.params.category}</p>
              </div>
              <div className="col-3">
              <small>
            <small>
            ({(((this.props.currentPage || 1)-1)*20) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
            <span >
             {" " +this.props.numOfRows} products
            </span>
            </small>
          </small><br/>
              <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div style={{marginTop:"8px"}}>
                <small >
                Sort By : 
                </small>
              </div>
              <div>
              <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:"white", border:"none",fontWeight:"bolder",color:"rgb(0, 119, 179)"}} id="dropdown-basic">
   <small> {this.state.parsedQuery.sort || "popularity"}</small>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("popularity")}><small>Popularity</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("warranty")}><small>Warranty</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("cust-rating")}><small>Customer Rating</small></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
              </div>
              <div style={{padding:"10px"}}>
              <i class="fa fa-th" style={{color:`${this.state.parsedQuery.view === "grid"  ? "rgb(0, 119, 179)" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px"}}>
              <i class="fa fa-grip-vertical" style={{color:`${this.state.parsedQuery.view === "list" ? "rgb(0, 119, 179)" : "black"}`}} onClick={this.list}></i>
              </div>
            </div>
            </center>
          </div>
            </div>
            <div className="didi">
            <center>
              <div>
          <p style={{fontWeight:"bold",textTransform:"capitalize",padding:"0px",margin:"0px"}}>{this.props.match.params.category}</p>
          <small>
          <small>
            ({(((this.props.currentPage || 1)-1)*20) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
            <span >
             {" " +this.props.numOfRows} products
            </span>
            </small>
          </small>
          </div>
            </center>
          </div>
        <hr/>
            
            
        <div className='row' >
        <div className={this.state.sidenavbarclass} >
          <div className="row didi">
        <div className="col-9">
                <span className="fa fa-arrow-left"></span>
              </div>
              <div className="col-3">
    <span style={{color:"blue"}}><a href="">Apply</a></span>
              </div>
              </div>
            
          <Sidenavbar category={this.props.match.params.category} />
        </div>
        
          <div className={this.state.appclass}>
     
          <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.state.display}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
           <p style={{position:"absolute",top:"3px",right:"10px",fontSize:"25px",cursor:"pointer"}} onClick={this.undisplaymodal}>x</p>
             <div className="inner-modal">
               <br/><br/>
               <center>
    <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.state.cartMessage)} </h5>
    </center>
                     <center>   
                      
                       <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<Link to={`/checkout/1996826ysgy7xhau8hzbhxj,${localStorage.getItem("id")},fruget0829?user$login7sgxujaiiahzjk#172`}><button className="btn btn-success" style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">CheckOut</button> </Link>
</div>
<div className="col-6">
<button className="btn btn-warning" onClick={this.undisplaymodal} style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} type="submit">Continue Shopping</button>
</div>         
               </div>
             </center> 
         </div>

     </div>
 </div>
    <p>{this.props.searcher}</p>
          <div className='row' > 
          
        {this.props.products.map((product) =>          
           <div className={`${this.state.viewrow}`}   key={product.productId} >         
          <div className={`${this.state.viewcol}`}>
            <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
          </div>
          <div className={`${this.state.viewcol}`}> 
        <small style={{float:"left"}}>{product.brand} </small><br/>
           <small style={{height:"40px"}}>
            <div  className="details" >
    <Link to ={`/product/${product.details}`} style={{color:'black'}}>
     <small style={{display:"inline-block"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
        </div>
        <b>{product.mainprice}</b><br/>
        <div className="outer">  
          <div className="inner" style={{width:`${product.percentrating || 0}%`}}>

          </div>
        </div> <small style={{fontSize:"12px"}}>({product.numOfRating || 0})</small>
         </small>
        <br/><br/>
        <center>
        <button type="button" onClick={()=>this.addtocart(product.productId)} style={{width: "100%",backgroundColor:"rgba(0, 119, 179,0.9)",borderRadius:"5px",padding: "1px",color:"white"}}>
         <span style={{fontWeight:"bold"}}>ADD TO CART</span></button>
        </center>
        <br/>
        </div>
           </div> 
           
         )}
         
             </div>
             <center>
             <Pagination size="sm">
             <Pagination.First />
             <Pagination.Prev />
               <ul className="pagination pagination-circle pg-blue">
                  {PageNumbers.map(pages =>
                    <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                      {pages}
                    </Pagination.Item>
                    )}
               </ul>
               <Pagination.Next />
               <Pagination.Last />
             </Pagination>
             <br/><br/>
             </center>
             <div className="didi" style={{position:"fixed",left:"0px",bottom:"10px",backgroundColor:"white",width:"100%",border:"3px solid grey"}}>
               <div className="row">
                 <div className="col-2" style={{padding:"5px 10px",borderRight:"1px solid lightgrey"}}>
                 <div  style={{padding:"10px",fontSize:"20px"}}>
              <i class="fa fa-th" style={{color:  "black"}} onClick={this.grid}></i>
              </div>
                 </div>
                 <div className="col-2" style={{padding:"5px 10px",borderRight:"1px solid lightgrey"}}>
                   <center>
                <div  style={{padding:"10px",fontSize:"20px"}}>
              <i class="fa fa-grip-vertical" style={{color: "black"}} onClick={this.list}></i>
              </div>
              </center>
                 </div>
                 <div className="col-4">
                
                  <button type="button" className="btn btn-link" onClick={this.displayfilter} style={{fontWeight:"bolder",color:"rgb(0, 119, 179)",textTransform:"capitalize"}}>
                    Filter <small className="badge badge-danger">{Object.keys(this.state.parsedUrl).length}</small>
                  </button>
                
                 </div>
                 <div className="col-4">
                 <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div style={{marginTop:"8px"}}>
                <small >
                Sort: 
                </small>
              </div>
              <div>
              <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:"white", border:"none",fontWeight:"bolder",color:"rgb(0, 119, 179)"}} id="dropdown-basic">
   <small style={{fontWeight:"bolder",color:"rgb(0, 119, 179)",textTransform:"capitalize"}}> {this.state.parsedQuery.sort || "popularity"}</small>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("popularity")}><small>Popularity</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("warranty")}><small>Warranty</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("cust-rating")}><small>Customer Rating</small></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
              </div>
            </div>
            </center>
                 
                 </div>
               </div>
             </div>
         </div>
        </div>
      </div>
     
      </div> 
     );
  }
}
 const mapStateToProps =(store)=>{
    return{           
       products: store.products,
       test:store.test,
       status:store.status,
       searcher: store.searcher,
       inputval: store.inputval,
       currentPage: store.currentPage,
       totalPages: store.totalPages,
       numOfRows:store.numOfRows
     }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     test: ()=> dispatch(test()),
     getProducts: (data)=> dispatch(getProducts(data)),
     getsidenav: (data) => dispatch(getsidenav(data)),
    checkfilter: (data) => dispatch(checkfilter(data))
   }
 }
 export default compose(withCookies, connect(mapStateToProps, mapDispatchToProps))(App);