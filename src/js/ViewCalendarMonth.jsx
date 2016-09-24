import React            from 'react';
import ViewCalendarWeek from './ViewCalendarWeek.jsx';

var ViewCalendarMonth = React.createClass(
{
  loadEventsFromServer: function()
  {
    var year   = this.props.year;
    var month  = this.props.month;
    var apiURL = "http://feecum.ca/dev/backend.php?year=" + year + "&month=" + parseInt(month);

    this.serverRequest = $.ajax(
    {
      url: apiURL,
      dataType: 'json',
      cache: false,
      async: true,
      success: function(data)
      {

        var recordAlreadyExists = false;

        for (var i = 0, len = this.props.data.length; i < len; i++)
        {
          if ((year == this.props.data[i].year) && (month == this.props.data[i].month))
          {
            recordAlreadyExists = true;

            // Eventually, check to see if records need updating here.
          }
        }

        if (recordAlreadyExists == false)
        {
          var newData = {
            events: data.events,
            calYear: year,
            calMonth: month
          };
          this.props.loadDataIntoStateMachine(newData);
        }

      }.bind(this),
      error: function(xhr, status, err)
      {
        console.error(apiURL, status, err.toString());
        console.warn(xhr.responseText);
      }.bind(this)
    });
  },
  componentDidMount: function()
  {
    // Fetch data from FÉÉCUM servers
    this.loadEventsFromServer();

    // Check for new events every 10 seconds
    // Currently unsupported by StateMachineComponents.js
    setInterval(this.loadEventsFromServer, 10000);
  },
  componentDidUpdate: function()
  {
    // Fetch data from FÉÉCUM servers
    this.loadEventsFromServer();
  },
  componentWillUnmount: function()
  {
    // Cancel any outstanding requests before the component is unmounted.
    this.serverRequest.abort();
  },
  render: function()
  {
    var year  = this.props.year;
    var month = this.props.month;

    // Calculate how many weeks in the currently displayed month
    var monthName        = monthNumber(month - 1);
    var firstDay         = new Date(year, month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks    = [];
    var displayClass     = "";

    for (var i = 0; i < weeksInMonth; i++)
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
      <time dateTime={year + "-" + leadingZeros(month)} className={"month " + displayClass}>
        <span className="month-label">{monthName}</span>
        {calendarWeeks}
      </time>
    );
  }
});

export default ViewCalendarMonth;
