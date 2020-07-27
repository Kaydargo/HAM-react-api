import React  from 'react';
import {Link} from '@reach/router';
import Button from 'react-bootstrap/Button';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export default class BackButton extends React.Component {

  render() {
    return (
        <Link to={this.props.to} className='btn btn-danger mt-3 mb-3'>
        <FontAwesomeIcon icon={faArrowLeft} size='xs' />
            {this.props.children}
        </Link>
    );
  }
}