import React from 'react';

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
        this.props.loadDataIntoStateMachine(data);
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
    // setInterval(this.loadEventsFromServer, 10000);
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

    // Look in the state for data for the currently displayed month
    var data  = this.props.data;
    if (data.length > 0)
    {
      for (var i = 0, length = data.length; i < length; i++)
      {
        if ( (data[i].year == year) && (data[i].month == month) )
        {
          data = data[i].events;
        }
      }
    }

    // Calculate how many weeks in the currently displayed month
    var monthName        = monthNumber(month - 1);
    var firstDay         = new Date(year, month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks    = [];
    var displayClass     = "";

    for (var i = 0; i < weeksInMonth; i++)
    {
      calendarWeeks.push(<CalendarWeek
                           key={i}
                           year={year}
                           month={month}
                           week={indexOfFirstWeek + i}
                           data={data}
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

var CalendarWeek = React.createClass({
  render: function()
  {
    var firstDay         = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var indexOfFirstDay  = firstDay.getDay();
    var indexOfLastDay   = new Date(this.props.year, this.props.month, 0).getDay();
    var lastMonthStart   = new Date(this.props.year, this.props.month - 1, 0).getDate() - (indexOfFirstDay - 1);
    var weekDays         = [];
    var dayNumber        = 0;

    for (var i = 0; i <= 6; i++)
    {
      if (((this.props.week - indexOfFirstWeek) == 0) && (i < (indexOfFirstDay)))
      {
        dayNumber = lastMonthStart + i;

        weekDays.push(<CalendarDay
                        key={i}
                        year={previousMonthYearNumber(this.props.year, this.props.month)}
                        month={leadingZeros(previousMonthNumber(this.props.month))}
                        day={leadingZeros(dayNumber)}
                        data={this.props.data}
                        class="day previous-month"
                      />);
      }
      else if ((this.props.week - indexOfFirstWeek + 1) == weeksInMonth && i > indexOfLastDay)
      {
        dayNumber = i - indexOfLastDay;

        weekDays.push(<CalendarDay
                        key={i}
                        year={nextMonthYearNumber(this.props.year, this.props.month)}
                        month={leadingZeros(nextMonthNumber(this.props.month))}
                        day={leadingZeros(dayNumber)}
                        data={this.props.data}
                        class="day next-month"
                      />);
      }
      else
      {
        dayNumber = ((this.props.week - indexOfFirstWeek) * 7) + (i + 1) - indexOfFirstDay;

        weekDays.push(<CalendarDay
                        key={i}
                        year={this.props.year}
                        month={leadingZeros(this.props.month)}
                        day={leadingZeros(dayNumber)}
                        data={this.props.data}
                        class="day"
                      />);
      }

    }

    return (
      <time dateTime={this.props.year + "-W" + leadingZeros(this.props.week)} className="week">
        {weekDays}
      </time>
    );
  }
});

var CalendarDay = React.createClass({
  render: function()
  {
    // Don't forget month is zero-indexed for Date().
    var thisDate = new Date(this.props.year, this.props.month - 1, this.props.day);
    thisDate.setHours(0, 0, 0, 0);

    var eventsForThisDate = [];

    if (this.props.data.length > 0)
    {
      $.each(this.props.data, function(i, item)
      {
        // See calendar-functions.js
        var eventYear  = item.t_start.getYear();
        var eventMonth = item.t_start.getMonth();
        var eventDay   = item.t_start.getDay();

        // Don't forget month is zero-indexed for Date().
        var eventDate = new Date(eventYear, eventMonth - 1, eventDay);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate.getTime() == thisDate.getTime())
        {
          eventsForThisDate.push(item);
        }
      });
    }

    return (
      <time dateTime={this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day)} className={this.props.class}>
        <span className="day-label">
          {this.props.day}
        </span>
        <span className="day-label">
          {JSON.stringify(eventsForThisDate)}
        </span>
      </time>
    );
  }
});

export default ViewCalendarMonth;
