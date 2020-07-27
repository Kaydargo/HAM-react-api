import React        from 'react';
import Loading      from '../Loading/Loading';
import Error        from '../GenericError/GenericError';

import                 './Floor.sass';
import ArtTitle     from '../ArtTitle/ArtTitle';
import ListGroup    from 'react-bootstrap/ListGroup';
import BackButton   from '../BackButton/BackButton';
import {Link}       from '@reach/router';
import {Transition} from '../Transitions/Transitions';  

export default class Floor extends React.Component{
    
    constructor() {
        super();
        this.state = {
            floor      : [],
            error      : false,
            processing : false
        }
    }
    
    render(){
        if (this.state.error){
            return(<Error/>);
        }

        if(this.state.processing || this.state.floor.length == 0 ){
            return(<Loading/>);
        }

        if(!this.state.floor){
            return(<Error message='Sorry, floor art not found'/>);
        }

        return(
            <Transition>
                    <ArtTitle>
                            <h1>{this.state.floor.name}</h1>
                            <h2>{this.state.floor.theme}</h2>
                    </ArtTitle>
                    <main>
                    <div>
                    <p>{this.state.floor.labeltext}</p>
                    {console.log(this.state.floor.contain)}
                    {this.state.floor.contains? (
                    <div>
                        <h2>View Art Galleries</h2>
                        {this.state.floor.contains.groups.map(each => (
                            <ListGroup variant="flush">
                                <Link className='list-group-item list-group-item-action' to={`/gallery/${each.groupid}`}>
                                    <ListGroup.Item eventKey={each.groupid}>
                                        <p>{each.name}</p>
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        ))}
                    </div> ) : ''}
                   
                    </div>
                    <BackButton to='/floors'>
                            Back to Floors
                    </BackButton>
                </main>
            </Transition>
        )
    }

    componentDidMount(){
        fetch(`http://localhost:3001/floor/${this.props.id}`, {credentials : 'include'})
        .then(res => res.json())
        .then(floor => this.setState({
            floor      : floor,
            processing : false
        }))
        .catch(() => this.setState({
            processing : false,
            error      : true
        }))
    }
}