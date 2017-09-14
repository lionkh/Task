import React, { Component } from 'react';
import './style.scss';
import { Form, FormControl, Button, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 
import getToSystem from '../../actions/getToSystem.js';
import Header from '../Header/Header.js';



class Authentification extends Component{
    constructor(props){
      super(props);
      this.state = {
        code: '',
        waiting: false
      };
      this.submit = this.submit.bind(this);
      this.handleCodeChange = this.handleCodeChange.bind(this);
      this.keySubmit = this.keySubmit.bind(this);
    }

    handleCodeChange(event){
      event.target.style.border = '1px solid #CCCCCC';
      this.setState({
        code: event.target.value.trim()
      });
    }

    componentWillMount(){
      this.props.login(JSON.parse(localStorage.getItem('user')));
    }

    componentDidMount(){
      alert('Authentication code: '  + JSON.parse(localStorage.getItem('user')).code);
    }

    submit(){
      this.setState({
        waiting: true,
      });

     let user =  this.props.users.find((elem)=>{
        if(elem.login==JSON.parse(localStorage.getItem('user')).login)
          return elem;
      })  

      if(this.state.code == user.code){
        setTimeout(()=> {
          this.setState({
            waiting:false
          })
          browserHistory.push('/success');
        }, 1000);
      }
      else{
        setTimeout(()=> {
          this.setState({
            waiting:false
          });
          document.querySelector('.auth-field').style.border = '2px solid #F67A7D';
        }, 1000);
      }
    }

    keySubmit(e){
      if (e.keyCode == 13) {
        e.preventDefault();
        this.submit();
      }
    }

    render() {
    return (
      <div onKeyDown = {this.keySubmit}>
        <Header />
       <Form inline className = 'auth'>
        <FormControl autoFocus onChange = {this.handleCodeChange} placeholder = 'Enter two step auth code' className = 'auth-field'/>
      
      {this.state.waiting == false &&
        <Button onClick = {this.submit} className = 'submit'>Continue <Glyphicon glyph = 'arrow-right' className = 'arrow'/></Button>
      }
        
      { this.state.waiting && 
          <Button bsSize="large" className = 'waiting'>
              <Glyphicon className = 'cog' glyph = 'cog'/>
          </Button>
        }
        
       
       </Form>
      </div>
    );
  }}


export default connect(
  (state,ownProps)=>({
    users: state.users
  }),
  (dispatch)=>({
    login: (user)=>{
      dispatch(getToSystem(user));
    }
  })

)(Authentification);