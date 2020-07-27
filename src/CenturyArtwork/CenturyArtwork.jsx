import React        from 'react';
import Loading      from '../Loading/Loading';
import Error        from '../GenericError/GenericError';


import {Transition} from '../Transitions/Transitions';  
import ArtTitle     from '../ArtTitle/ArtTitle';
import Image        from 'react-bootstrap/Image'
import BackButton   from '../BackButton/BackButton';

export default class CenturyArtwork extends React.Component {
    
    constructor(){
        super();
        this.state = {
            art        : [],
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
        
        if(this.state.art.length === 0){
            return (<Error title='No Artwork' message='Sorry, there is no artwork to display' />)
        }

        return (
        <Transition>
            <main>
                {console.log(this.state.art)}
                <div className='artImage'>
                    {<Image fluid 
                    src={this.state.art.images[0].baseimageurl}
                    /> }
                </div>
                <ArtTitle>
                            <h1>{this.state.art.title}</h1><hr></hr>
                            <h2>Date: {this.state.art.dated}</h2>
                </ArtTitle>
                <div>
                        <p>{this.state.art.contextualtext[0].text}</p>
                </div>
                {/* <Image src={this.state.art.p} */}
            {/* {this.state.art.map(each => (
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
                      ))} */}
                      
                <BackButton to='/gallery/'>
                    Back to Gallery
                </BackButton>
            </main>
        </Transition>
        )
    }

    componentDidMount(){
        fetch(`http://localhost:3001/art/${this.props.id}`)
        .then(res => res.json())
        .then(art => this.setState({
            art        : art,
            processing : false
        }))
        .catch(() => this.setState({
            processing : false,
            error      : true
        }))
    }
}