import React, { Component } from 'react';
import queryString from "query-string"
import axios from "axios"
import SavedItems from "./savedItems"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           user:[]
         }
    }
componentDidMount =()=>{
    const userId = this.props.match.params.userId;
    let id= userId.split(",")[1]
    axios.get(`http://localhost:5000/customer/userprofile/${id}`)
    .then(res => {
        if(res.data.message){
            this.setState({user:res.data.file})
        }else{
            console.log("no saved Items to display")
        }
    })
    .catch(err => console.warn(err))
}
    render() { 
        console.log(this.state.user)
        return ( 
            <div className="container">
                <h2>User Profile</h2>
                <small><small>At fruget we are very strict with user details and we ensure you a 100% safety</small></small><br/><br/>
        <p>Welcome {this.state.user.gender = "male" ? "Mr" : "Mrs"} {this.state.user.firstName}</p><br/><br/>
                <div className="row">

                    <div className="col-7">
                 <b>First Name:</b> {this.state.user.firstName} <br/><br/>
                <b>Last Name:</b> {this.state.user.lastName} <br/><br/>
                <b>Contatc:</b> {this.state.user.contact} <br/><br/>
                <b>Email Address :</b> {this.state.user.email}<br/><br/>
                <b>Address</b>: <button className="btn btn-primary" style={{padding:"2px"}}>Add Address</button> <br/><br/>
                    </div>
                    <div className="col-5">
                        <center>
                            <img src={require(`./images/maleprofile.png`)} className="img-thumbnail" style={{border:"2px solid lightgrey"}} alt=""/>
                        </center>
                    </div>
                </div>
                
                <br/><br/>
                <small>view your <button className="btn btn-primary" style={{padding:"2px"}}> saved </button> items</small>
                <br/><br/>
               
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