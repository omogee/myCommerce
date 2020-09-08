import React, { Component, isValidElement } from 'react';
 import "./main.css"
 import {states} from "./state"
import axios from 'axios';
const initialState={
          firstname:"",
          lastname:"",
          email:"",
          contact:"",
          gender:"",
          password:"",
          navigation:[]
}
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstname:"",
          firstnameerr:"",
          lastname:"",
          lastnameerr:"",
          email:"",
          emailerr:"",
          contact:"",
          contacterr:"",
          gender:"male",
          gendererr:"",
          password:"",
          passworderr:"",
          address:"",
          addresserr:"",
          state: null,
          stateerr:"",
          lgaerr:"",
          lga:null,
          navigation:[]
        }
    }
    componentDidMount=()=>{
     states.map(state =>{
      if(state.state.name === "Abia State"){
        state.state.locals.map(local =>{
          console.log(local.name)
        })
      }
     })
    }

  }
    validation =()=>{
      var regex = /^[A-Za-z0-9 ]+$/
    var regex2 = /^[0-9]+$/
    var regex3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    var regex4 =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    var isvalidfirstname = this.state.firstname.match(regex)
    var isvalidlastname = this.state.lastname.match(regex)
    var isvalidcontact = this.state.contact.match(regex2)
    var isvalidpass = this.state.password.match(regex3)
    var isvalidemail =this.state.email.match(regex4)
    if(!isvalidcontact){
      this.setState({contacterr:"please enter a valid email address"})
      return false;
    }
      if(!isvalidemail){
        this.setState({emailerr:"please enter a valid email address",password:""})
        return false;
      }
      if(!isvalidfirstname){
        this.setState({firstnameerr:"please enter your first name correctly",password:""})
        return false;
      }
      if(!isvalidlastname){
        this.setState({lastnameerr:"please enter your last name correctly",password:""})
        return false;
      }
      if(!isvalidpass){
        this.setState({passworderr:"Enter phone number correctly",password:""})
        return false;
      }
      if(this.state.gender=== ""){
        this.setState({gendererr:"kindly select your gender",password:""})
        return false;
      }
      if(this.state.state=== null || this.state.state === ""){
        this.setState({stateerr:"kindly select your state of residence",password:""})
        return false;
      }
      if(this.state.lga=== null || this.state.lga === ""){
        this.setState({lgaerr:"kindly select your lga of residence",password:""})
        return false;
      }
      return true
    }
    submit =(e)=>{
      e.preventDefault(); 
     const isValid = this.validation()
     if(isValid){
     const navigation={
       appCodeName:navigator.appCodeName,
       appVersion:navigator.appVersion,
       userAgent:navigator.userAgent,
       navigator:navigator.platform,
       product:navigator.product,      
     };
const data ={
  navigation:navigation,
  firstname:this.state.firstname,
  lastname:this.state.lastname,
  email:this.state.email,
  contact:this.state.contact,
  gender:this.state.gender,
  password:this.state.password,
  state:this.state.state,
   lga: this.state.lga}
axios.post("http://fruget.herokuapp.com/customer/submit/register", {data:JSON.stringify(data)})
.then(res => { 
  if(res.data.register){
    this.setState({Message:res.data.message,displayMessage:"block",displayColor:"lightgreen",firstname:"",lastname:"",email:"",password:"",gender:"",})
  }
  else{
    this.setState({Message:res.data,displayMessage:"block",displayColor:"pink"})
  }
})
.catch(err => console.log(err))   
}else{
  this.setState({Message:"Data is not valid",displayMessage:"block",displayColor:"pink"})
}
}
 change =(e) =>{
   this.setState({[e.target.name]:e.target.value},()=>{
    var regex = /^[A-Za-z0-9 ]+$/
    var regex2 = /^[0-9]+$/
    var regex3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    var regex4 =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    var isvalidemail =this.state.email.match(regex4)
    var isvalidfirstname = this.state.firstname.match(regex)
    var isvalidlastname = this.state.lastname.match(regex)
    var isvalidcontact = this.state.contact.match(regex2)
    var isvalidpass = this.state.password.match(regex3)
    if(!isvalidfirstname){
      this.setState({firstnameerr:""})
      return false;
    }
    if(!isvalidlastname){
      this.setState({lastnameerr:""})
      return false;
    }
    if(!isvalidcontact){
      this.setState({contacterr:""})
      return false;
    }
    if(!isvalidemail){
      this.setState({emailerr:""})
      return false;
    }
    if(!isvalidpass){
      this.setState({passworderr:""})
      return false;
    }
   })

 }
    render() { 
      console.log(this.state.state, this.state.lga)
        return ( 
           <div>
                <div className="container register">
                <br/>
                  <p>Create <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Fruget</span> Account</p>
            <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
                 {this.state.Message}
                 </div>
                  <form action="/submit/register" onSubmit={this.submit} method="post">
                    <div className="row">
                    <div className="col-sm-12 col-md-6"> 
                    <div style={{padding:"10px"}}>
                      <label for="fname" >First Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
	<input type="text" id="fname" name="firstname" required  pattern="[A-Za-z]+" value={this.state.firstname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.firstnameerr}</small></small>
                    </div>
                    <div style={{padding:"10px"}}>
                      <label for="lname" >Last Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
 <input type="text" id="lname" name="lastname" required  pattern="[A-Za-z]+" value={this.state.lastname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
 <small><small style={{color:"red"}}>{this.state.lastnameerr}</small></small>
                    </div>                   
                    </div>

                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                      <label for="contact" >Phone number <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="contact" name="contact" required pattern="[0-9]{,11}$" value={this.state.contact} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                    </div> 
                    <div style={{padding:"10px"}}>
                      <label for="email" >Email <span style={{color:"red",fontSize:"20px"}}>*</span></label>
 <input type="text" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} onChange={this.change} className="form-control " style={{width:"100%"}}/>
 <small><small style={{color:"red"}}>{this.state.emailerr}</small></small>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label for="male">Gender <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <select name="gender" className="form-control" id="gender" onChange={this.change} value={this.state.gender}>
                 <option value="male">male</option>
                 <option value="female">female</option>
                 </select>
                    </div>                                   
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select State of Residence <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                <select name="state" className="form-control" id="state" onChange={this.change} value={this.state.state}>
                  <option value="">Select state of residence</option>
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                <small><small style={{color:"red"}}>{this.state.stateerr}</small></small>
                    </div>                                   
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select lga of Residence <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <select name="lga" className="form-control" id="lga" value={this.state.lga} onChange={this.change}>
                 <option value="">Select lga of residence</option>
                 {states.map(state =>  
                 state.state.name === this.state.state ? 
                 state.state.locals.map(mainstate =>
                 <option value={`${mainstate.name}`}>{mainstate.name}</option>
                  )              
                  : null                                
                  )}
                 </select>
                 <small><small style={{color:"red"}}>{this.state.lgaerr}</small></small>
                    </div>                                   
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label htmlFor="password">Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <div className="input-group">     
                <input type="password" required className="form-control"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
                <div className="input-group-btn">
                  <button className="btn " className="eye" onclick='changepassType()'  style={{paddingRight: "3px",border:"1px solid lightgrey",backgroundColor:"white"}}><i className="fa fa-eye-slash fa-2x"></i></button>
                </div>
                 </div>
                 <small><small style={{color:"red"}}>{this.state.passworderr}</small></small>
                 </div>
                 </div>                 
                 <div className="col-12">
                 <br/>
                   <input type="checkbox" checked/> <small>I would love to recieve updates on major goods and other news letters</small> <br/><br/>
<button type="submit" className="" style={{width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER</span></button><br/><br/>
<center>
  <small><b>OR</b></small>
</center>
<button type="button" className="" style={{width: "100%",backgroundColor:"white",borderRadius: "5px",padding: "7px",boxShadow:"1px 1px 1px 1px lightgrey",color:"#004d99"}}><span className="fab fa-facebook" style={{float:"left",fontSize:"20px"}}></span>  <span style={{fontWeight:"bolder"}}>REGISTER WITH FACEBOOK</span></button>

                 </div>
                  </div>
                  </form> 
                </div>
           </div>
         );
    }
}
 
export default Register;