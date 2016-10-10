import React                     from 'react';
import ContainerCalendarMonth    from './ContainerCalendarMonth.jsx';
import ContainerCalendarDay      from './ContainerCalendarDay.jsx';
import ContainerCalendarUpcoming from './ContainerCalendarUpcoming.jsx';
import { VIEW_STATE }            from './StateMachineDefinitions.js';

var ViewCalendar = React.createClass({
  render: function()
  {
    var year  = this.props.year;
    var month = this.props.month;
    var today = new Date();
    var today = today.getDate();

    var calendarPages = [];
    var upcomingEvents  = [];

    if (this.props.viewMode == 'calendar-month')
    {
      calendarPages.push(<ContainerCalendarMonth
                           key={1}
                           year={year}
                           month={month}
                           viewMode={this.props.viewMode}
                         />);

      var title    = "Prochains évènements";
      var subtitle = "Plus tard aujourd'hui";

      upcomingEvents.push(<span key={1} className="title">{title}</span>);
      upcomingEvents.push(<span key={2} className="subtitle">{subtitle}</span>);

      upcomingEvents.push(<ContainerCalendarUpcoming
                            key={3}
                            year={year}
                            month={month}
                            day={leadingZeros(today)}
                            viewMode={VIEW_STATE.CALENDAR_DAY}
                            class="day"
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
      <div id="view-calendar">
        <time dateTime={year} className="year">
          <span className="year-label">{this.props.year}</span>
          {calendarPages}
        </time>
        <div id="view-upcoming-events">
          {upcomingEvents}
        </div>
      </div>
    );
  }
});

export default ViewCalendar;
