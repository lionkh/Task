import React, { Component } from 'react';
import './style.scss';
import { Form, FormControl, Button, Label, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import getToSystem from '../../actions/getToSystem.js';
import Header from '../Header/Header.js';
import { browserHistory } from 'react-router';

class LoginForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        login: '',
        password: '',
        waiting: false
      };
      this.login = this.login.bind(this);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.keyLog = this.keyLog.bind(this);
    }

    handleLoginChange(event){
      event.target.style.border = '1px solid #CCCCCC';
      this.setState({
        login: event.target.value.trim()
      });
    }


    handlePasswordChange(event){
      document.querySelector('.login').style.border = '1px solid #CCCCCC';
      this.setState({
        password: event.target.value.trim()
      });
    }

    keyLog(e){
      if (e.keyCode == 13) {
        e.preventDefault();
        this.login();
      }
    }

    login(){
      this.setState({
        waiting: true,
      });

      let user = {
        login: this.state.login,
        password: this.state.password,
        code: parseInt(Math.random() * (9999 - 1000) + 1000)
      };

      setTimeout(()=> {
        this.setState({
          waiting:false
        })
        this.props.login(user);
      }, 1000);
  
    }

    render() {
    return (
      <div onKeyDown = {this.keyLog} >
       <Header />
       <Form inline className = 'enter'>
        <FormControl autoFocus onChange = {this.handleLoginChange} placeholder = 'Login' className = 'login'/>
        <FormControl onChange = {this.handlePasswordChange} placeholder = 'Password' type = 'password' className = 'password'/>
        {this.state.waiting == false && 
          <Button  onClick = {this.login} className = 'submit'>Login<Glyphicon glyph = 'arrow-right' className = 'arrow'/></Button>
        }
        {
          this.state.waiting && 
          <Button bsSize="large" className = 'waiting'>
              <Glyphicon className = 'cog' glyph = 'cog'/>
          </Button>
        }
       </Form>
      </div>
    );

  }}


export default connect(
  (state, ownProps)=>({
    users: state.users
  }),
  (dispatch)=>({
    login: (user)=>{
      dispatch(getToSystem(user));
    }
  })

)(LoginForm);