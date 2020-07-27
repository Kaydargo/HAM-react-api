import React               from 'react';
import Loading             from '../Loading/Loading';
import {Link}              from '@reach/router';
import {navigate}          from '@reach/router';
import {Transition}        from '../Transitions/Transitions';
// import View    from '';

import Form                from 'react-bootstrap/Form';
import HamButton           from '../Button/Button';
import InputGroup          from 'react-bootstrap/InputGroup';
import Alert               from 'react-bootstrap/Alert';

import {FontAwesomeIcon}   from '@fortawesome/react-fontawesome';

import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';

export default class Login extends React.Component {
    
    constructor(){
        super();
        this.state = {
            username   : '',
            password   : '',
            processing : false,
            errorMsg   : ''
        }
    }
    
    render(){
        if(this.setState.processing){
            return (<Loading />)
        }
        return (
        <Transition>
           <main>
               <h1>Log In</h1>
               {this.state.errorMsg? (
                  <Alert key='danger' variant='danger'>
                  {this.state.errorMsg}
                </Alert>
                ) : ''}

               <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Group size="sm" className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faEnvelope} size='xs' />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" id='username' placeholder="Enter email" value={this.state.username} onChange={this.usernameChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>                   

                    <Form.Group size="sm" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup >
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} size='xs' />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                        <Form.Control type="password" id='password' placeholder="Password" onChange={this.passChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>
                    <HamButton>
                        Log in
                    </HamButton>
                </Form>

                <Link to='/register'><p>Don't have an account? Register</p></Link>
           </main>
        </Transition>
        )
    }

    componentDidMount(){
        //check if user is logged in
        this.setState({processing : true});
        fetch('http://localhost:3001/user/profile', {credentials : 'include'})
        .then(res => {
            if(res.status !== 401){
                navigate('/');
            }
            else{
                //render form rather than loading
                this.setState({processing : false});
            }
        })
    }

    usernameChange(event){
        this.setState({username : event.target.value});
    }

    passChange(event){
        this.setState({password : event.target.value});
    }

    formSubmit(event){
        event.preventDefault();
        
        this.setState({processing : true});

        fetch('http://localhost:3001/user/login', {
            credentials : 'include',
            method      : 'POST',
            headers     : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify ({
                username : this.state.username,
                password : this.state.password
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                navigate('/profile');
            }
            else{
                this.setState({
                    errorMsg   : 'Invalid username or password',
                    processing : false
                });
            }
        })
        .catch(() => {
            this.setState({
                errorMsg     : 'Unknown error occurred',
                processing : false
            });
        });
    }
}