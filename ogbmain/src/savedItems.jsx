import React, { Component } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"

class SavedItems extends Component {
    state = { 
        products:[],
        viewrow:"col-6 col-md-4 col-lg-3",
        viewcol:""
     }
    componentDidMount =()=>{
      let userId = this.props.match.params.userId;
      userId= userId.split(",")[1] 
        axios.get(`http://fruget.herokuapp.com/customer/${userId}/saveditems`)
        .then(res =>{
        if(res.data.message){
          this.setState({products:res.data.files})
        }else{
          console.log("sorry dad")
        }
        })
        .catch(err => console.warn(err))
    }
    render() { 
      console.log(this.state)
        return ( 
            <div>
                <div className="container">
                   <h1>{ this.state.products === [] ? " No Saved Items" : "Saved Items"}</h1>
                   <div className="row">         
                   <div className="col-3">
                     
                     </div>             
                       <div className="col-9">
                         <div className="row">
                       {this.state.products.map((product) =>          
           <div className={`${this.state.viewrow}`}   key={product.productId} >         
          <div className={`${this.state.viewcol}`}>
            <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
          </div>
          <div className={`${this.state.viewcol}`}> 
        <small style={{float:"left"}}>{product.brand} </small><br/>
           <small style={{height:"40px"}}>
            <div  className="details">
    <Link to ={`/product/${product.details}`} style={{color:'black'}}>
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
        <center>
        <button type="button" onClick={()=>this.addtocart(product.productId)} style={{width: "100%",backgroundColor:"rgba(0, 119, 179,0.9)",borderRadius:"5px",padding: "1px",color:"white"}}>
         <span style={{fontWeight:"bold"}}>ADD TO CART</span></button>
        </center>
        <br/>
        </div>
           </div> 
           
         )}
                       </div>
                   </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default SavedItems;