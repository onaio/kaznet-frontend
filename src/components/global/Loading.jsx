// This component
import React from 'react';

import './Loading.scss';

function Loading() {
  return (
    <center>
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </center>
  );
}

export default Loading;
