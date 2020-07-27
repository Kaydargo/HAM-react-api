import React  from 'react';
import Button from 'react-bootstrap/Button';

export default class HamButton extends React.Component {

  render() {
    return (
        <Button variant="outline-danger" block size="lg" type="submit" className="btn mt-3 mb-3">
          {this.props.children}
        </Button>
    );
  }
}