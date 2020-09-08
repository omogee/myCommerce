import React, { Component } from 'react';
import queryString from "query-string"
import axios from "axios"
import SavedItems from "./savedItems"
import {states} from "./state"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           user:[],
           state:"",
           lga:"",
           dform:"none"
         }
    }
componentDidMount =()=>{
    const userId = this.props.match.params.userId;
    let id= userId.split(",")[1]
    axios.get(`http://fruget.herokuapp.com/customer/userprofile/${id}`)
    .then(res => {
        if(res.data.message){
            this.setState({user:res.data.file})
        }else{
            console.log("no saved Items to display")
        }
    })
    .catch(err => console.warn(err))
}
change=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
displayform=()=>{
this.setState({dform:"block"})
}
undisplayform=()=>{
    this.setState({dform:"none"})  
}
    render() { 
        console.log(this.state.user)
        return ( 
            <div className="container">
                <h2>User Profile</h2>
                <small><small>At fruget we are very strict with user details and we ensure you a 100% safety</small></small><br/><br/>
        <p>Welcome {this.state.user.gender = "male" ? "Mr" : "Mrs"} {this.state.user.firstName}</p><br/><br/>
        <small style={{float:"right"}}><button className="btn btn-success">view stores </button> </small><br/>
                <div className="row">
                    <div className="col-7">
                 <b>First Name:</b> {this.state.user.firstName} <br/><br/>
                <b>Last Name:</b> {this.state.user.lastName} <br/><br/>
                <b>Contatc:</b> {this.state.user.contact} <br/><br/>
                <b>Email Address :</b> {this.state.user.email}<br/><br/>
 <b>Address</b>: <button className="btn btn-primary" style={{display:`${this.state.dform==="block" ? "none" : "inline-block"}`,padding:"2px"}} onClick={this.displayform}>Add Address</button>
  <span className="fa fa-times ml-5" onClick={this.undisplayform} style={{float:"right",display:`${this.state.dform==="none" ? "none" : "inline-block"}`,fontSize:"20px"}}></span> <br/>
                <div style={{display:`${this.state.dform}`}}>
                 <form action="">
                     <div className="row">
                     <div className="col-12">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select State of Residence </label>
                <select name="state" className="form-control" id="state" onChange={this.change} value={this.state.state}>
                  <option value="">Select state of residence</option>
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                <small><small style={{color:"red"}}>{this.state.stateerr}</small></small>
                    </div>                                   
                    </div>
                    <div className="col-12">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select lga of Residence </label>
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
                    <div className="col-12">
                <div style={{padding:"10px"}}>
             <label htmlFor="password">Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
             <div className="input-group">     
            <input type="password" className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
            <div className="input-group-btn">
              <button className="btn btn-link" className="eye" onclick='changepassType()'  style={{border:"1px solid lightgrey"}}>Hide</button>
            </div>
             </div>
             <small><small style={{color:"red"}}>{this.state.passworderr}</small></small>
             </div>
             </div>
  
                     </div>
                     <div style={{padding:"10px"}}>
                     <button className="btn btn-primary" style={{padding:"2px"}} >Change Address</button> 
                     </div><br/>
                 </form>
                </div>
                <br/>
                    </div>
                    <div className="col-5">
                        <center>
                            <img src={require(`./images/maleprofile.png`)} className="img-thumbnail" style={{border:"2px solid lightgrey"}} alt=""/>
                        </center>
                    </div>
                </div>
                
                <br/>
                <br/>
                <small>view your <button className="btn btn-primary" style={{padding:"2px"}}> saved </button> items</small>
                <br/><br/>
                <SavedItems userIdentity={localStorage.getItem("id")} style={{display:"none"}}></SavedItems>
               
                <table className="table table-stripped">
                    <thead style={{backgroundColor:"rgb(0, 119, 179)",color:"white"}}>
                        <tr>
                            <th>s/no</th>
                            <th>Cart</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default Profile;