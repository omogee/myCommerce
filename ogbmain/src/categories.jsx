import React, { Component } from 'react';
import "./fontawesome"
import Navbar from './navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 import App from './App'
import Details from './details'
// import SideNav from './sidenav'
import Autocomplete from './components/Autocomplete';
import store from './store'
import {Provider} from 'react-redux'
import queryString from 'query-string'
import Suggestions from "./suggestions"
import Sidenavbar from "./sidenavbar"
import {CookiesProvider} from 'react-cookie'
import Subcats from './subcats';
import axios from 'axios';
import SearchApp from "./searchapp"
import Register from "./register"
import Login from "./login"

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sub: []
         }
    }
    componentDidMount =()=>{
      
    }
    
    render() { 
        return (
            <CookiesProvider>
            <div>
                <Router>
                 <Provider store={store}>
                 <Navbar />
                 <Route path='/' exact component={Subcats} />
                 
                 <Switch> 
                     <Route path="bla" exact component={Sidenavbar} />
                     <Route path='/customer/register' exact component={Register}/>
                     <Route path='/customer/login' exact component={Login}/>
                 <Route path='/product/:details' exact   component={Details} />  
                 <Route path='/category/:category' exact   component={App} />
                 <Route path='/search' exact   component={SearchApp} />                                       
                 </Switch>          
                 
                
                
                     </Provider>
                </Router>
            </div>
            </CookiesProvider>
         );
    }
}

export default Category;