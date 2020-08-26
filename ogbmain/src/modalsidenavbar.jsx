import React, { Component } from 'react';
import axios from "axios"
class ModalSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[],
            subcategory:[]
          }
    }
    componentDidMount =()=>{
        axios.get("http://fruget.herokuapp.com/allcategories")
        .then(res => this.setState({category: res.data}))
        .catch(err => console.warn(err))
    }
    
    subcat=(e)=>{
      console.log(e.currentTarget.textContent)
      axios.get(`http://fruget.herokuapp.com/customer/allcategories/subcat?category=${e.currentTarget.textContent}`)
      .then(res => this.setState({subcategory:res.data}))
      .catch(err => console.warn(err))
    }
    render() { 
        return ( 
            <div>
              <div id="mySidebar" className="sidebar  hidden-md hidden-lg hidden-xl"  style={{position:"relative",backgroundColor:"white",zIndex:"1000000"}}>
  <div style={{zIndex:"1000000"}}>
     <img src={require("./images/fruget.jpg")} className="img-responsive" style={{width:"20%"}}/>
  </div>

  <a href="javascript:void(0)" className="closebtn" onClick="closeNav()" style={{textDecoration:"none"}}>x</a>
<div>
<a href="/shop/shopping-cart"><button type="button" className="btn btn-link" style={{color: "black",fontWeight: "bolder"}}>
                                        <span className="badge badge-danger" style={{top:"2px",position:"absolute",right:"5px"}}>0</span>
                                        <b><span className="fa fa-cart-plus" style={{fontSize:"black"}} ></span></b>
                                        <p className="hidden-sm hidden-xs">Cart</p>
                                </button></a>

</div>

<br/>
<div className="row" style={{padding:"0px 10px"}}>
<div className="col-6">
<button className="btn btn-link " type="button" style={{border: "1px solid red",borderRadius:"3px",width: "100%",color:"red",display:"block"}}> <span className="fa user"></span> Login</button>
</div>

 <div className="col-6">
<button className="btn btn-link " type="button" style={{border:"1px solid red",borderRadius:"3px",width:"100%",padding:"5px",color:"red"}}> <span className="fa fa-heart"></span> Register</button>
</div>
</div> <br/>
<div  className="row" style={{padding:"0px 10px"}}>
 <div className="col-6">
<button className="btn btn-link " type="button" style={{border: "1px solid red",borderRadius:"3px",width: "100%",color:"red",display:"block"}}> <span className="fa fa-map-marker"></span> Track Order  ID</button>
</div>

 <div className="col-6">
<button className="btn btn-link " type="button" style={{border:"1px solid red",borderRadius:"3px",width:"100%",padding:"5px",color:"red"}}> <span className="fa fa-heart"></span> Saved Items</button>
</div>

</div>
<br/>
 <small style={{paddingLeft:"20px"}} className="text-muted"><b>Categories</b></small>
 <div style={{paddingLeft:"30px"}} className="row">
   <div className="col-6">
    {this.state.category.map((categories) =>
        <div key={categories.subcat1}>
             <p onClick={(e)=>this.subcat(e)} style={{color:"black"}}><small style={{textTransform:"capitalize"}} className="text-muted">{categories.subcat1}</small></p>
        </div>
        )}
      </div>
      <div>
         
      </div>
 </div>
<div style={{padding:"30px"}}>
  <a href="/electronics/refrigerator?page=1" style={{color:"black",fontSize:"15px",padding:"0px 8px 8px 8px",textTransform:"capitalize"}}>refrigerator</a>

<a  data-toggle="collapse" href="#collapse2" style={{color:"black",fontSize:"15px",padding:"10px",textTransform:"capitalize"}}>T v<span class="fa fa-tv" style={{float: "right"}}></span></a>
  <div id="collapse2" className="panel-collapse collapse" >
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
</div>

</div>
</div>
            </div>
         );
    }
}
 
export default ModalSideNavbar;