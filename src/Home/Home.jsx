import React        from 'react';
import                 './Home.sass';

import {Link}       from '@reach/router';
import Jumbotron    from 'react-bootstrap/Jumbotron';
import Container    from 'react-bootstrap/Container';
import Card         from 'react-bootstrap/Card';

import floor        from '../Images/Floor1.PNG'; 
// import exhibition   from '../Images/exhibition.jfif';
import timeline     from '../Images/timeline.png';
import {Transition} from '../Transitions/Transitions';  

export default class Home extends React.Component{
    render(){
        return (
            <Transition>
            <div>

                <Jumbotron id='desktop-only' fluid>
                    <Container>
                        <h1>Explore Art</h1>
                        <h3>Discover the Harvard Art Museum your way!</h3>
                    </Container>
                </Jumbotron>
                <main>
                <div>
                    <p>Discover the world and art of the Harvard Art Museum from the comfort of your own home.</p>
                </div>
                <Link to='/floors'><Card className='bg-light'>
                    <Card.Img variant="top" src={floor} />
                        <Card.Body>
                        <h2><span>Discover:</span> Floor</h2>
                            <Card.Text>
                                View artwork by exploring the gallery by floor.
                            </Card.Text>
                        </Card.Body>
                </Card>
                </Link>
                {/* <Card className='bg-light'>
                    <Card.Img variant="top" src={exhibition} />
                        <Card.Body>
                            <h2><span>Discover:</span> Exhibition</h2>
                            <Card.Text>
                                Past, present and future exhibition at HAM.
                            </Card.Text>
                        </Card.Body>
                </Card> */}
                <Card className='bg-light'>
                    <Card.Img variant="top" src={timeline} />
                        <Card.Body>
                        <h2><span>Discover:</span> Century</h2>
                            <Card.Text>
                                Search through the art at HAM by century.
                            </Card.Text>
                        </Card.Body>
                </Card>
            </main>
            </div>
            </Transition>
        );
    }
}