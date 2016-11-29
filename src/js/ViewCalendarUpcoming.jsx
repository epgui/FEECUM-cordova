import React             from 'react';
import ViewCalendarEvent from './ViewCalendarEvent.jsx';
import { VIEW_STATE }    from './StateMachineDefinitions.js';

var ViewCalendarUpcoming = React.createClass(
{
  getUpcomingEvents: function(numberOfEventsToGet)
  {
    var currentTime = new Date();
    var year  = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day   = currentTime.getDate();

    var data = this.props.data;
    var eventsForThisMonthAndTheNext = [];
    var upcomingEvents = [];

    // Look in the state for data for the currently displayed month
    if (data.length > 0)
    {
      for (var i = 0, length = data.length; i < length; i++)
      {
        eventsForThisMonthAndTheNext = ( ((data[i].month == month) || (data[i].month == month + 1)) &&
                                         (data[i].year == year) &&
                                         (data[i].events != null)) ? eventsForThisMonthAndTheNext.concat(data[i].events) : eventsForThisMonthAndTheNext;
      }
    }

    if (eventsForThisMonthAndTheNext.length > 0)
    {
      $.each(eventsForThisMonthAndTheNext, function(i, event)
      {
        // See calendar-functions.js
        var eventYear  = event.t_start.getYear();
        var eventMonth = event.t_start.getMonth();
        var eventDay   = event.t_start.getDay();

        // Don't forget month is zero-indexed for Date().
        var eventDate = new Date(eventYear, eventMonth - 1, eventDay);

        if ((eventDate.getTime() >= currentTime.getTime()) && (upcomingEvents.length < numberOfEventsToGet))
        {
          upcomingEvents.push(event);
        }
      });
    }

    return upcomingEvents;
  },

  render: function()
  {
    // Return all events for this day
    var numberOfEventsToGet = 5;
    var upcomingEvents      = this.getUpcomingEvents(numberOfEventsToGet);
    var viewUpcomingEvents  = [];
    var hasEventsToday      = false;

    // Don't forget month is zero-indexed for Date().
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var dateIndex = today;

    if (upcomingEvents.length > 0)
    {
      for (var i = 0, len = upcomingEvents.length; i < len; i++)
      {
        var event = upcomingEvents[i];

        // See calendar-functions.js
        var eventYear    = event.t_start.getYear();
        var eventMonth   = event.t_start.getMonth();
        var eventDay     = event.t_start.getDay();
        var eventHours   = event.t_start.getHours();
        var eventMinutes = event.t_start.getMinutes();
        var eventDate    = new Date(eventYear, eventMonth - 1, eventDay, eventHours, eventMinutes);

        if (eventDate == today)
        {
          hasEventsToday = true;
        }
        else if (eventDate > dateIndex)
        {
          var weekDay  = dayNumber(eventDate.getDay()).capitalizeFirstLetter();
          var subtitle = weekDay + " le " + eventDate.getDate() + " " + monthNumber(eventDate.getMonth()) + " " + eventDate.getFullYear();

          viewUpcomingEvents.push(<span key={i+numberOfEventsToGet} className="subtitle">{subtitle}</span>);

          dateIndex = eventDate;
        }

        viewUpcomingEvents.push(<ViewCalendarEvent
                              key={i}
                              id={event.id}
                              category={event.category}
                              title={event.summary}
                              tStart={event.t_start}
                              tEnd={event.t_end}
                              description={event.description}
                            />);
      }
    }

    if (hasEventsToday)
    {
      subtitle = <span key={2} className="subtitle">{"Plus tard aujourd'hui"}</span>;
    }
    else
    {
      subtitle = viewUpcomingEvents[0];
      viewUpcomingEvents.shift();
    }

    return (
      <div>
        <span key={10} className="title">{"Prochains évènements"}</span>
        {subtitle}
        <div key={11} id="dayView">
          {viewUpcomingEvents}
        </div>
      </div>
    );

  }

});

export default ViewCalendarUpcoming;
