import React      from 'react';
import Loading    from '../Loading/Loading';
import {navigate} from '@reach/router';
import {Link}     from '@reach/router';

import hamButton     from '../Button/Button';
import Alert      from 'react-bootstrap/Alert';



export default class Profile extends React.Component {
    
    constructor(){
        super();
        this.state = {
            processing : false,
            errorMsg   : '',
            username   : '',
            password   : ''
        }
    }
    
    render(){
        if(this.setState.processing){
            return (<Loading />)
        }
        return (
           <main>
               <h1>Welcome, </h1>
               {this.state.errorMsg? (
                  <Alert key='danger' variant='danger'>
                  {this.state.errorMsg}
                </Alert>
                ) : ''}

                <Link to='/addArt'>
                    <hamButton>
                        Add Artwork
                    </hamButton>
                </Link>

                <Link to='/addArt'>
                    <hamButton>
                        View Added Art
                    </hamButton>
                </Link>

                <Link to='/editProfile'>
                    <hamButton>
                        Edit Profile
                    </hamButton>
                </Link>

                <hamButton onClick={this.logoutUser}>
                        Logout
                </hamButton>
           </main>
        )
    }

    componentDidMount(){
        //check if user is logged in
        this.setState({processing : true});
        fetch('http://localhost:3001/user/profile', {credentials : 'include'})
        .then(res => {
            if(res.status === 401){
                navigate('/login');
            }
            else{
                //render form rather than loading
                this.setState({processing : false});
            }
        })
    }

    logoutUser(){
        fetch('http://localhost:3001/user/logout', {credentials : 'include'})
        .then(res => res.json())
    }
}