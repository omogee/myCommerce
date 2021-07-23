import React, { Component } from 'react';
import axios from 'axios';

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cart:[],
            pricevalue:"",
            totalprice:""
         }
    }
    componentDidMount=()=>{
       this.getcart();
    }
    getcart =()=>{
        let user = this.props.match.params.userId
        user = user.split(",")[1]
        axios.get(`http://fruget.herokuapp.com/customer/checkout?user=${user}`)
        .then(res => this.setState({cart: res.data.files,totalprice:res.data.totalprice},()=>{
            console.log(res.data.totalprice)
        }))
        .catch(err => console.warn(err))
    }
    increaseCart = details =>{
        axios.get(`http://fruget.herokuapp.com/customer/increasecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
    }
    decreaseCart = details =>{
        axios.get(`http://fruget.herokuapp.com/customer/decreasecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
    }
   deletecart=(details)=>{
    axios.get(`http://fruget.herokuapp.com/customer/deletecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
   }
    render() { 
        return ( 
            <div style={{backgroundColor:"rgb(242, 242, 242)"}}>
               <div className="container">
                <p style={{fontSize:"20px"}}>Cart ({this.state.cart.length})</p>
                    <div className="row text-muted dodo">
                           <div className="col-6">
                         
                           <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>
                          
                           </div>
                           <div className="col-2">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> quantity</small>
                             </center>
                           </div>
                           <div className="col-2">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Price</small>
                             </center>
                           </div>
                           <div className="col-2">
                           <center>
                           <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Sub Total</small>
                           </center>
                           </div>
                              </div>
                              <div style={{margin:"0px",padding:"0px"}}>
                              {this.state.cart.map(carts=>
                        <div  className="row" key={carts.id} style={{borderRadius:"10px",borderBottom:"1px solid lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                            <div className="col-4 col-md-1">
                               <img src={require(`./images/${carts.mainimg}`)} style={{width:"100%",padding:"5px"}} alt=""/>
                            </div>
                           <div className="col-8 col-md-5" >
                               <small className="text-muted" style={{textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>{carts.details}</small><br/>
                               <div className="row" style={{padding:"25px 0px 0px 0px"}}>
                                 <div className="col-6 text-danger" >
                                     <center>
                                        <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer"}}> <span className="fa fa-trash" ></span> REMOVE </div>
                                     </center>
                                 </div>
                                 <div className="col-6" style={{color:"orange"}}>
                                     <center>
                                         <span className="fa fa-heart" onClick={this.saveItem}></span> Save Item
                                     </center>
                                 </div>
                               </div>
                               
                           </div>
                           <div className="col-6 col-md-2" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                          <center>
 <small style={{fontSize:"25px",cursor:"pointer"}} onClick={()=> this.decreaseCart(carts.details)}>-</small> <small style={{fontSize:"20px"}}> {carts.quantity}</small> <small style={{fontSize:"25px",cursor:"pointer"}} onClick={()=> this.increaseCart(carts.details)}>+</small><br/>
                          </center>
                          
                           </div>
                           <div className="col-3 col-md-2" style={{borderRight:"1px solid lightgrey"}}>
                           <center>
                           <p>{carts.mainprice}</p>
                           </center>
                           
                           </div>
                           <div className="col-3 col-md-2 text-muted">
                           <center>
                               <b style={{padding:"auto"}}>{carts.subtotal}</b>
                           </center>
                           
                           </div>
        
                              </div>
                        )} 
                     </div>
                     <br/>
                     <br/>
                    <div className="row">
                       <div className="col-8"></div>
                       <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                           <div style={{float:"right"}}>
                           <small className="text-muted">Subtotal</small> : {this.state.totalprice} <br/>
                           <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                           <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.state.totalprice}</small>
                           </div>
                       </div>
                    </div>
                    <div style={{backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
                  <div style={{padding:"20px 50px"}} className="row" >
                      <div className="col-6">
                          <center>
                         <button className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Check Out</button>
                         </center>
                      </div>
                      <div className="col-6">
                      <center>
                         <button className="btn btn-warning" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Continue Shopping</button>
                         </center>
                      </div>
                  </div>
                  </div>
                    </div>
            </div>
         );
    }
}
 
export default CheckOut;