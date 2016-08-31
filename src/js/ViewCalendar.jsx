import React from 'react';
import ContainerCalendarMonth from './ContainerCalendarMonth.jsx';

var ViewCalendar = React.createClass({
  render: function()
  {
    var year = this.props.year;
    var month = this.props.month;

    var calendarMonths = [];

    calendarMonths.push(<ContainerCalendarMonth
                          key={1}
                          year={year}
                          month={month}
                        />);

    return (
      <time dateTime={year} className="year">
        {calendarMonths}
      </time>
    );
  }
});

export default ViewCalendar;
