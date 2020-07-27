import React from 'react';
import './Loading.sass';

export default class Loading extends React.Component {
  render(){
    return (
      <div className='LoadingComponent'>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}