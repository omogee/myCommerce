import React, { Component } from 'react';
import axios from "axios"
import {allcategories, allsubcategories, unshowmodalsidenavbar} from "./store"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

class ModalSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[],
            subcategory:[],
            currentcategory:"",
            set:"Category",
            subcategorydisplay:"none"
          }
    }
    componentDidMount =()=>{
     this.props.allcategories()
    }
    
    subcat=(e)=>{
      this.props.allsubcategories(e.currentTarget.textContent)
      this.setState({currentcategory:e.currentTarget.textContent,set:"Sub-Category",subcategorydisplay:"block"})

    }
    undisplaysidenav =()=>{
      this.props.showmodalsidenavbar()
      }
    render() { 
      console.log(this.props.allsubcategory)
        return ( 
            <div>
               <div id="mySidebar" className="container"  style={{backgroundColor:"white",zIndex:"1000000"}}>
              <div className="row">
                <div className="col-1">
                  <a href="javascript:void(0)" className="closebtn" onClick={this.undisplaysidenav} style={{color:"black",textDecoration:"none",fontSize:"25px"}}>x</a>
                  </div>
              <div style={{zIndex:"1000000"}} className="col-4">
          <img src={require("./images/fruget.jpg")} className="mt-2" style={{width:"100%",height:"80%"}}/>
         </div>
       <div className="col-7"></div>
       </div>  
       <hr/>       
   <p>Account</p>
<div className="row" style={{padding:"0px 10px"}}>
<div className="col-6">
<button className="btn" onClick={()=> window.location.assign("/customer/login")} style={{backgroundColor:"orange",textDecoration:"none",borderRadius:"3px",width: "100%",color:"grey",padding:"2px"}}>
   <span className="far fa-user"></span> Login</button>
</div>

 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/register")}  style={{backgroundColor:"orange",border:"1px solid grey",textDecoration:"none",borderRadius:"3px",width:"100%",padding:"2px",color:"grey"}}> <span className="fa fa-heart"></span> Register</button>
</div>
</div> <br/>
<div  className="row" style={{padding:"0px 10px"}}>
 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/login")}  style={{backgroundColor:"orange",borderRadius:"3px",textDecoration:"none",width: "100%",color:"grey",padding:"2px"}}> <span className="fa fa-map-marker"></span> Track Order  ID</button>
</div>

 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/savedItems")}  style={{backgroundColor:"orange",border:"1px solid grey",borderRadius:"3px",textDecoration:"none",width:"100%",padding:"2px",color:"grey"}}> <span className="fa fa-heart"></span> Saved Items</button>
</div>

</div>
<br/>

 <p>{this.state.set}</p>
 <a href={`/category/${this.state.currentcategory}`}>
 <p style={{backgroundColor:"black", color:"white",padding:"10px",display:`${this.state.subcategorydisplay}`}}>
  {this.state.currentcategory}
   <i style={{float:"right"}} className="fas fa-chevron-down ml-1"></i>
 </p></a> 
 <div style={{paddingLeft:"30px"}} className="row">
   <div className="col-12">
    {this.props.allcategory.length > 0 ? this.props.allcategory.map((categories) =>
        <div key={categories.subcat1 || categories.subcat2} style={{color:"black",cursor:"pointer"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.subcat1 || categories.subcat2}</small>
             </p>
            <hr/>
        </div>
        ) : null}
      </div>
      <div>
      <p>Our Services :</p>
      </div>
 </div>
</div>
            </div>
         );
    }
}
 const mapStateToProps =(store)=>{
   return{
   allcategory:store.allcategories,
   allsubcategory:store.allsubcategories
   }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     allcategories: ()=>dispatch(allcategories()),
     allsubcategories:(data)=> dispatch(allsubcategories(data)),
     showmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar())
   }
 }
export default connect(mapStateToProps,mapDispatchToProps)(ModalSideNavbar);