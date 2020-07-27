import React        from 'react';
import {Link}       from '@reach/router';
import ListGroup    from 'react-bootstrap/ListGroup';

import Loading      from '../Loading/Loading';
import Error        from '../GenericError/GenericError';
import BackButton   from '../BackButton/BackButton';
import {Transition} from '../Transitions/Transitions';
import ArtTitle     from '../ArtTitle/ArtTitle';   

export default class CenturyInfo extends React.Component {
    
    constructor(){
        super();
        this.state = {
            centuryInfo : [],
            processing  : false,
            error       : false 
        }
    }
    
    render(){
        if (this.state.error){
            return (<Error />)
        }

        if(this.state.processing){
            return (<Loading />)
        }
        
        if(this.state.centuryInfo.length === 0){
            return (<Error title='No Artwork' message='Sorry, there is no artwork to display' />)
        }

        return (
            <Transition>
                    <ArtTitle>
                            <h1>{this.state.centuryInfo.name}</h1>
                    </ArtTitle>
                    <main>
                    <div>
                    <div>
                        <h2>View Galleries</h2>
                        {this.state.centuryInfo.contains.groups.map(each => (
                            <ListGroup variant="flush">
                                <Link className='list-group-item list-group-item-action' to={`/gallery/${each.groupid}`}>
                                    <ListGroup.Item eventKey={each.groupid}>
                                        <p>{each.name}</p>
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        ))}
                    </div> 
                   
                    </div>
                    <BackButton to='/timeline'>
                            Back to Century
                    </BackButton>
                </main>
            </Transition>
        )
    }

    componentDidMount(){
        fetch(`http://localhost:3001/century/${this.props.id}`)
        .then(res => res.json())
        .then(centuryInfo => this.setState({
            centuryInfo : centuryInfo,
            processing  : false
        }))
        .catch(() => this.setState({
            processing : false,
            error      : true
        }))
    }
}