import React from 'react';

const Spinner = props => {
  return (
    <>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{props.loadingMessage}</div>
      </div>
    </>
  );
};
Spinner.defaultProps = {
  loadingMessage: 'Loading...'
};

export default Spinner;
