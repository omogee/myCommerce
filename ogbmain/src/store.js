import {createStore, applyMiddleware, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState ={
    products: [],
    searchedproducts:[],
    searchedbrands:[],
    searchedcolours:[],
    searchedsizes:[],
    searching:"",
    status:'Not yet loaded',
    brands: [],
    colours: [],
    sizes: [],
    price : 0,
    subcats:[],
    subcategories:[],
    filteredSuggestions:[],
    suggestions:[],
    showSuggestions: false,
    inputval:"",
    cartMessage:"",
    display:"none",
    loading: false,
    allcategories:[],
    allsubcategories:[],
    mainbgcolor:"white",
    modalsidenavbarwidth:"0%",
    modalsidenavbardisplay:"none",
    modalsidenavbarwidthmargin:"0%",
    save:"",
    productDetails:[],
    similiarDetails:[],
    similiarBrandDetails:[],
    appDisplay:""
}
const reducer= (state = initialState, action)=>{
    if(action.type === 'loading'){
      state = {...state , loading:true}
      return state;
    }
    else if(action.type === 'loaded'){
        state = {...state , loading: false, products: action.payloadOne,currentPage:action.payloadThree,totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        console.log("no need for filter", action.payloadOne)
        return state;
      }
      else if(action.type==='setLoadingtoTrue'){
        state ={...state, loading: true}
        return state;
      }
      else if(action.type === 'filteritems'){
        state = {...state , status: 'filtering', products: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        console.log("filter",action.payload)
        return state;
      }
      else if(action.type === 'searched'){
        state = {...state , status: 'searched', test: action.payload}
        return state;
      }
      else if(action.type === 'searching'){
        state = {...state , status: 'searching', searchedproducts: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        console.log("this is state",action.payloadFour)
        return state;
      }
      else if(action.type === 'submitsearched'){
        state = {...state , status: 'submitsearched', test: action.payload}
        return state;
      }
      else if(action.type === 'submitsearching'){
        state = {...state , status: 'submitsearching', searchedproducts: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        return state;
      }
      else if(action.type === 'brandloaded'){
        state = {...state , status: 'brandloaded', brands: action.payload}
        console.log(action.payload)
        return state;
      }
      else if(action.type === 'categoryloaded'){
        state = {...state , status: 'categoryloaded', subcategories: action.payload}
        return state;
      }
      else if(action.type === 'colorloaded'){
        state = {...state , status: 'colorloaded', colours: action.payload}
        return state;
      }
      else if(action.type === 'priceloaded'){
        state = {...state , status: 'priceloaded', price: action.payload}
        return state;
      }
      else if(action.type === 'sizeloaded'){
        state = {...state , status: 'sizeloaded', sizes: action.payload}
        return state;
      }
      else if(action.type === 'brandsearched'){
        state = {...state , status: 'brandloaded', searchedbrands: action.payload}
        return state;
      }
      else if(action.type === 'colorsearched'){
        state = {...state , status: 'colorloaded', searchedcolours: action.payload}
        return state;
      }
      else if(action.type === 'sizesearched'){
        state = {...state , status: 'sizeloaded', searchedsizes: action.payload}
        return state;
      }
      else if(action.type === 'submitbrandsearched'){
        state = {...state , status: 'brandloaded', searchedbrands: action.payload}
        return state;
      }
      else if(action.type === 'submitcolorsearched'){
        state = {...state , status: 'colorloaded', searchedcolours: action.payload}
        return state;
      }
      else if(action.type === 'submitsizesearched'){
        state = {...state , status: 'sizeloaded', searchedsizes: action.payload}
        return state;
      }
      else if(action.type === 'addedtocart'){
        state = {...state, status:'addedtocart', cartMessage : action.payloadOne, display:action.payloadTwo}
        return state;
      }
      else if(action.type === 'undisplaymodal'){
        state ={...state, status:'undisplaymodal', display:action.payload}
      }
      else if(action.type === 'allcategories'){
        state = {...state, status:'allcategories',loading:false, allcategories : action.payload}
        return state;
      }
      else if(action.type === 'allsubcategories'){
        state = {...state, status:'allsubcategories', loading:false, allcategories: action.payload}
        return state;
      }
      else if(action.type === 'showmodalsidenavbar'){
        state = {...state, status:'showmodalsidenavbar', mainbgcolor: "rgba(242,242,242,0.7)",modalsidenavbarwidth:"95%",modalsidenavbarwidthmargin:"0%",modalsidenavbardisplay:"block"}
        return state;
      }
      else if(action.type === 'unshowmodalsidenavbar'){
        state = {...state, status:'unshowmodalsidenavbar',mainbgcolor: "white",modalsidenavbarwidth:"0%", modalsidenavbarwidthmargin:"0%",modalsidenavbardisplay:"none"}
        return state;
      }
      else if(action.type === 'checkifsaved'){
        state = {...state, status:'checkingifsaved',save:action.payload}
        return state;
      }
      else if(action.type === 'detailsloaded'){
        state = {...state, status:'detailsloaded',productDetails:action.payload,loading:false}
        return state;
      }
      else if(action.type === 'similiarproducts'){
        state = {...state, status:'similiarproductsloaded',similiarDetails:action.payload}
        return state;
      }
      else if(action.type === 'similiarproductsbybrand'){   
        state = {...state, status:'similiarbrandsloaded', similiarBrandDetails: action.payload}
        return state;
      }
      else if(action.type === 'undisplayApp'){   
        state = {...state, status:'undisplayApp', appDisplay: "none"}
        return state;
      }
      else if(action.type === 'suggestionloaded'){
        const suggestions = action.payload;
         
        var filteredSuggestions =[];
       const inputval = action.input;
        for(var i=0; i<suggestions.length; i++){
          if(suggestions[i].details.toLowerCase().indexOf(inputval.toLowerCase()) > -1){
                 const maindetails = suggestions[i].details;
                 const searchimg = suggestions[i].mainimg;
                 const mainbrand = suggestions[i].brand;
                 const mainsubcat1 = suggestions[i].subcat1;
                 const mainsubcat2 = suggestions[i].subcat2;
                 const mainsubcat3 = suggestions[i].subcat3;
  
                 filteredSuggestions.push({maindetails,searchimg,mainbrand,mainsubcat1,mainsubcat2,mainsubcat3 })
          }
      }
      
      state = {...state , status: 'suggestionloaded', suggestions: action.payload,inputval, filteredSuggestions, showSuggestions: true}
      return state;
    }
    return state;
}
const store = createStore(reducer, applyMiddleware(thunk))

export const test =()=>{ 
  return(
    {type: 'testing', 
     payload: 'i am just testing'}
  )
}
export const setLoadingtoTrue =()=>{
  return (dispatch)=>{
     dispatch ({type:"setLoadingtoTrue"})
  }
}
export const setAppDisplay=()=>{
  return(
    {type:"undisplayApp"}
  )
}
export const searcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'searched'})
  axios.post('http://fruget.herokuapp.com/search/search',{data: JSON.stringify(data)})
  .then(res => dispatch({type:'searching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'brandsearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchbrand`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'brandsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'colorsearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchcolour`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'colorsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'sizesearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchsize`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'sizesearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

  }
}
export const getdetails =(data)=>{
 return(dispatch)=>{
   dispatch({type:"loading"})
  axios.get(`http://fruget.herokuapp.com/customer/check/save?details=${data}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
  .then(res =>  dispatch({type:"checkifsaved",payload:res.data}))
  .catch(err => dispatch({type:"err",payload:err})) 

  axios.get(`http://fruget.herokuapp.com/details/product/${data}`)
  .then(res => dispatch({type:"detailsloaded",payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))  

  axios.get(`http://fruget.herokuapp.com/details/similiar/${data}`)
  .then(res => dispatch({type:"similiarproducts",payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))  

  axios.get(`http://fruget.herokuapp.com/details/similiarbrand/${data}`)
  .then(res => dispatch({type:"similiarproductsbybrand",payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))  
  

 }
}
export const submitsearcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'submitsearched'})
  axios.get(`http://fruget.herokuapp.com/search/items/search?search=${data.search}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}&page=${data.page}`)
  .then(res => dispatch({type:'submitsearching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'submitbrandsearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchbrand?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand !== undefined ?data.brand : null}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitbrandsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'submitcolorsearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchcolour?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitcolorsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'sizesearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchsize?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitsizesearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  }
}
export const checkfilter = data =>{
  return (dispatch) =>{
  dispatch({type: "filter"})
  axios.get(`http://fruget.herokuapp.com/products/items/filter/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res => dispatch({type:"filteritems", payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,input:data.files}))
  .catch(err => console.log(err))
  }
}

export const getfilteredSuggestions = data =>{
  return (dispatch) =>{
  dispatch({type: "suggestions"})
  axios.get("http://fruget.herokuapp.com/suggestions/suggestion")
  .then(res => dispatch({type:"suggestionloaded", payload:res.data, input:data}))
  .catch(err => console.log(err))
  }
}
 export const getProducts = data =>{
   return (dispatch)=>{
      dispatch({type: 'loading'})
    axios.get(`http://fruget.herokuapp.com/products/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
    .then(res => dispatch({type: 'loaded', payloadOne: res.data.file,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
    .catch(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'categoryloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data.category}/category?page=${data.page}`)
   .then(res=> dispatch({type: 'categoryloaded', payload: res.data}))
   .catch(err => dispatch({type: 'error', payload: err}))

  }
}
export const addtocart = data =>{
  return (dispatch) =>{
    dispatch({type:"addingtocart"})
    axios.get(`http://fruget.herokuapp.com/customer/add-to-cart?id=${data}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
    .then(res =>{
      if(res.data.success){
        dispatch ({type:"addedtocart",payloadOne:res.data.message,payloadTwo:"block"})
      }else{
        window.location.assign("/customer/login")
      }
    })
    .catch(err => dispatch({type: 'addingtocarterror', payload: err}))
    
  }
}
export const undisplaymodal =()=>{
  return (dispatch)=>{
     dispatch({type: "undisplaymodal", payload:"none"})
  }
}
export const allcategories = ()=>{
  return(dispatch)=>{
     dispatch({type:"loading"})
    axios.get("http://fruget.herokuapp.com/products/products/allcategories")
    .then(res => dispatch({type:"allcategories", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const allsubcategories = (data)=>{
  return(dispatch)=>{
     dispatch({type:"loading"})
    axios.get(`http://fruget.herokuapp.com/products/${data}/category`)
    .then(res => dispatch({type:"allsubcategories", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const showmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"showmodalsidenavbar"})
  }
}
export const unshowmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"unshowmodalsidenavbar"})
  }
}
export const getsidenav = data =>{
  return (dispatch)=>{
   dispatch({type: 'brandloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/brand`)
   .then(res=> dispatch({type: 'brandloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'colorloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/color`)
   .then(res=> dispatch({type: 'colorloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'sizeloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/size`)
   .then(res=> dispatch({type: 'sizeloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))
  
   dispatch({type: 'priceloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/price`)
   .then(res=> dispatch({type: 'priceloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

 }
}
// store.dispatch(getProducts)
export default store;