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
      viewrow:"col-6 col-md-4 col-lg-3",
      viewcol:"",
      listpadding:5
     }
  }
  componentDidMount =()=>{
  const parsedQuery = queryString.parse(this.props.location.search)
  if(parsedQuery.view === "grid"){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3", viewcol:""})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row", viewcol:"col-6",listpadding: "30px 10px"})
    }
 let data={
  search: parsedQuery.search,
  category:this.props.category,
  brand: parsedQuery.brand,
  size: parsedQuery.sizes,
  colour:parsedQuery.color,
}
 axios.get(`http://fruget.herokuapp.com/category/searched/price?search=${data.search}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
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
            <hr/>
        <div className='row' >
        <div className="d-none d-lg-block col-lg-3 stick" style={{backgroundColor:"rgba(242, 242, 242,0.4)"}}>
          <SearchSideNavbar category={this.props.match.params.category}/>
        </div>
          <div className='col-12 col-lg-9'>
    <p>{this.props.searcher}</p>
          <div className='row'> 
        {this.props.searchedproducts.map((product) =>          
           <div className={`${this.state.viewrow}`} style={{padding:"10px"}} key={product.productId} > 
                <div className={`${this.state.viewcol}`} >
           <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
           </div>
           <div className={`${this.state.viewcol}`} style={{padding:`${this.state.listpadding}`}}>
        <small style={{float:"left"}}>{product.brand} </small><br/>
           <small style={{height:"40px"}}>
            <div  className="details">
    <Link to ={`/product/${product.productId}`} style={{color:'black'}}>
       {product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}
       </Link>
        </div>
        <b>{product.mainprice}</b><br/>
        <div className="outer">
          <div className="inner" style={{width:`${product.percentrating || 0}%`}}>

          </div>
        </div> <small style={{fontSize:"12px"}}>({product.numOfRating || 0})</small>
         </small>
        <br/><br/>
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
            
             <div className="didi" style={{position:"fixed",left:"0px",bottom:"0px",backgroundColor:"white",boxShadow:"2px 3px 3px 3px light",width:"100%",border:"3px solid grey"}}>
               <div className="row">
                 <div className="col-2" style={{padding:"5px 10px",borderRight:"1px solid lightgrey"}}>
                 <div style={{padding:"10px"}} style={{padding:"0px 10px",borderRight:"1px solid lightgrey"}}>
              <i class="fa fa-th"  style={{color:`${this.state.parsedQuery.view === "grid"  ? "rgb(0, 119, 179)" : "black"}`}} style={{color:  "black"}} onClick={this.grid}></i>
              </div>
                 </div>
                 <div className="col-2" style={{padding:"5px 10px",borderRight:"1px solid lightgrey"}}>
                   <center>
                <div style={{padding:"10px"}} style={{padding:"0px 10px",borderRight:"1px solid lightgrey"}}>
              <i class="fa fa-grip-vertical"  style={{color:`${this.state.parsedQuery.view === "view"  ? "rgb(0, 119, 179)" : "black"}`}} onClick={this.list}></i>
              </div>
              </center>
                 </div>
                 <div className="col-4" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",paddingTop:"5px"}}>
                  <small>{this.state.parsedQuery.search}</small>
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