import React          from 'react';
import { VIEW_STATE } from './StateMachineDefinitions.js';

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


    // Fetch action passed down from props
    var previousPage      = () => this.props.switchPage(previousMonthYear, previousMonth);
    var nextPage          = () => this.props.switchPage(nextMonthYear, nextMonth);
    var exitDayMode       = () => this.props.exitDayMode();

    var leftButton  = [];
    var titleBar    = [];
    var rightButton = [];

    switch (this.props.viewMode)
    {
      case VIEW_STATE.CALENDAR_MONTH:
        leftButton.push(
          <div key="1" id="ctrl-left-button">
            <span onClick={previousPage}>&laquo;</span>
          </div>
        );
        titleBar.push(
          <div key="2" id="ctrl-title-bar">
            <h1>FÉÉCUM</h1>
          </div>
        );
        rightButton.push(
          <div key="3" id="ctrl-right-button">
            <span onClick={nextPage}>&raquo;</span>
          </div>
        );
        break;
      case VIEW_STATE.CALENDAR_DAY:
        leftButton.push(
          <div key="1" id="ctrl-left-button">
            <span onClick={exitDayMode}>{"« " + monthNumber(this.props.month).substring(0,3)}</span>
          </div>
        );
        titleBar.push(
          <div key="2" id="ctrl-title-bar">
            <h1>FÉÉCUM</h1>
          </div>
        );
        break;
      default:
        titleBar.push(
          <div key="2" id="ctrl-title-bar">
            <h1>FÉÉCUM</h1>
          </div>
        );
    }

    return(
      <div id="controls">
        {leftButton}
        {titleBar}
        {rightButton}
      </div>
    );
  }
}

export default ViewControls;
