import React from 'react';
import './GenericError.sass';

export default class GenericError extends React.Component {

  render() {
    return <div className='GenericErrorComponent'>
      <h1>{this.props.title || 'Oops!'}</h1>
      <p>{this.props.message || 'Sorry, something went wrong'}</p>
    </div>
  }

}