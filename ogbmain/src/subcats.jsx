import React, { Component } from 'react';
import axios from 'axios';
import "./main.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getfilteredSuggestions} from "./store"
import {Carousel} from 'react-bootstrap'
import {connect} from "react-redux"
import Suggestions from "./suggestions"
const bgimage = require("./images/binble-BLG-595MK2.jpg")
const logo = require("./images/binble-BLG-595MK2.jpg")


class Subcats extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           loading: true,
            category:[],
             sectionOne:[],
             sectionTwo:[],
             sectionThree:[],
             sectionFour:[],
             subcatmodal:"none",
             modalities:{}
         }
    }
    
    componentDidMount = () =>{
  
        axios.get("http://localhost:5000/distinct/subcats")
        .then(res => this.setState({category: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://localhost:5000/section/one")
        .then(res => this.setState({sectionOne: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://localhost:5000/section/two")
      .then(res => this.setState({sectionTwo: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://localhost:5000/section/three")
      .then(res => this.setState({sectionThree: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://localhost:5000/section/four")
      .then(res => this.setState({sectionFour: res.data}))
      .catch(err => console.warn(err))

      this.setState({loading:false})
    }
    
    display = (e) =>{
       const me = e.currentTarget.textContent
       console.log("me", me)
      
        this.setState({subcatmodal : "block"})
    }
    undisplay = () =>{
        this.setState({subcatmodal : "none"})
    }
    render() { 
      if(this.state.loading){
        return (
          <div>Hi, I am still loading</div>
        )
      }
        return (
        <div style={{backgroundColor: "#f5f5f0"}}>   
<div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%", height:"300%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
            <br/>
            <div className="container" >
              <div className="row" >
                
      <div className="col-12  col-lg-9 caro #f5f5f0" >
                <Carousel className="caro">
      <Carousel.Item>
          
        <img
          className="d-block w-100 img-responsive"
          src={`https://ng.jumia.is/cms/Homepage/2020/WK30/SHOES--_1424x768-min.jpg`}
          alt="First slide"
          style={{maxWidth:"100%" , maxHeight:"500px",zIndex:"-1"}}
        />
        <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/Homepage/2020/WK30/CLEARANCE_S_GENERIC.jpg`}
          alt="Second slide"
          style={{}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",left:"-200px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
          style={{}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
          style={{maxWidth:"100%", maxHeight:"500px"}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
                </div>
                <div className="col-3 d-none  d-lg-block" style={{width:"100%", padding:"0px"}}>
                  <div style={{backgroundColor:"white",padding:"12px"}}>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid black"}} className="fa fa-shopping-cart"></span>
   <small style={{padding:"7px"}}>Sell On Efrika</small><br/><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-wrench"></span>
   <small style={{padding:"7px"}}>Visit Service Centre</small><br/><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-backward"></span>
   <small style={{padding:"7px"}}>Return back policy</small><br/>
                  </div>
                  <br/>
                  <div >
                    <img src="https://ng.jumia.is//cms/Homepage/2020/W14/BSB-stay-safe.gif" className="img-responsive" style={{width:"100%", height:"100%"}}/>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
              <div  style={{width: "100%",padding:"5px 0px 0px 5px",backgroundColor: "rgb(0, 119, 179)",color:"rgb(64, 64, 64)", borderTopRadius: "4px",border: "0px"}}>
              <p  style={{textIndent: "3px"}}>
                <span style={{fontWeight:"bold",color: "white"}}>POPULAR CATEGORY</span>  
                </p> 
                </div>
              <div className="col-6 col-lg-2" >
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{padding:"0px"}}>
                    Dispensers
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2">
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{padding:"0px"}}>
                    refrigerators
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2" >
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{padding:"0px"}}>
                    washing machine
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2" >
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{padding:"0px"}}>
                    air conditioners
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-6  col-lg-2" >
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8 d-md-none" style={{padding:"0px"}}>
                    Electric fan
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2">
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none">
                    Kitchen Aid
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%"}} className="img-thumbnail" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
             
             
              </div>

             <div className="row" style={{padding:"0px"}}>
             <div style={{width:"100%",padding:"5px"}}>
 <small style={{fontSize:"15px",textTransform:"uppercase"}}>Cooling Appliances <span className="fa fa-arrow-right"></span></small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionOne.map(section1 => 
                    <div className="col-6 col-md-3 col-lg-2" key={section1.productId}>
                      <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
                        
<img src={require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section1.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} style={{width:"100%",height:"180px",  padding:"0px"}} alt=""/> 
<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section1.details}</a> </small>
                   <b>{section1.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner">

                           </div>
                       </div> (1)
                   </small>
                    </div>
                    </div>
                    )}
               </div>
             </div>
             
             <br/>
             <div className="row" style={{padding:"0px"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Power Regulating Appliances <span className="fa fa-arrow-right"></span></small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionTwo.map(section2 => 
                    <div className="col-6  col-md-3 col-lg-2" key={section2.productId}>
                      <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section2.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} style={{width:"100%",height:"180px",  padding:"0px"}} alt=""/> 

 <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section2.details}</a> </small>
                   <b>{section2.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner">

                           </div>
                       </div>
                   </small>
                    </div>
                    </div>
                    )}
               </div>
             </div>
             <br/>
             <div className="row" style={{padding:"0px"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Kitchen Appliances <span className="fa fa-arrow-right"></span></small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionThree.map(section3 => 
                    <div className="col-6  col-md-3 col-lg-2" key={section3.productId}>
                      <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section3.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} style={{width:"100%",height:"180px",  padding:"0px"}} alt=""/> 
<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</a> </small>
                   <b>{section3.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner">

                           </div>
                       </div>
                   </small>
                   </div>
                    </div>
                    )}
               </div>
             </div>

             <br/>
             <div className="row" style={{padding:"0px"}}>
                 <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Cooling Appliances <span className="fa fa-arrow-right"></span></small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black"}}>see more <span className="fa fa-arrow-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionFour.map(section4 => 
                    <div className="col-6  col-md-3 col-lg-2" key={section4.productId}>
                      <div style={{backgroundColor:"white",width:"115%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section4.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} style={{width:"100%",height:"180px",  padding:"0px"}} alt=""/> 

<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section4.details}</a> </small>
                   <b>{section4.mainprice}</b> <br/>
                   <small>
                       <div className="outer">
                           <div className="inner">

                           </div>
                       </div>
                   </small>
                    </div>
                    </div>
                    )}
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
     searching:store.searching,
     status:store.status,
     filteredSuggestions: store.filteredSuggestions,
     suggestions: store.suggestions,
     showSuggestions: store.showSuggestions,
     inputval: store.inputval
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data))
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(Subcats);