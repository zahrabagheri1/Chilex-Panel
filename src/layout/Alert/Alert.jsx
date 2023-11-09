import React from 'react';
import './Alert.scss';

function Alert(props) {
  return (
    <div className="alert" role="alert">
      <strong>{props.message}</strong> 
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default Alert;
