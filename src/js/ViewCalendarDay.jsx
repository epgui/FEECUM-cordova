import React             from 'react';
import ViewCalendarEvent from './ViewCalendarEvent.jsx';
import { VIEW_STATE }    from './StateMachineDefinitions.js';

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

    if (eventsForThisMonth != null)
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

  handleClick: function(hasEvents = false)
  {
    var clickHandler = false;

    if (hasEvents === true)
    {
      clickHandler = () => this.props.viewEventsForThisDay(this.props.day);
    }

    return clickHandler;
  },

  render: function()
  {
    // Format dateTime for HTML
    var formattedDateTime = this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day);

    // Return all events for this day
    var eventsForThisDate = this.filterEventsForThisDate();

    // Don't forget month is zero-indexed for Date().
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var dayClass = "";

    // Add class if day has events
    var hasEventsToday = (eventsForThisDate.length > 0) ? true : false;
    dayClass += hasEventsToday ? " has-events" : "";

    // Add class if day is today
    dayClass += ((today.getFullYear()  == this.props.year)  &&
                 (today.getMonth() == this.props.month - 1) &&
                 (today.getDate()  == this.props.day)) ? " today" : "";

    if (this.props.viewMode == VIEW_STATE.CALENDAR_MONTH)
    {
      // Fetch action passed down from props
      var viewEventsForThisDate = () => false;

      if (hasEventsToday && !this.props.disableClick)
      {
        viewEventsForThisDate = () => this.props.viewEventsForThisDay(this.props.day);
      }


      return (
        <time dateTime={formattedDateTime}
              className={this.props.class}
              onClick={viewEventsForThisDate}>

            <span className={"day-label" + dayClass}>
              {parseInt(this.props.day)}
            </span>

        </time>
      );
    }
    if (this.props.viewMode == VIEW_STATE.CALENDAR_DAY)
    {
      // Fetch action passed down from props
      var exitDayMode = () => this.props.exitDayMode(this.props.day);

      var eventYear    = this.props.year;
      var eventMonth   = this.props.month;
      var eventDay     = this.props.day;
      var eventDate    = new Date(eventYear, eventMonth - 1, eventDay, 0, 0);

      var viewEventsForThisDate = [];

      var weekDay  = dayNumber(eventDate.getDay()).capitalizeFirstLetter();
      var subtitle = weekDay + " le " + eventDate.getDate() + " " + monthNumber(eventDate.getMonth()) + " " + eventDate.getFullYear();
      viewEventsForThisDate.push(<span key={0} className="title">{"Évènements quotidiens"}</span>);
      viewEventsForThisDate.push(<span key={1} className="subtitle">{subtitle}</span>);

      if (eventsForThisDate.length > 0)
      {
        for (var i = 0, len = eventsForThisDate.length; i < len; i++)
        {
          var event = eventsForThisDate[i];

          viewEventsForThisDate.push(<ViewCalendarEvent
                                       key={i + 2}
                                       id={event.id}
                                       category={event.category}
                                       title={event.summary}
                                       tStart={event.t_start}
                                       tEnd={event.t_end}
                                       description={event.description}
                                     />);
        }
      }

      return (
        <div id="dayView">
          {viewEventsForThisDate}
        </div>
      );
    }
  }
});

export default ViewCalendarDay;
