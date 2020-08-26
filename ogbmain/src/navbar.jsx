import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {getfilteredSuggestions} from "./store"
import axios from 'axios';
import {searcher, submitsearcher,showmodalsidenavbar, unshowmodalsidenavbar} from './store'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom"
import {compose} from "redux"
import queryString from "query-string"
import {Link} from "react-router-dom"
import {Dropdown} from 'react-bootstrap'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          inputval:"",
          showSuggestion:false,
          filteredSuggestions:[],
          suggestions:[],
          searcheddata: [],
          cart:[]
         }
    }
    componentDidMount = () =>{
      this.setState({inputval:this.props.inputval})
      const user = localStorage.getItem("id");
      axios.get(`http://fruget.herokuapp.com/customer/checkout?user=${user}`)
      .then(res => this.setState({cart: res.data},()=>{
       console.log(res.data.length)
      }))
      .catch(err => console.warn(err))
    }
   
    change2 = (e)=>{
      this.setState({inputval:e.target.value})
      const parsedQuery = queryString.parse(this.props.location.search)
      this.props.searcher(e.target.value)
         
     this.props.getfilteredSuggestions(e.target.value)
     if(e.target.value.length === 0){
     
      const url = window.location.href;
      const uri = url.split("?")[0]
      window.location.assign(uri)
     }
    }
    focus =(e) =>{
   //   this.setState({inputval:e.target.value})
  //    const parsedQuery = queryString.parse(this.props.location.search)
      this.props.searcher(e.target.value)
        
     this.props.getfilteredSuggestions(e.target.value)
/*
     if(e.target.value.length === 0){
     
      const url = window.location.href;
      const uri = url.split("?")[0]
      window.location.assign(uri)
     }
     */
    } 
    displaysidenav =()=>{
    this.props.showmodalsidenavbar()
    }
    render() { 
    
        return ( 
            <div style={{maxWidth:"100%"}}>
              <div className="row" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",maxWidth:"100%"}}>
                  </div>
                <nav className="navbar navbar-expand-md bg-light navbar-light" style={{padding:"0px",margin:"0px",width:"100%"}}>
                  <div style={{width:"100%", backgroundColor:"white"}}>
                <div className="container">  
     
              <div className="row" style={{padding:"0px 0px 20px 0px"}}>
                <div className="col-1 d-md-none">
                  <center>
                    <span onClick={this.displaysidenav} className="fa fa-bars" style={{margin:"10px",marginLeft:"5px",fontSize:"15px"}}></span>
                  </center>              
                </div>
                  <div className="col-2 col-md-1" >
                    <img  src={require("./images/fruget.jpg")} style={{width:"100%",height:"70%",paddingTop:"10px"}} alt=""/>
                  </div>
                  <div className="d-none d-md-block col-md-8" >
                    <center style={{padding:"15px 0px 0px 20px"}}>
                    <form action="/search" method="get" onSubmit={this.submit} className="row">
                      <div className="col-10">
 <input type="text" className="form-control" style={{width:"100%"}}  value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search products , brand and categories here..."/>
 </div>
 <div className="col-2">
 <button type="submit" className="btn" style={{backgroundColor:"rgb(0, 119, 179)",float:"right",color:"white",boxShadow:"1px 2px 2px grey"}}><small>SEARCH</small></button>
 </div>                
                   </form>
                  </center>
                  </div>

                  <div className="col-7 d-md-none"></div>
                 
                  <div className="d-none d-md-block col-md-3" >
                   
                      <div className="row">
                        <div className="col-6" style={{padding:"10px 0px 0px 0px",border:"0px"}}>
                    <Dropdown>
              <Dropdown.Toggle style={{backgroundColor:"white",border:"0px"}}>            
                 <span class=""  style={{color:"black"}} ><small>Account</small> <span className="far fa-user"></span></span>              
             </Dropdown.Toggle> 
         <Dropdown.Menu>
          <Dropdown.Item ><Link to={encodeURI(`/profile/1996,${localStorage.getItem("id")},fruget0829?user$login&#172`)}><span className="far fa-user"></span> <small> My Profile</small></Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/customer/login"><span className="fa fa-sign-in-alt" ></span> <small> Login</small></Link></Dropdown.Item>
         <Dropdown.Item><Link to="/customer/register"><span className="fa fa-user-plus"> </span> <small> Register</small></Link></Dropdown.Item>
         <Dropdown.Item><Link to={`/saved-items/199666229jshs9,${localStorage.getItem("id")},fruget0829?user$login&#172`}><i class="fas fa-cloud-download-alt"></i> <small> Saved Items</small></Link></Dropdown.Item>
        
       </Dropdown.Menu>     
       </Dropdown>
       </div>
                    <div className="col-6" style={{padding:"10px 0px 0px 0px",border:"0px"}}>           
                     <Dropdown>
                     <Dropdown.Toggle style={{backgroundColor:"white",border:"0px"}}>            
                 <span class=""  style={{color:"black"}} onClick={()=> window.location.assign("/customer/login")}><small >Account</small> <span className="far fa-user"></span></span>              
                  </Dropdown.Toggle> 
                     </Dropdown>
                  </div>
                  </div>
                  </div>

                  <div className=" col-12 d-md-none" style={{padding:"0px 10px 0px 10px"}}>
                    <form   action="/search" method="get" onSubmit={this.submit}>
                  <div className="input-group mb-3">
    <input type="text" className="form-control form-control-sm" name="search" style={{}} value={this.state.inputval}  onChange={this.change2} placeholder="Search products , brand and categories here..." />
    <div className="input-group-append">
      <button className="btn btn-sm" style={{color:"white",backgroundColor:"rgb(0, 119, 179)"}} type="submit">Go</button>  
     </div>
  </div>
  </form>
  </div>
                  </div>
              
              </div>
              
                   
                    </div>
                  
              </nav>
            </div>
         );
    }
}
/*
  <div className=" col-12 d-md-none" style={{padding:"0px 10px 0px 10px "}}>
                  <div className="input-group mb-3">
    <input type="text" className="form-control form-control-sm" style={{backgroundColor:"rgba(242,242,242,0.9)",fontWeight:"bold"}}  onChange={this.change2} placeholder="Search products , brand and categories here..." />
    <div className="input-group-append">
      <button className="btn btn-sm" style={{color:"white",backgroundColor:"rgb(0, 119, 179)"}} type="submit">Go</button>  
     </div>
  </div>
  </div>
<div style={{backgroundColor:"white",border:"0px",position:"relative"}}>
                       <span style={{color:"black"}}><small>My Cart</small><span className="fa fa-cart-plus"></span></span>
        <span className="badge badge-danger" style={{display:`${this.state.cart.length > 0 ?"block" : "none"}`,position:"absolute",left:"60px",top:"-5px",fontWeight:"bolder"}}>{this.state.cart.length }</span>
                     </div>
 <div className="d-none d-md-block col-md-1" >
                    <center style={{padding:"15px 0px 0px 0px"}}>
                 <button type="submit" class="btn" style={{backgroundColor:"rgb(0, 119, 179)", color:"white",boxShadow:"1px 2px 2px grey"}}><small>SEARCH</small></button>
                 
                  </center>
                  </div>
grid/list
col-6 col-md-4 col-lg-3/ col-12 row/ view-row
col-6/col-6 view-col

 <div>
              <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <a className="navbar-brand" ><img src={require ("./images/fruget.jpg")} style={{width:"5%"}} alt=""/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>    
    </ul>
    <form action="/search" method="get" onSubmit={this.submit} className="col-8">
      <input type="text" className="form-control col-10" value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search products here..."/>
    <button type="submit" className="col-2" style={{float:"right"}}>Submit</button>
    </form>
  </div>  
</nav>
            </div>
            */
const mapStateToProps =(store)=>{
  return{           
     products: store.products,
     searching:store.searching,
     status:store.status,
     filteredSuggestions: store.filteredSuggestions,
     suggestions: store.suggestions,
     showSuggestions: store.showSuggestions,
     inputval: store.inputval,
     searchedproducts:store.searchedproducts
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{
  submitsearcher: (data)=> dispatch(submitsearcher(data)),
   searcher: (data)=> dispatch(searcher(data)),
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data)),
   showmodalsidenavbar:()=>dispatch(showmodalsidenavbar()),
   unshowmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar())
 }
}
export default compose(withRouter, connect(mapStateToProps,mapDispatchToProps))(Navbar);