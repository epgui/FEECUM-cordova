import React          from 'react';
import { VIEW_STATE } from './StateMachineDefinitions.js';

var ViewCalendarEvent = React.createClass(
{
  addToCalendar: function(firstReminder = 60, secondReminder = null)
  {
    // Get all parameters for start time
    var startYear     = this.props.tStart.getYear();
    var startMonth    = this.props.tStart.getMonth() - 1; // Months are zero-indexed in javascript
    var startDay      = this.props.tStart.getDay();
    var startHours    = this.props.tStart.getHours();
    var startMinutes  = this.props.tStart.getMinutes();

    // Get all parameters for end time
    var endYear       = this.props.tEnd.getYear();
    var endMonth      = this.props.tEnd.getMonth() - 1; // Months are zero-indexed in javascript
    var endDay        = this.props.tEnd.getDay();
    var endHours      = this.props.tEnd.getHours();
    var endMinutes    = this.props.tEnd.getMinutes();

    // Initialize basic parameters for event creation
    var startTime     = new Date(startYear, startMonth, startDay, startHours, startMinutes, 0, 0);
    var endDate       = new Date(  endYear,   endMonth,   endDay,   endHours,   endMinutes, 0, 0);
    var title         = this.props.title;
    var eventLocation = "FÉÉCUM";
    var notes         = this.props.description;
    var success       = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error         = function(message) { alert("Error: " + message); };

    // Populate default optional parameters for event creation
    //
    // Example response on iOS:
    //
    //   {
    //     calendarId: null,
    //     calendarName: "calendar",
    //     firstReminderMinutes: 60,
    //     recurrence: null,
    //     recurrenceEndDate: null,
    //     recurrenceInterval: 1,
    //     secondReminderMinutes: null,
    //     url: null
    //   }
    //
    var calOptions = window.plugins.calendar.getCalendarOptions();

    // Modify optional parameters before event creation
    calOptions.url = "http://www.feecum.ca";
    calOptions.firstReminderMinutes  = firstReminder;
    calOptions.secondReminderMinutes = secondReminder;

    // on iOS the success handler receives the event ID (since 4.3.6)
    // window.plugins.calendar.createEventWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);

    // create an event interactively with the calOptions object as shown above
    window.plugins.calendar.createEventInteractivelyWithOptions(title,
                                                                eventLocation,
                                                                notes,
                                                                startDate,
                                                                endDate,
                                                                calOptions,
                                                                success,
                                                                error);
  },
  findEvent: function()
  {
    // find events (on iOS this includes a list of attendees (if any))
    window.plugins.calendar.findEvent(title,eventLocation,notes,startDate,endDate,success,error);
  },
  deleteEvent: function()
  {
    // delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored). The dates are mandatory and represent a date range to delete events in.
    // note that on iOS there is a bug where the timespan must not be larger than 4 years, see issue 102 for details.. call this method multiple times if need be
    // since 4.3.0 you can match events starting with a prefix title, so if your event title is 'My app - cool event' then 'My app -' will match.
    window.plugins.calendar.deleteEvent(newTitle,eventLocation,notes,startDate,endDate,success,error);
  },
  openCalendar: function()
  {
    // - open at a specific date, here today + 3 days
    var d = new Date(new Date().getTime() + 3*24*60*60*1000);
    window.plugins.calendar.openCalendar(d, success, error); // callbacks are optional
  },
  formatHTML: function(htmlString)
  {
    return { __html: htmlString };
  },
  render: function()
  {
    var eventStartTime = this.props.tStart.getHours() + "h" + leadingZeros(this.props.tStart.getMinutes());
    var eventEndTime   = this.props.tEnd.getHours()   + "h" + leadingZeros(this.props.tEnd.getMinutes());

    var addEventToCalendar = () => this.addToCalendar();

    return(
      <li className="event-container" id={"eventID-" + this.props.id}>
        <span className="event-category">{this.props.category}</span>
        <span className="event-title">{this.props.title}</span>
        <span className="event-time">
          <span>{eventStartTime}</span> - <span>{eventEndTime}</span>
        </span>
        <p className="event-description" dangerouslySetInnerHTML={this.formatHTML(this.props.description)}></p>
        <span className="button add-event" onClick={addEventToCalendar}>Ajouter à mon calendrier</span>
      </li>
    );
  }
});

export default ViewCalendarEvent;
