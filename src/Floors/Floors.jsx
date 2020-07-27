import React        from  'react';
import Loading      from  '../Loading/Loading';
import Error        from  '../GenericError/GenericError';
import {Transition} from '../Transitions/Transitions';
// import View       from '../View/View;

import {Link}       from  '@reach/router';
import Container    from  'react-bootstrap/Container';
import Card         from  'react-bootstrap/Card';
import ListGroup    from  'react-bootstrap/ListGroup';
import                  './Floors.sass';

import floor1        from '../Images/Floor1.PNG'; 
import floor2        from '../Images/Floor2.PNG'; 
import floor3        from '../Images/Floor3.PNG'; 



export default class Floors extends React.Component{
    constructor() {
        super();
        this.state = {
            floor1 : [],
            floor2 : [],
            floor3 : [],
            error : false
        }
    }

    render(){
        if(this.state.error){
            return (<Error />);
        }

        if(!this.state.floor1 || !this.state.floor2 || !this.state.floor3){
            return (<Loading />)
        }

        if(this.state.floor1.length === 0 || this.state.floor2.length === 0 || this.state.floor3.length === 0){
            return(<Error title='No Floor Information' message='No floor information is available'/>)
        }

        return(
            <Transition>
            <main>
                <Container>
                    <Card className='bg-light'>
                        <Card.Title><h2>Floor 1</h2></Card.Title>
                        <Card.Img variant="top" src={floor1} />
                            <Card.Body>
                                <Card.Text>
                                    <ListGroup variant="flush">
                                        {this.state.floor1.sort().map(each =>
                                            <Link className='list-group-item list-group-item-action' to={`/floor/${each.id}`}><ListGroup.Item eventKey={each.id}>{each.name}</ListGroup.Item></Link>
                                        )}
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                    <Card className='bg-light'>
                        <Card.Title><h2>Floor 2</h2></Card.Title>
                        <Card.Img variant="top" src={floor2} />
                            <Card.Body>
                                <Card.Text>
                                    <ListGroup variant="flush">
                                        {this.state.floor2.sort().map(each =>
                                            <Link className='list-group-item list-group-item-action' to={`/floor/${each.id}`}><ListGroup.Item eventKey={each.id}>{each.name}</ListGroup.Item></Link>
                                        )}
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                    <Card className='bg-light'>
                        <Card.Title><h2>Floor 3</h2></Card.Title>
                        <Card.Img variant="top" src={floor3} />
                            <Card.Body>
                                <Card.Text>
                                    <ListGroup variant="flush">
                                        {this.state.floor3.sort().map(each =>
                                            <Link className='list-group-item list-group-item-action' to={`/floor/${each.id}`}><ListGroup.Item eventKey={each.id}>{each.name}</ListGroup.Item></Link>
                                        )}
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                 
                </Container>
            </main>
            </Transition>
        )
    }

    componentDidMount(){

        Promise.all([
            fetch('http://localhost:3001/floor/floor1', {credentials: 'include'}), 
            fetch('http://localhost:3001/floor/floor2', {credentials: 'include'}),
            fetch('http://localhost:3001/floor/floor3', {credentials: 'include'})
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([info1, info2, info3]) => this.setState({
            floor1 : info1, 
            floor2 : info2,
            floor3 : info3
        }))
        .catch(() => this.setState({error : true}));
    }
}