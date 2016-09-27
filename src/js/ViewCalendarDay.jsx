import React          from 'react';
import { VIEW_STATE } from './StateMachineDefinitions.js';

var ViewCalendarDay = React.createClass(
{
  filterEventsForThisDate: function()
  {
    var year  = this.props.year;
    var month = this.props.month;
    var day   = this.props.day

    // Don't forget month is zero-indexed for Date().
    var thisDate = new Date(year, month - 1, day);
    thisDate.setHours(0, 0, 0, 0);

    var data = this.props.data;
    var eventsForThisMonth = [];
    var eventsForThisDate  = [];

    // Look in the state for data for the currently displayed month
    if (data.length > 0)
    {
      for (var i = 0, length = data.length; i < length; i++)
      {
        if ( (data[i].year == year) && (data[i].month == month) )
        {
          eventsForThisMonth = data[i].events;
        }
      }
    }

    if (eventsForThisMonth.length > 0)
    {
      $.each(eventsForThisMonth, function(i, event)
      {
        // See calendar-functions.js
        var eventYear  = event.t_start.getYear();
        var eventMonth = event.t_start.getMonth();
        var eventDay   = event.t_start.getDay();

        // Don't forget month is zero-indexed for Date().
        var eventDate = new Date(eventYear, eventMonth - 1, eventDay);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate.getTime() == thisDate.getTime())
        {
          eventsForThisDate.push(event);
        }
      });
    }

    return eventsForThisDate;

  },
  formatHTML: function(htmlString)
  {
    return { __html: htmlString };
  },
  render: function()
  {
    // Format dateTime for HTML
    var formattedDateTime = this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day);

    // Return all events for this day
    var eventsForThisDate = this.filterEventsForThisDate();


    if (this.props.viewMode == VIEW_STATE.CALENDAR_MONTH)
    {
      // Fetch action passed down from props
      var viewEventsForThisDate = () => this.props.viewEventsForThisDay(this.props.day);

      return (
        <time dateTime={formattedDateTime}
              className={this.props.class}
              onClick={viewEventsForThisDate}>

          <span className="day-label">
            {this.props.day}
          </span>

          <span className="day-label">
            {JSON.stringify(eventsForThisDate)}
          </span>

        </time>
      );
    }
    if (this.props.viewMode == VIEW_STATE.CALENDAR_DAY)
    {
      // Fetch action passed down from props
      var exitDayMode = () => this.props.exitDayMode(this.props.day);

      var formattedEventsForThisDate = [];

      if (eventsForThisDate.length > 0)
      {
        for (var i = 0, len = eventsForThisDate.length; i < len; i++)
        {
          var event          = eventsForThisDate[i];
          var eventStartTime = event.t_start.getHours() + "h" + leadingZeros(event.t_start.getMinutes());
          var eventEndTime   = event.t_end.getHours()   + "h" + leadingZeros(event.t_end.getMinutes());

          formattedEventsForThisDate.push(
            <li key={i} className="event-container" id={"eventID-" + event.id}>
              <span className="event-category">{event.category}</span>
              <span className="event-title">{event.summary}</span>
              <span className="event-time">
                <span>{eventStartTime}</span> - <span>{eventEndTime}</span>
              </span>
              <p className="event-description" dangerouslySetInnerHTML={this.formatHTML(event.description)}></p>
            </li>
          );
        }
      }

      return (
        <div id="dayView">
          <h2>{formattedDateTime}</h2>
          {formattedEventsForThisDate}
        </div>
      );
    }
  }
});

export default ViewCalendarDay;
