import React, { Component } from 'react';
import { connect } from 'react-redux';
import {allcategories, subcat2, subcat3} from "./store"
import {category} from "./state"
import "./main.css"


class ProductUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:"",
            generalcategory:"",
            subcat1:"",
            subcat2:"",
            subcat3:"",
            brand:"",
            entrytext:"",
            details:"",
            color:"",
            size:"",
            feature1:"",
            feature2:"",
            feature3:"",
            feature4:"",
            feature5:"",
            price:"",
            discount:"",
            model:"",
            power:"",
            aboutbrand:""

         }
    }
    componentDidMount=()=>{
        this.props.allcategories()
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value}, ()=>{
    //        this.props.subcat2(this.state.selectedSubcat1)
    //    this.props.subcat3(this.state.selectedSubcat1)
        })       
    }

    render() { 
        {Object.keys(category).map(cat =>
           console.log(cat)
            )}
        return ( 
            <div>
                <div className="container">
                <p> <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Upload</span> Product On Fruget</p><small className="mr-5" style={{float:"right",fontSize:"20px"}}>30/30</small>
                 <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
                 <small>{this.state.Message}</small>
                 </div>
                 <form action="">
                     <div className="row">
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="category">Category</label> 
<select type="text" id="category" name="category" onChange={this.change} className="form-control" value={this.state.category}  placeholder="Enter Category e.g home Appliance,clothing, accessories etc">
   <option value="">select general category</option>
    {Object.keys(category).map(cat =>
            <option value={`${cat}`}>{cat}</option>
        )}
</select>
                        </div>
                        </div>
                        {this.state.category.length > 0 ?
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="gencategory">Generalcategory</label>
   <select style={{backgroundColor:"white"}} type="text" onChange={this.change} id="gencategory" name="generalcategory" className="form-control" value={this.state.generalcategory} >
   <option value="">select category</option>     
                         {category[`${this.state.category}`].map(subcat=>
                        <option value={`${subcat.name}`}>{subcat.name}</option>
                          )}
   </select>
                         </div>
                        </div> 
                    :null}
                        
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                        <label >Image Upload</label>
                         <input type="file"  className="form-control"  />
                         <small className="text-danger">Make sure image is clear enough and in jpeg or png format</small>
                         </div>
                        </div>
                        {this.state.generalcategory.length > 0 ?
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}> 
                            <label htmlFor="subcat1">Select sub-category</label>
                            <select className="form-control" onChange={this.change} value={`${this.state.subcat1}`} name="subcat1" id="subcat1">
                           {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat1.map(cat1=>
                                <option value={`${cat1}`}>{cat1}</option>
                                ) : null
                            )}
                            </select>
                        </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length > 0 ?
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat2" >Select sub-category2</label>
                            <select className="form-control" id="subcat2" name="subcat2" onChange={this.change} value={`${this.state.subcat2}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat2.map(cat2=>
                                <option value={`${cat2}`}>{cat2}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length >  0 ?
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat3" >Select sub-category3</label>
                            <select className="form-control" name="subcat3" id="subcat3" onChange={this.change} value={`${this.state.subcat3}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory && cat.subcat3?
                               cat.subcat3.map(cat3=>
                                <option value={`${cat3}`}>{cat3}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                        <div className="col-12 col-md-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="brand">brand</label>
         <input type="text" id="brand"  name="brand" onChange={this.change} className="form-control" value={this.state.brand} placeholder="Note : No spacing inbetween E.g lg, hisense, tummyhilfiger"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="entrytext">Entry Text</label>
<input type="text" id="entrytext"  name="entrytext" onChange={this.change} className="form-control" value={this.state.entrytext} placeholder="convince your seller in less than 100 words.."/>
<small className="text-muted" style={{fontSize:"10px"}}>get off the wether with quality and affordable jackets from tummyhilfiger</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="details">details</label>
    <input type="text"  id="details" name="details" onChange={this.change} className="form-control" value={this.state.details} placeholder="e.g bianco standing fan, lg copper double door refrigerator...etc(50)"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="colors">colours available <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="colors" name="colors" onChange={this.change} style={{fontSize:"14px"}} className="form-control" value={this.state.color} placeholder="Enter all the colours available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"14px"}} className="text-muted">E.g red , blue, black...</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="size">size <span style={{color:"red", fontSize:"20px"}}>*</span></label>
 <input type="text" id="size" name="size" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.size} placeholder="Enter all the sizes available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"14px"}} className="text-muted">E.g 16 inches , 20 inches , 2 litres ...</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature1">Feature 1 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature1" name="feature1" className="form-control" onChange={this.change} value={this.state.feature1} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature2">Feature 2 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature2" name="feature2" className="form-control" onChange={this.change} value={this.state.feature2} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature3">Feature 3 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature3" name="feature3" className="form-control" onChange={this.change} value={this.state.feature3} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature4">Feature 4</label>
                         <input type="text" id="feature4" name="feature4" className="form-control" onChange={this.change} value={this.state.feature4} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature5">Feature 5</label>
                         <input type="text" id="feature5"  name="feature5" className="form-control" onChange={this.change} value={this.state.feature5} />
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="price">Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="price" name="price" className="form-control" onChange={this.change} value={this.state.price}/>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="discount">discount</label>
            <input type="text" id="discount" name="discount" className="form-control" Onchange={this.change} value={this.state.discount} />
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="model">model</label>
   <input type="text" id="model" name="model" className="form-control" onChange={this.change} value={this.state.model} placeholder="Enter the model number for easier identification"/>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="power">power</label>
 <input type="text" id="power" name="power" className="form-control" onChange={this.change} value={this.state.power} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="aboutbrand">About Brand </label>
         <textarea  id="aboutbrand" className="form-control" onChange={this.change} name="aboutbrand" value={this.state.aboutbrand} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        <small className="text-muted" style={{size:"10px"}}>You can save this to be used while uploading other products of same brand</small>
                        </div>
                        </div>
                     </div>
                 </form>
                </div>
            </div>
         );
    }
}
 const mapStateToProps=(store)=>{
     return{
         allcategory:store.allcategories,
         secondsubcat:store.subcat2,
         thirdsubcat:store.subcat3
     }
 }
 const mapDispatchToProps =(dispatch)=>{
     return{
        allcategories: ()=>dispatch(allcategories()),
        subcat2:(data)=>dispatch(subcat2(data)),
        subcat3:(data)=>dispatch(subcat3(data))
     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(ProductUpload);