import React, { Component } from 'react';
import {connect} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
            <div className="container" >
                <div className="row">
                    <div className="col-3"></div>
                    <center>
<div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,width:"50%",borderRadius:"10px",position:"absolute",backgroundColor:"white",left:"15%",top:"-20px",padding:"15px",border:"1px solid lightgrey", zIndex:"2"}}>
<ul style={{listStyleType:"none", textAlign:"left"}}>
         <p style={{color:"lightgrey",fontSize:"12px",borderBottom:"1px solid lightgrey",width:"100%"}}>BRANDS</p>
{ this.props.showSuggestions === true && this.props.inputval.length > 0 && this.props.filteredSuggestions.length > 0 ?

 this.props.filteredSuggestions.slice(0, 5).map((suggests, index) =>

         <div key={suggests.maindetails}>
<small> 
<a href="" style={{color:"black"}}>  

    </a>  
    </small> <br/>
 </div> 
                ) : this.props.showSuggestions === false || this.props.inputval.length < 0 ? null :
                 <p>No BRAND! <small>Check your spellings and kindly search again </small></p>}
                
                 </ul>
             
                <ul style={{listStyleType:"none", textAlign:"left"}}>
 <p style={{padding:"5px",color:"lightgrey",fontSize:"12px",borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey",width:"100%"}}>PRODUCTS</p>
{ this.props.showSuggestions === true && this.props.inputval.length > 0 && this.props.filteredSuggestions.length > 0 ?

 this.props.filteredSuggestions.slice(0, 5).map((suggests, index) =>

         <div key={suggests.maindetails}>
<a href="" style={{color:"black"}}> 
      <img  style={{maxWidth:"5%", float:"left"}} src={require(`./images/${suggests.searchimg}`)} />  
         <li style={{marginLeft:"40px"}}><small style={{textTransform:"capitalize"}}>{suggests.maindetails}</small></li> <br/> 
    </a>  
 </div> 
                ) : this.props.showSuggestions === false || this.props.inputval.length < 3 ? null :
                 <p>No PRODUCTS Found! <small>Check your spellings and kindly search again </small></p>}
                 <hr/>
                 </ul>
                    </div>
                    </center>
                </div>      
            </div>
            </div>         
         );
    }
}
 const mapStateToProps = (store) =>{
     return {
        products: store.products,
        searching:store.searching,
        status:store.status,
        filteredSuggestions: store.filteredSuggestions,
        suggestions: store.suggestions,
        showSuggestions: store.showSuggestions,
        inputval: store.inputval
     }
 }
export default connect(mapStateToProps)(Suggestions);