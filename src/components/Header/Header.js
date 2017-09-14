import React, { Component } from 'react';
import './style.scss';
const icon = require('../../img/LoginIcon.png');


 const Header = ()=> {
    return(
    <div className="head">
        <img src={icon} alt="icon"/>
       <h2>Login</h2>
    </div>
    );
}

export default Header;


