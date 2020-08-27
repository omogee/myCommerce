import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import {test, undisplaymodal} from './store'
import {getProducts,getsidenav,checkfilter,addtocart,undisplaymodal} from './store'
import {compose} from 'redux'
import {connect} from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import Sidenavbar from "./sidenavbar"
import Suggestions from "./suggestions"
import querystring from 'query-string'
import axios from "axios"
import ModalSideNavbar from "./modalsidenavbar"
import ReactHtmlParser from "react-html-parser"
import {Pagination, Dropdown} from 'react-bootstrap'
import './main.css'

class App extends Component {
  constructor(props) {
    const { cookies } = props; 
    super(props); 
    this.state = { 
      productss:props.products,
      products:[],
      search: '',
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
      viewcoldetails:"",
      loading:true,
      viewborder:"",
      viewaddtocartbutton:"block",
      viewcartbtnwidth: "100%",
      displayviewbrand:"block",
      viewbgcolor:"white",
      griddetails: "block",
      listdetails:"none",
      frugetshow:""
     }
  }
  componentWillMount =()=>{
    var parsedQuery = querystring.parse(this.props.location.search);
    if(window.innerWidth <= 800){
      this.setState({displayviewbrand:"none"})
    }
    if(parsedQuery.view === "grid"){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3", viewcol:""})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row", viewcol:"col-5",viewcoldetails:"col-7",viewborder:"10px",frugetshow:"right",viewcartbtnwidth:"40%",viewbgcolor:"lightgrey",displayviewbrand:"none",griddetails:"none",listdetails:"block"})
      if(window.innerWidth <= 600){ 
        this.setState({viewaddtocartbutton:"none"})
      }
    }
    axios.get(`http://fruget.herokuapp.com/products/${this.props.match.params.category}/price`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice}, () =>{
     // var parsedQuery = querystring.parse(this.props.location.search);
      this.setState({parsedUrl:parsedQuery, parsedQuery})  
      console.log(Object.keys(parsedQuery))
      const checker = Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("color")
if(!checker){
  console.log("hello i am here")     
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
      console.log("i would filter")
      this.props.checkfilter(data)
    }  

    })
   }
 }))
 .then(err => console.warn(err))

 this.setState({loading:false})
   
    this.props.getsidenav(this.props.match.params.category)
    window.addEventListener("click", this.handlemodalclick)
    
  }
  componentDidMount =()=>{
    this.setState({ productss: this.props.products });
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
   this.props.addtocart(id) 
  }
undisplaymodal =() =>{
 this.props.undisplaymodal()
}
handlemodalclick =(e) =>{
  if(e.target == this.modaldiv){
     this.props.undisplaymodal()
  }
}
displaycartbtn =(e)=>{
  e.currentTarget.button.style.display ="block";
}
  render() { 
   console.log("products",this.state.productss)
   
    let active = parseInt(this.props.currentPage) || 1;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
  /*  console.log(Object.keys(this.state.parsedQuery).toString())
    if(this.props.products.length === 0){
      return(
        <div style={{width:"100%", height:"100%"}}>
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
        </div>
      ) 
    }else{  */
    return (   
           <div>
             <div style={{display:`${this.props.mainbgcolor==="white" ? "none" : "block"}`,backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"200%",position:"absolute",top:"0px",zIndex:"2"}}>
               x
             <div className="sidenavbar" style={{zIndex:"1",display:`${this.props.modalsidenavbardisplay}`,position:"absolute",top:"0px",width:`${this.props.modalsidenavbarwidth}`}}>
              <ModalSideNavbar/>            
             </div>
             </div>
             <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
          <div className="container main">
          {this.props.loading ?     
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
        : null}
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
        

         
          <div className={this.state.appclass} >
     
          <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.props.display}`}}>
         <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
           <p onClick={this.undisplaymodal}>x</p>
             <div className="inner-modal"> 
               <br/><br/>
               <center>
                 <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.props.cartMessage)} </h5>
               </center>
               <center>                        
               <div className="row" style={{padding:"3px"}}>  
               <div className="col-6">  
<Link to={`/checkout/1996826ysgy7xhau8hzbhxj,${localStorage.getItem("id")},fruget0829?user$login7sgxujaiiahzjk#172`}><button className="btn btn-success checkout" type="button">CheckOut</button> </Link>
</div>
<div className="col-6">
<button className="btn btn-warning continueshopping" onClick={this.undisplaymodal}  type="submit">Continue Shopping</button>
</div>         
               </div> 
             </center> 
         </div> 
 
     </div>
 </div> 
          <div className='row'>      
           {this.props.products.map((product) =>          
           <div className={`${this.state.viewrow}`}    key={product.productId} >         
          <div className={`${this.state.viewcol}`} >
            <img className="mainImg img-responsive" src={require (`./images/${product.mainimg || 'emptyimg.jpg'}`)} style={{maxWidth:"100%"}}></img>
          </div>
          <div className={`${this.state.viewcoldetails}`} style={{marginRight:"0px",paddingRight:"0px"}}> 
<small style={{float:"left",textTransform:"capitalize",display:`${this.state.displayviewbrand}`}}>{product.brand} <br/></small>
           <div className="detaildiv"> 
            <div  className="details"> 
    <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.griddetails}`}}>
     <small style={{display:"inline-block",fontSize:"12px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
       <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.listdetails}`}}>
     <small style={{display:"inline-block",fontSize:"12px"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
       {product.numOfRating > 0 ?
         <div className="outer">     
          <div className="inner" style={{width:`${product.percentrating || 0}%`}}>   
 
          </div> 
          <small style={{fontSize:"12px"}}>({product.numOfRating || 0}) </small></div> : null }
          <div style={{float:"right"}}><img src={require(`./images/fruget.jpg`)} style={{height:"20px",width:"40%",float:"right"}}></img></div>
         </div>
         
        <br/>
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`,width:`${this.state.viewcartbtnwidth}`}}>
        <br/>
        <button style={{display:"none"}} type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
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
             <br/><br/>
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
                    Filter <small className="badge badge-danger" style={{display:Object.keys(this.state.parsedUrl).length > 0 ? "inline-block": "none"}}>{Object.keys(this.state.parsedUrl).length}</small>
                  </button>
               
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
       numOfRows:store.numOfRows,
       cartMessage:store.cartMessage,
       display:store.display,
       loading:store.loading,
       mainbgcolor:store.mainbgcolor,
       modalsidenavbarwidth: store.modalsidenavbarwidth,
       modalsidenavbardisplay: store.modalsidenavbardisplay
     }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     test: ()=> dispatch(test()),
     getProducts: (data)=> dispatch(getProducts(data)),
     getsidenav: (data) => dispatch(getsidenav(data)),
    checkfilter: (data) => dispatch(checkfilter(data)),
    addtocart: (data) => dispatch(addtocart(data)),
    undisplaymodal:()=> dispatch(undisplaymodal())
   }
 }
 export default compose(withCookies, connect(mapStateToProps, mapDispatchToProps))(App);