import React      from 'react';
import Loading    from '../Loading/Loading';
import {navigate} from '@reach/router';

import Form       from 'react-bootstrap/Form';
import HamButton  from '../Button/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert      from 'react-bootstrap/Alert';

export default class AddArtwork extends React.Component {
    
    constructor(){
        super();
        this.state = {
            name           : '',
            description    : '',
            year           : '',
            classification : '',
            theme          : '',
            // image          : '',
            errorMsg       : '',
            processing     : false
            
        }
    }
    
    render(){
        if(this.setState.processing){
            return (<Loading />)
        }
        return (
           <main>
               <h1>Add Artwork</h1>
               {this.state.errorMsg? (
                  <Alert key='danger' variant='danger'>
                  {this.state.errorMsg}
                </Alert>
                ) : ''}

               <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Group  size="sm" className="mb-3">
                        <Form.Label>Artwork Name</Form.Label>
                        <InputGroup >
                        <Form.Control type="text" id='name' placeholder="Enter name of artwork" onChange={this.addName.bind(this)}/>
                        </InputGroup>
                    </Form.Group>                   

                    <Form.Group  size="sm" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <InputGroup >
                        <Form.Control type="text" id='description' placeholder="About the Art" onChange={this.addDescription.bind(this)}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group  size="sm" className="mb-3">
                        <Form.Label>Creation Year</Form.Label>
                        <InputGroup >  
                        <Form.Control type="number" id='year' min='0' max={new Date().getFullYear()} placeholder="About the Art" onChange={this.addYear.bind(this)}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group size="sm" className="mb-3">
                        <Form.Label>Classification</Form.Label>
                        <InputGroup >  
                        <Form.Control type="text" id='classification'  placeholder="Enter classification" onChange={this.addClassification.bind(this)}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group size="sm" className="mb-3">
                        <Form.Label>Theme</Form.Label>
                        <InputGroup >  
                        <Form.Control type="text" id='theme'  placeholder="Enter Theme" onChange={this.addTheme.bind(this)}/>
                        </InputGroup>
                    </Form.Group>

                    {/* <Form.File id="image" size="sm" className="mb-3">
                        <Form.File.Label>Art Image</Form.File.Label>
                        <Form.File.Input  onChange={this.addImage.bind(this)} />
                    </Form.File> */}

                    <HamButton>Add Artwork</HamButton>
                </Form>
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

    addName(event){
        this.setState({name : event.target.value});
    }

    addDescription(event){
        this.setState({description : event.target.value});
    }

    addYear(event){
        this.setState({year : event.target.value});
    }

    addClassification(event){
        this.setState({classification : event.target.value});
    }

    addTheme(event){
        this.setState({theme : event.target.value});
    }

    // addImage(event){
    //     this.setState({image : event.target.value});
    // }

    formSubmit(event){
        event.preventDefault();
        
        // console.log(JSON.stringify ({
        //     name           : this.state.name,
        //     description    : this.state.description,
        //     year           : this.state.year,
        //     classification : this.state.classification,
        //     // image          : this.state.image,
        //     theme          : this.state.theme,
            
        // }));


        this.setState({processing : true});

        fetch('http://localhost:3001/art/', {
            credentials : 'include',
            method      : 'POST',
            headers     : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify ({
                name           : this.state.name,
                description    : this.state.description,
                year           : this.state.year,
                classification : this.state.classification,
                // image          : this.state.image,
                theme          : this.state.theme,
                
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success(200)){
                navigate('/profile');
            }
            else{
                this.setState({
                    errorMsg   : 'Unable to add artwork, try again',
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