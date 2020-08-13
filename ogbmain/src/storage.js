const logo = require("./images/kenwood-Blk-828.jpg")
const logo2 = require("./images/B-VS-1656-(3).jpg")
const logoStyle ={
    width:"50px",
    border:"2px solid grey"
}
<div className="col-2" style={{border:"1px solid lightgrey", backgroundColor:"white", padding:"7px"}}>
                    {this.state.category.map(subcat => 
                        <div key={subcat}>
<a href="" style={{color:"black"}}><p onMouseOver={this.display}  onMouseLeave={this.undisplay} style={{textTransform:"capitalize"}}>{subcat.generalcategory}</p></a><br/>
<a href="" style={{color:"black"}}><small onMouseOver={this.display}  onMouseLeave={this.undisplay} style={{textTransform:"capitalize"}}>clothes</small></a>
                        </div>
                        )} 
                </div>



<div class="subcatmodal row"  style={{display:`${this.state.subcatmodal}`, position:"absolute",border:"1px solid grey",zIndex:"3", width:"100%",height:"100%",backgroundColor:"white",left:"0px",top:"0px",right:"0px"}}>
                
                </div>

<div className="col-12" onMouseOver={this.display}  onMouseLeave={this.undisplay}>
<div className="row">
{this.state.modalities.length > 0 ? Object.keys(JSON.parse(this.state.modalities)).map(keys => 
 <div key={keys} className="col-3">  
         <small style={{textTransform:"uppercase",fontWeight:"bold"}}>{keys}</small><br/>
<a href="" style={{color:"black"}}><small>{Object.values(JSON.parse(this.state.modalities)[keys].map(keyss => 
         <div key={keyss}>
         <small>{keyss}</small><br/>
     </div>
))}</small></a> <br/>                              
  </div>      
 ) : null}
 </div>
  </div>   

export const electronics=
         `{"fan": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]},
         {"fun": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]},
         {"fin": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]},
         {"fon": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]},
         {"fhun": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]},
         {"fhan": ["standing fan", "ceiling fan" , "wall fan", "rechargeable" ,"industrial fan"]}`
export const clothes=
         `{"women wears":"night wears, heels , shoes, trekkers",
 "women bags":"leather, nylon, despacito",
 "women belts":"designers, leather, loose, waist pack",
"men shoes":"mirror, leather, rubber",
"men jeans":"crazy, matured, children",
"service wears":"dinning cover, dinning spillover, cooking aid",
"head wears":"caps, hats, head ties, etc",
"men wears": "shoes,clothes,bags"
}`

export default Storage;