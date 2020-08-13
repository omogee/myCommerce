import React, { Component } from 'react';
 import "./main.css"
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
          gender:"",
          gendererr:"",
          password:"",
          passworderr:"",
          navigation:[]
        }
    }
    /* conn.query("INSERT INTO users (firstname, lastname,contact, email,gender,hash) VALUES (?)",[firstname,lastname,contact,email,gender,hash], (err,file)=>{
                if (err) throw err;
                res.send("data added successfully")
                */
    validation =()=>{
      if(!this.state.email.includes("@") || !this.state.email.includes(".com")){
        this.setState({emailerr:"please enter a valid email address"})
        return false;
      }
      if(this.state.firstname=== ""){
        this.setState({firstnameerr:"please enter your first name correctly"})
        return false;
      }
      if(this.state.lastname=== ""){
        this.setState({lastnameerr:"please enter your last name correctly"})
        return false;
      }
      if(!this.state.contact=== ""){
        this.setState({contacterr:"Enter phone number correctly"})
        return false;
      }
      if(this.state.gender=== ""){
        this.setState({gendererr:"kindly select your gender"})
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
  navigation:navigation,firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,contact:this.state.contact,gender:this.state.gender,password:this.state.password}
axios.post("http://localhost:5000/customer/submit/register", {data:JSON.stringify(data)})
.then(res => console.log(res.data))
.catch(err => console.log(err))   
}
this.setState(initialState)
}
 change =(e) =>{
   this.setState({[e.target.name]:e.target.value},()=>{
    if(!this.state.email.includes("@") || !this.state.email.includes(".com")){
      this.setState({emailerr:""})
      return false;
    }
    
   })

 }

    render() { 
      console.log(this.state.gender)
        return ( 
           <div>
                <div className="container register">
                  <h3>Create <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Fruget</span> Account</h3><br/>

                  <form action="/submit/register" onSubmit={this.submit} method="post">
                    <div className="row">
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                      <label for="fname" >First Name </label>
	<input type="text" id="fname" name="firstname" placeholder=""  pattern="[A-Za-z]+" value={this.state.firstname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.firstnameerr}</small></small>
                    </div>
                    <div style={{padding:"10px"}}>
                      <label for="lname" >Last Name </label>
 <input type="text" id="lname" name="lastname" placeholder=""  pattern="[A-Za-z]+" value={this.state.lastname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
 <small><small style={{color:"red"}}>{this.state.lastnameerr}</small></small>
                    </div>                   
                    </div>

                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                      <label for="contact" >Phone number </label>
<input type="text" id="contact" name="contact" placeholder="" pattern="[0-9]{,11}$" value={this.state.contact} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                    </div> 
                    <div style={{padding:"10px"}}>
                      <label for="email" >Email </label>
 <input type="text" id="email" name="email" placeholder="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} onChange={this.change} className="form-control " style={{width:"100%"}}/>
 <small><small style={{color:"red"}}>{this.state.emailerr}</small></small>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="row">
                        <div className="col-6">
                     <label for="male">male</label>
                   <input type="radio" id="male" name="gender" value="male" onChange={this.change}/>
                        </div>
                        <div className="col-6">
                   <label for="female">female</label>
                   <input type="radio" id="female" name="gender" value="female" onChange={this.change}/>
                        </div>
                        <small><small style={{color:"red"}}>{this.state.gendererr}</small></small>
                      </div>
                   
                   
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label htmlFor="password">Password</label>
                 <div className="input-group">     
                <input type="password" className="form-control"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
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
<button type="submit" className="" style={{width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>LOGIN</span></button><br/><br/>
<center>
  <small><b>OR</b></small>
</center>
<button type="button" className="" style={{width: "100%",backgroundColor:"white",borderRadius: "5px",padding: "7px",boxShadow:"1px 1px 1px 1px lightgrey",color:"#004d99"}}><span className="fab fa-facebook" style={{float:"left",fontSize:"20px"}}></span>  <span style={{fontWeight:"bolder"}}>LOGIN WITH FACEBOOK</span></button>

                 </div>
                  </div>
                  </form> 
                </div>
           </div>
         );
    }
}
 
export default Register;