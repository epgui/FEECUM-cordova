import React from 'react';

class ViewControls extends React.Component
{
  render()
  {
    return(
      <div id="controls">
        <div id="ctrl-left-button">
          <span>&laquo;</span>
        </div>
        <div id="ctrl-title-bar">
          <h1>Calendrier de la FÉÉCUM</h1>
        </div>
        <div id="ctrl-right-button">
          <span>&raquo;</span>
        </div>
      </div>
    );
  }
}

export default ViewControls;
