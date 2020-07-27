import React from 'react';
import Container  from 'react-bootstrap/Container';
import Card       from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup'

export default class Form extends React.Component {
    render(){
        return (
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
        );
    }
}