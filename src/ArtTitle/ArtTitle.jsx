import React      from 'react';
import                 './ArtTitle.sass';
import Jumbotron  from 'react-bootstrap/Jumbotron';

export default class ArtTitle extends React.Component {

  render() {
    return (
        <Jumbotron fluid className='artTitle'>
            <div>
                {this.props.children}   
            </div>
        </Jumbotron>
    );
  }
}