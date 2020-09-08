import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {test} from './store'
import {getProducts} from './store'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import SearchSideNavbar from "./searchsidenavbar"
import Inputdata from "./inputdata"
import queryString from 'query-string'
import {submitsearcher} from "./store"
import {Pagination, Dropdown} from 'react-bootstrap'
import axios from "axios"
import './main.css'

class SearchApp extends Component {
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
      parsedQuery:{},
      sidenavbarclass: "d-none d-lg-block col-lg-3 stick",
      appclass: "col-12 col-lg-9",
      displayfilter:"none",
      price:"",
      highestprice:"",
      lowestprice:"",
      viewrow:"col-6 col-md-4 col-lg-3 rowclass",
      viewcol:"",
      viewcolTwo:"",
      displayviewbrand:"block",
      viewborder:"",
      griddetails:"block",
      listdetails:"none",
      listpadding:5,
      listmargin:""
     }
  }
  componentDidMount =()=>{
  const parsedQuery = queryString.parse(this.props.location.search)
  if(parsedQuery.view === "grid" || !parsedQuery.view){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3 rowclass", viewcolOne:"",viewcolTwo:"",griddetails:"block",listdetails:"none"})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row rowclasslist",listmargin:"2px 0px", viewcolOne:"col-5",viewcolTwo:"col-7",listpadding: "30px 10px",displayviewbrand:"none",viewborder:"10px",listdetails:"block",griddetails:"none"})
    }
 let data={
  search: parsedQuery.search,
  category:this.props.category,
  brand: parsedQuery.brand,
  size: parsedQuery.sizes,
  colour:parsedQuery.color,
}
 axios.get(`http://fruget.herokuapp.com/search/category/searched/price?search=${data.search}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    console.log (res.data[i].highestprice)
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice, parsedQuery}, ()=> {
      let data={
        search: parsedQuery.search,
        category:this.props.category,
        brand: parsedQuery.brand,
        size: parsedQuery.sizes,
        colour:parsedQuery.color,
        page:parsedQuery.page,
        sort:parsedQuery.sort,
        max:parsedQuery.max !== undefined ? parsedQuery.max : this.state.highestprice,
        min:parsedQuery.min !== undefined ? parsedQuery.min : this.state.lowestprice
      }
    
      console.log(data)
      this.props.submitsearcher(data)
    })
   }
 }))
 .then(err => console.warn(err))
  
}
handleChange=(e)=>{
  this.setState({search:e.target.value})
  }
  handleChange=(e)=>{
    this.setState({search:e.target.value})
  }
  paginate = (pages) =>{
   const parsedQuery = queryString.parse(this.props.location.search)
    let currentUrlParams = new URLSearchParams(window.location.search);
    if(parsedQuery.search === undefined || this.props.inputval.length > 0){
      currentUrlParams.set('search', this.props.inputval);
      currentUrlParams.set('page', 1)
    }
    else{    
      currentUrlParams.set('page', pages);
    }
    
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
  
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
  render() {
    let active = parseInt(this.props.currentPage) || 1;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
    console.log(this.props.numOfRows, "totalpages")
    return ( 
          <div className="container">
            <Inputdata></Inputdata>
            <div className="row" style={{padding:"0px"}}>
              <div className="col-9">
<small> <span style={{fontWeight:"bolder"}}>{this.props.numOfRows}</span> Products Found</small>           
              </div>
              <div className="col-3 dodo">
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
          
        <div className='row'>
        <div className="d-none d-lg-block col-lg-3 stick" style={{backgroundColor:"rgba(242, 242, 242,0.4)"}}>
          <SearchSideNavbar category={this.props.match.params.category}/>
        </div>
          <div className='col-12 col-lg-9' style={{backgroundColor:"#f5f5f0"}}>
          <div className='row'> 
        {this.props.searchedproducts.map((product) =>          
           <div className={`${this.state.viewrow}`}   key={product.productId} style={{margin:`${this.state.listmargin}`,boxShadow:"2px 1px 2px lightgrey",backgroundColor:"white"}}> 
                <div className={`${this.state.viewcolOne}`} >
           <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
           </div>
           <div className={`${this.state.viewcolTwo}`} >
        <small style={{float:"left",textTransform:"capitalize",display:`${this.state.displayviewbrand}`}}>{product.brand} <br/></small>
           <div className="detaildiv" style={{lineHeight:"16px"}}>
             
            <div  className="details">
            <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.griddetails}`}}>
     <small style={{display:"inline-block",fontSize:"13px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
       <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.listdetails}`}}>
     <small style={{display:"inline-block",fontSize:"13px"}}>{product.details.length > 60 ? product.details.slice(0,60)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
        </div>
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div>
       {product.numOfRating > 0 ?
       <div>
         <div className="outer">     
          <div className="inner" style={{width:`${product.percentrating}%`}}>   
  
          </div> 
          </div>
          <small style={{fontSize:"12px"}}>({product.numOfRating || 0}) </small></div> : null }<br/>
       <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
         <br/>
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`,width:`${this.state.viewcartbtnwidth}`}}>
        <br/>
        <button style={{display:"none"}} type="button" className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)} >
         <span>ADD TO CART</span></button><br/>
        </center><br/>
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
             </center>
            
             <div className="didi bg-dark filterdiv">
               <div className="row">
                 <div className="col-4">
                 <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div>
              <Dropdown>
  <Dropdown.Toggle className="bg-dark" id="filterdiv-dropdown">
   <small className="bg-dark"> {this.state.parsedQuery.sort || "popularity"}</small>
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
                 <div className="col-2 fiterdiv-col" style={{borderLeft:"1px solid lightgrey"}}>
                   <center>    
              <button type="button" className="btn btn-link filter-btn" onClick={this.grid} style={{color:`${this.state.parsedQuery.view === "grid"  ? "white" : "rgb(0, 119, 179)"}`}}>
              <i class="fa fa-th" ></i>
                  </button>
                  </center>
                 </div>
                 <div className="col-2 fiterdiv-col"  style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                   <center>
              <button type="button" className="btn btn-link filter-btn" onClick={this.list} style={{color:`${this.state.parsedQuery.view === "list"  ? "white" : "rgb(0, 119, 179)"}`}}>
              <i class="fa fa-grip-vertical" ></i>
                  </button>
                   </center>
                 </div>
                 <div className="col-4">               
                  <button type="button" className="btn btn-link filter-btn" onClick={this.displayfilter} >
                    Filter 
                  </button>
               
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
       searchedproducts: store.searchedproducts,
       test:store.test,
       status:store.status,
       searcher: store.searcher,
       inputval: store.inputval,
       searchedbrands : store.searchedbrands,
       searchedsizes : store.searchedsizes,
       searchedcolours: store.searchedcolours,
       currentPage: store.currentPage,
       totalPages: store.totalPages,
       numOfRows:store.numOfRows

     }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     test: ()=> dispatch(test()),
     submitsearcher: (data)=> dispatch(submitsearcher(data))
   }
 }
 export default compose(withCookies, connect(mapStateToProps, mapDispatchToProps))(SearchApp);