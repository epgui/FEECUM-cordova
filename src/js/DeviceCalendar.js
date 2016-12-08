var DeviceCalendar = {

  constructEvent: function(title, tStart, tEnd, description, location = "FÉÉCUM", url = "http://www.feecum.ca")
  {

    return {
      "title":       title,
      "tStart": {
        "year":      tStart.getYear(),
        "month":     tStart.getMonth() - 1, // zero-indexed
        "day":       tStart.getDay(),
        "hours":     tStart.getHours(),
        "minutes":   tStart.getMinutes()
      },
      "tEnd": {
        "year":      tEnd.getYear(),
        "month":     tEnd.getMonth() - 1, // zero-indexed
        "day":       tEnd.getDay(),
        "hours":     tEnd.getHours(),
        "minutes":   tEnd.getMinutes()
      },
      "location":    location,
      "description": description,
      "url":         url
    };

  },

  getEventStartTime: function(event)
  {
    return new Date(event.tStart.year,
                    event.tStart.month,
                    event.tStart.day,
                    event.tStart.hours,
                    event.tStart.minutes, 0, 0);
  },

  getEventEndTime: function(event)
  {
    return new Date(event.tEnd.year,
                    event.tEnd.month,
                    event.tEnd.day,
                    event.tEnd.hours,
                    event.tEnd.minutes, 0, 0);
  },

  successCallback: function()
  {
    //var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    //return success;
    var log = function(message) {
      console.log("successCallback:");
      console.log("Success: " + JSON.stringify(message));
    };
    return log;
  },

  errorCallback: function()
  {
    //var error = function(message) { alert("Error: " + message); };
    //return error;

    var log = function(message) {
      console.log("errorCallback:");
      console.log("Error: " + JSON.stringify(message));
    };
    return log;
  },

  find: function(event)
  {

    var title       = event.title;
    var description = event.description;
    var location    = event.location;
    var startTime   = this.getEventStartTime(event);
    var endTime     = this.getEventEndTime(event);

    // find events (on iOS this includes a list of attendees (if any))

    var foundEvent = window.plugins.calendar.findEvent(title,
                                        location,
                                        description,
                                        startTime,
                                        endTime,
                                        this.successCallback(),
                                        this.errorCallback());

    console.log(foundEvent);

  },

  add: function(event, firstReminder = 60, secondReminder = null) // Reminders are in units of minutes
  {

    var title       = event.title;
    var description = event.description;
    var location    = event.location;
    var startTime   = this.getEventStartTime(event);
    var endTime     = this.getEventEndTime(event);


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
    var options = window.plugins.calendar.getCalendarOptions();

    // Modify optional parameters before event creation
    options.url = event.url;
    options.firstReminderMinutes  = firstReminder;
    options.secondReminderMinutes = secondReminder;

    // on iOS the success handler receives the event ID (since 4.3.6)
    // window.plugins.calendar.createEventWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);

    // create an event interactively with the calOptions object as shown above
    window.plugins.calendar.createEventInteractivelyWithOptions(title,
                                                                location,
                                                                description,
                                                                startTime,
                                                                endTime,
                                                                options,
                                                                this.successCallback(),
                                                                this.errorCallback());

  },

  remove: function(event)
  {

    //
    //  -  You can pass nulls for irrelevant parameters.
    //
    //  -  Note that on Android, `notes` is ignored.
    //
    //  -  The dates are mandatory and represent a date range to delete events in.
    //
    //  -  On iOS there is a bug where the timespan must not be larger than 4 years.
    //
    //  -  You can match events starting with a prefix title, so if your event title
    //     is 'My app - cool event' then 'My app -' will match.
    //

    window.plugins.calendar.deleteEvent(event.title,
                                        event.location,
                                        event.description,
                                        this.getEventStartTime(event),
                                        this.getEventEndTime(event),
                                        this.successCallback(),
                                        this.errorCallback());

  },

  openDeviceCalendar: function(year, month, day)
  {

    // Open the device's built-in calendar at today's date
    window.plugins.calendar.openCalendar(new Date(year, month - 1, day),
                                         this.successCallback(),
                                         this.errorCallback()); // callbacks are optional
  }

};

export default DeviceCalendar;
