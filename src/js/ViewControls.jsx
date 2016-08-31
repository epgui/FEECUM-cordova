import React from 'react';

class ViewControls extends React.Component
{
  render()
  {
    var thisYear          = this.props.year;
    var thisMonth         = this.props.month;
    var nextMonthYear     = nextMonthYearNumber(thisYear, thisMonth);
    var nextMonth         = nextMonthNumber(thisMonth);
    var previousMonthYear = previousMonthYearNumber(thisYear, thisMonth);
    var previousMonth     = previousMonthNumber(thisMonth);

    return(
      <div id="controls">
        <div id="ctrl-left-button">
          <span onClick={() => this.props.switchPage(previousMonthYear, previousMonth)}>&laquo;</span>
        </div>
        <div id="ctrl-title-bar">
          <h1>FÉÉCUM</h1>
        </div>
        <div id="ctrl-right-button">
          <span onClick={() => this.props.switchPage(nextMonthYear, nextMonth)}>&raquo;</span>
        </div>
      </div>
    );
  }
}

export default ViewControls;
