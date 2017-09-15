import createAccount from './createAccount.js';
import { browserHistory } from 'react-router';

export default function getToSystem(user) {
    return dispatch => {   
        
                        fetch('http://localhost:3000/login', {
                            method: 'post', 
                            headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                             },
                             body: JSON.stringify(user)
                        })
                        .then( (response)=> {
                            response.json()
                            .then(data => {
                                if(data.Auth == 'Denied'){
                                    document.querySelector('.login').style.border = '2px solid #F67A7D';
                                    console.log('Incorrect user!');
                                }
                                if(data.Auth == 'Logged'){
                                    dispatch(createAccount(user)); 
                                    localStorage.setItem('user', JSON.stringify(user));
                                   
                                    browserHistory.push('/authentification');
                                }


                            })
                        })
            
                    }        
    }

