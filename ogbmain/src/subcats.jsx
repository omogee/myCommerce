import React, { Component } from 'react';
import axios from 'axios';
import "./main.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getfilteredSuggestions} from "./store"
import {Carousel} from 'react-bootstrap'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import Suggestions from "./suggestions"
import ModalSideNavbar from "./modalsidenavbar"
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
  
        axios.get("http://fruget.herokuapp.com/products/distinct/subcats")
        .then(res => this.setState({category: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://fruget.herokuapp.com/products/section/one")
        .then(res => this.setState({sectionOne: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://fruget.herokuapp.com/products/section/two")
      .then(res => this.setState({sectionTwo: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://fruget.herokuapp.com/products/section/three")
      .then(res => this.setState({sectionThree: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://fruget.herokuapp.com/products/section/four")
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
      //<div style={{display:`${this.props.mainbgcolor==="white" ? "none" : "block"}`,backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"200%",position:"absolute",top:"0px",zIndex:"2"}}>
   //   x</div>
        return (
           <div>
          <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",position:"absolute"}} className="indexer"> 
          <Suggestions></Suggestions>       
          </div>
          <div style={{display:`${this.props.appDisplay}`}}>            
             <div className="sidenavbar" style={{zIndex:"1",display:`${this.props.modalsidenavbardisplay}`,position:"absolute",top:"0px",width:`${this.props.modalsidenavbarwidth}`}}>
              <ModalSideNavbar/>            
             </div>           
        <div style={{backgroundColor: "#f5f5f0"}}>   
<div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%", height:"300%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
            <div className="container" style={{position:`${this.props.mainbgcolor==="white" ? "" : "fixed"}`}}>
              <div className="row">              
             <div className="col-12  col-lg-9 caro #f5f5f0 mt-2" >
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
   <small style={{padding:"7px"}}>Sell On Fruget</small><br/><br/>
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
              <div className="row" style={{backgroundColor:"white",margin:"5px 2px"}}>
                <div className="col-4 col-md-2">
                 <img src={require("./images/htc-logo.jpg")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                 
                <div className="col-4 col-md-2">
                 <img src={require("./images/lglogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/hisenselogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/biancoofficial.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/nexuslogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/midealogo.jpg")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
              </div>


              <div className="row" style={{padding:"10px"}}>
              <div className="col-12" style={{backgroundColor: "rgb(0, 119, 179)",color:"rgb(64, 64, 64)", borderTopRadius: "4px"}}>
              <p>
                <span style={{fontWeight:"bold",color: "white"}}>SUPER DEALS</span>  
                </p> 
                </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row">
                  <div className="col-8  d-md-none" style={{}}>
                   <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src={require("./images/bia-bask.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{}}>
                    <p>Get a set of TV, wall hanger and power regulator</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}></small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{}}>
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>                          
              </div>


              <div className="row" style={{padding:"10px"}}>
              <div className="col-12" style={{backgroundColor: "white",color:"grey", borderTopRadius: "4px"}}>
              <p>
                <span style={{fontWeight:"bold",color: "rgb(0, 119, 179)"}}>POPULAR CATEGORY</span>  
                </p> 
                </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row">
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                   <small style={{fontWeight:"bold"}}> Refrigerators <br/><small>Lg, Hisense, Syinix, Thermocool, midea etc</small></small>                  
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ('./images/hisense535L-2.jpg')} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Generators <br/><small>sumec, elepaq, tigmax, tiger freezer,Lutian etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> A/C <br/><small>Lg, Hisense, Midea, Nexus etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Cookers <br/><small>Table Top, Standing,Electric and Gas cookers</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Fan <br/><small>Ox, Orl, Binatone, Fanafrik, Century, Panasonic etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/B-ES-1800-(2).jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisense-N2176F-hd.jpg")} alt=""/>
                  </div>
                </div>
              </div>  
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Microwave <br/><small>automatic, Manual, wash&spin etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Power & Inverters <br/><small>Stabilizers, Ups, Inverters etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/bin-2000w.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Blender <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>               
              </div>

              {this.props.loading ?     
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
        : null}

        
             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
 <small style={{fontSize:"14px",textTransform:"capitalize"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionOne.map(section1 => 
                    <div className="col-5 col-md-3 col-lg-2" key={section1.productId}  style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>         
<img src={require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section1.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small><Link to= { `/product/${section1.details}`} style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section1.details}</Link> </small>
                   <b>{section1.mainprice}</b> <br/>
                    </div>
                    </div>
                    )}
               </div>
             </div>
            
             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Power Regulating Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionTwo.map(section2 => 
                    <div className="col-5  col-md-3 col-lg-2" key={section2.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",minWidth:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section2.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 

 <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section2.details}</a> </small>
                   <b>{section2.mainprice}</b> <br/>
                  
                    </div>
                    </div>
                    )}
               </div>
             </div>

             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Kitchen Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionThree.map(section3 => 
                    <div className="col-5 col-md-3 col-lg-2" key={section3.productId}  style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section3.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</a> </small>
                   <b>{section3.mainprice}</b> <br/>
                  
                   </div>
                    </div>
                    )}
               </div>
             </div>

             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
                 <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                 </div>
               <div className="noscrolling">
                   {this.state.sectionFour.map(section4 => 
                    <div className="col-5 col-md-3 col-lg-2" key={section4.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section4.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 

<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section4.details}</a> </small>
                   <b>{section4.mainprice}</b> <br/>
                  
                    </div>
                    </div>
                    )}
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
     searching:store.searching,
     status:store.status,
     filteredSuggestions: store.filteredSuggestions,
     suggestions: store.suggestions,
     showSuggestions: store.showSuggestions,
     inputval: store.inputval,
     loading:store.loading,
     mainbgcolor:store.mainbgcolor,
     modalsidenavbarwidth: store.modalsidenavbarwidth,
     modalsidenavbardisplay: store.modalsidenavbardisplay,
     appDisplay:store.appDisplay
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data)),

 }
}
export default connect(mapStateToProps, mapDispatchToProps)(Subcats);