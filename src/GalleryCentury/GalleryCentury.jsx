import React        from 'react';
import {Link}       from '@reach/router';
import Figure       from 'react-bootstrap/Figure';

import Loading      from '../Loading/Loading';
import Error        from '../GenericError/GenericError';
import BackButton   from '../BackButton/BackButton';
import {Transition} from '../Transitions/Transitions';  

export default class GalleryCentury extends React.Component {
    
    constructor(){
        super();
        this.state = {
            gallery   : [],
            processing : false,
            error      : false 
        }
    }
    
    render(){
        if (this.state.error){
            return (<Error />)
        }

        if(this.state.processing){
            return (<Loading />)
        }
        
        if(this.state.gallery.length === 0){
            return (<Error title='No Artwork' message='Sorry, there is no artwork to display' />)
        }

        return (
            <Transition>
            <main>
            {/* {console.log(this.state.artworks[0])}
            <p>{this.state.artworks.image}</p>
            <Image src={this.state.artworks.image} fluid /> */}
            {this.state.gallery.map(each => (
                        <Link className='list-group-item list-group-item-action' to={`/artwork/${each.id}`}>
                        <Figure>
                            <Figure.Image
                            src={each.image}
                            />
                            <Figure.Caption>
                            {each.title}
                            </Figure.Caption>                            
                        </Figure>
                        </Link>
                      ))}
            <BackButton to='/gallery/'>
                Back to Gallery
            </BackButton>
            </main>
        </Transition>
        )
    }

    componentDidMount(){
        fetch(`http://localhost:3001/century/gallery/${this.props.id}`)
        .then(res => res.json())
        .then(gallery => this.setState({
            gallery   : gallery,
            processing : false
        }))
        .catch(() => this.setState({
            processing : false,
            error      : true
        }))
    }
}