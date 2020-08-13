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
    inputval:""
}
const reducer= (state = initialState, action)=>{
    if(action.type === 'loading'){
      state = {...state , status: 'loading'}
      return state;
    }
    else if(action.type === 'loaded'){
        state = {...state , status: 'loaded', products: action.payloadOne,currentPage:action.payloadThree,totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        console.log("no need for filter")
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
export const searcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'searched'})
  axios.post('http://localhost:5000/search',{data: JSON.stringify(data)})
  .then(res => dispatch({type:'searching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'brandsearching'})
    axios.post(`http://localhost:5000/searchbrand`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'brandsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'colorsearching'})
    axios.post(`http://localhost:5000/searchcolour`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'colorsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'sizesearching'})
    axios.post(`http://localhost:5000/searchsize`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'sizesearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

  }
}

export const submitsearcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'submitsearched'})
  axios.get(`http://localhost:5000/items/search?search=${data.search}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}&page=${data.page}`)
  .then(res => dispatch({type:'submitsearching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'submitbrandsearching'})
  axios.get(`http://localhost:5000/items/searchbrand?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand !== undefined ?data.brand : null}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitbrandsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'submitcolorsearching'})
  axios.get(`http://localhost:5000/items/searchcolour?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitcolorsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'sizesearching'})
  axios.get(`http://localhost:5000/items/searchsize?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitsizesearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  }
}
export const checkfilter = data =>{
  return (dispatch) =>{
  dispatch({type: "filter"})
  axios.get(`http://localhost:5000/items/filter/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res => dispatch({type:"filteritems", payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,input:data.files}))
  .catch(err => console.log(err))
  }
}

export const getfilteredSuggestions = data =>{
  return (dispatch) =>{
  dispatch({type: "suggestions"})
  axios.get("http://localhost:5000/suggestions/suggestion")
  .then(res => dispatch({type:"suggestionloaded", payload:res.data, input:data}))
  .catch(err => console.log(err))
  }
}
 export const getProducts = data =>{
   return (dispatch)=>{
      dispatch({type: 'loading'})
    axios.get(`http://localhost:5000/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
    .then(res => dispatch({type: 'loaded', payloadOne: res.data.file,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
    .catch(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'categoryloading'})
   axios.get(`http://localhost:5000/${data.category}/category?page=${data.page}`)
   .then(res=> dispatch({type: 'categoryloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

  }
}
export const getsidenav = data =>{
  return (dispatch)=>{
 
   dispatch({type: 'brandloading'})
   axios.get(`http://localhost:5000/${data}/brand`)
   .then(res=> dispatch({type: 'brandloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'colorloading'})
   axios.get(`http://localhost:5000/${data}/color`)
   .then(res=> dispatch({type: 'colorloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'sizeloading'})
   axios.get(`http://localhost:5000/${data}/size`)
   .then(res=> dispatch({type: 'sizeloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))
  
   dispatch({type: 'priceloading'})
   axios.get(`http://localhost:5000/${data}/price`)
   .then(res=> dispatch({type: 'priceloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

 }
}
   
 store.dispatch(getProducts)

export default store;