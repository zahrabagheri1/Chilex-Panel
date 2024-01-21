import React from 'react';
import './Alert.scss';

function Alert(props) {
  return (
    <div className="bgAlrt">
      <div className={`alert ${props.success === true ? 'success' : props.success === false ? 'unsuccess' : 'deleted'}`} role="alert">
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Alert;
