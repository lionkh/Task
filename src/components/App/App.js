import React, { Component } from 'react';
import '../../styles.scss';
import LoginForm from '../LoginForm/LoginForm.js';
import Authentification from '../Authentification/Authentification.js'
import Success from '../Success/Success.js'
import {Router, Route, browserHistory} from 'react-router';



export default class App extends Component{
    render() {
    return (
      <div>
      <Router history={browserHistory}>
      <div>
       <Route exact path = '/' component = {LoginForm} />
       <Route exact path = '/authentification' component = {Authentification} />
       <Route exact path = '/success' component = {Success} />
       </div>
      </Router>
      </div>

    );
  }
}