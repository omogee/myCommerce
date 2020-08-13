import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {getfilteredSuggestions} from "./store"
import axios from 'axios';
import {searcher, submitsearcher} from './store'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom"
import {compose} from "redux"
import queryString from "query-string"
import {Link} from "react-router-dom"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          inputval:"",
          showSuggestion:false,
          filteredSuggestions:[],
          suggestions:[],
          searcheddata: []
         }
    }
    componentDidMount = () =>{
      this.setState({inputval:this.props.inputval})
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
    render() { 
    
        return ( 
            <div style={{maxWidth:"100%"}}>
              <div className="row" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",maxWidth:"100%"}}>
              <div style={{maxWidth:"100%",textIndent:"30px"}}>
                      <center>
                    <small><small>Dealers On All Kinds Of Electronics At Extra Affordable prices... Get frugal!!!</small></small>
                    </center>
                    </div>
                  </div>
                <nav className="navbar navbar-expand-md bg-light navbar-light" style={{padding:"0px",margin:"0px",width:"100%"}}>
                  <div style={{width:"100%", backgroundColor:"white"}}>
                <div className="container" >
              <div className="row">
                  <div className="col-2 col-md-1" >
                    <img src={require("./images/fruget.jpg")} style={{width:"150%",height:"100%",paddingTop:"10px"}} alt=""/>
                  </div>
                  <div className="d-none d-md-block col-md-8" >
                    <center style={{padding:"15px 0px 0px 20px"}}>
                    <form action="/search" method="get" onSubmit={this.submit} className="row">
                      <div  className="col-10">
 <input type="text" className="form-control" style={{width:"100%"}}  value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search products , brand and categories here..."/>
 </div>
 <div className="col-2">
 <button type="submit" className="btn" style={{backgroundColor:"rgb(0, 119, 179)",float:"right",color:"white",boxShadow:"1px 2px 2px grey"}}><small>SEARCH</small></button>
 </div>                
                   </form>
                  </center>
                  </div>
                 
                  <div className="col-4 d-md-none"></div>
                  <div className="col-6 col-md-3" >
                    <center style={{padding:"10px 0px 0px 0px"}}>
                      <Link to="/customer/login">
                 <button class="btn btn-link" style={{color:"black",boxShadow:"1px 2px 2px lightgrey"}}><small>Login</small> <span className="fa fa-user"></span></button>
                 </Link>
                 <button type="submit" class="btn btn-link" style={{boxShadow:"1px 2px 2px lightgrey",position:"relative", color:"black",fontWeight:"bold"}}>
                   <small>My Cart</small>
                    <span className="fa fa-cart-plus"></span>
                    <span className="badge badge-danger" style={{position:"absolute",right:"0px",top:"-2px",fontWeight:"bolder"}}>0</span>
                    </button>
                  </center>
                  </div>
                 
                  <div className=" col-12 d-md-none" style={{padding:"10px 10px 0px 10px "}}>
                  <div className="input-group mb-3">
    <input type="text" className="form-control form-control-sm" onFocus={this.focus} onChange={this.change2} placeholder="Search products , brand and categories here..." />
    <div className="input-group-append">
      <button className="btn btn-sm" style={{color:"white",backgroundColor:"rgb(0, 119, 179)"}} type="submit">Go</button>  
     </div>
  </div>
  </div>
                  </div>
              
              </div>
              <div className="row" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"0px",margin:"0px",maxWidth:"100%"}}>
                      <div className="col-12"><small>All Categories</small></div>
                      
                    </div>
                   
                    </div>
                  
              </nav>
            </div>
         );
    }
}
/*
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
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data))
 }
}
export default compose(withRouter, connect(mapStateToProps,mapDispatchToProps))(Navbar);