import React from 'react';
import './Alert.scss';

function Alert(props) {
  console.log(props)
  return (
    <div className={`alert ${props.success === true ? 'success' : 'unsuccess'}`} role="alert">
      <p>{props.message}</p>
    </div>
  );
}

export default Alert;
