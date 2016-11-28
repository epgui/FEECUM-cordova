import React            from 'react';
import ViewCalendarWeek from './ViewCalendarWeek.jsx';
import DataLoader       from './DataLoader.js';

var ViewCalendarMonth = React.createClass(
{
  componentWillMount: function()
  {
    this.loadEvents();
  },

  componentWillUnmount: function()
  {
    this.dataLoader.abortConnection();
  },

  loadEvents: function()
  {
    this.dataLoader = new DataLoader();
    this.dataLoader.loadApplicationState(this.props.data);
    this.dataLoader.loadEvents(this.props.year, this.props.month, this.props.loadDataIntoStateMachine);
  },

  render: function()
  {
    var year  = this.props.year;
    var month = this.props.month;
    
    // Calculate how many weeks in the currently displayed month
    var monthName        = monthNumber(month - 1).capitalizeFirstLetter();
    var firstDay         = new Date(year, month - 1, 1);
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks    = [];
    var displayClass     = "";

    for (var i = 0; i < 6; i++)
    {
      calendarWeeks.push(<ViewCalendarWeek
                           key={i}
                           year={year}
                           month={month}
                           week={indexOfFirstWeek + i}
                           viewMode={this.props.viewMode}
                         />);
    }

    if (this.props.isElementHidden == 1)
    {
      displayClass += "hidden";
    }

    return (
      <div className={this.props.displayMode}>
        <span className="year-label">{this.props.year}</span>
        <time dateTime={year + "-" + leadingZeros(month)} className={"month " + displayClass}>
          <span className="month-label">{monthName}</span>
          <div className="weekdays-labels">
            <span className="weekend-label">Dim</span>
            <span className="weekday-label">Lun</span>
            <span className="weekday-label">Mar</span>
            <span className="weekday-label">Mer</span>
            <span className="weekday-label">Jeu</span>
            <span className="weekday-label">Ven</span>
            <span className="weekend-label">Sam</span>
          </div>
          {calendarWeeks}
        </time>
      </div>
    );
  }
});

export default ViewCalendarMonth;
