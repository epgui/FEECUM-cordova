import React                  from 'react';
import ContainerCalendarMonth from './ContainerCalendarMonth.jsx';
import ContainerCalendarDay   from './ContainerCalendarDay.jsx';

var ViewCalendar = React.createClass({
  render: function()
  {
    var year = this.props.year;
    var month = this.props.month;

    var calendarPages = [];

    if (this.props.viewMode == 'calendar-month')
    {
      calendarPages.push(<ContainerCalendarMonth
                            key={1}
                            year={year}
                            month={month}
                            viewMode={this.props.viewMode}
                          />);
    }
    if (this.props.viewMode == 'calendar-day')
    {
      calendarPages.push(<ContainerCalendarDay
                           key={1}
                           year={this.props.year}
                           month={leadingZeros(this.props.month)}
                           day={leadingZeros(this.props.day)}
                           viewMode={this.props.viewMode}
                           class="day"
                         />);
    }

    return (
      <time dateTime={year} className="year">
        {calendarPages}
      </time>
    );
  }
});

export default ViewCalendar;
