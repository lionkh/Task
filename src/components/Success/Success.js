import React, { Component } from 'react';
import './style.scss';
/* const icon = require('../../LoginIcon.png');
const waiting = require('../../waiting.png');

import getToSystem from '../../actions/getToSystem.js';
import Header from '../Header/Header.js';
import { browserHistory } from 'react-router';
 */
import { Glyphicon } from 'react-bootstrap';


const Success = () => (
    <div className = 'success'>
    <Glyphicon  glyph = 'ok' className = 'ok'/>
    <h1>Successful logged</h1>
    </div>
  );

  export default Success;

  
  