var CalendarYear = React.createClass({
  displayName: "CalendarYear",

  render: function () {
    var calendarMonths = [];

    for (var i = 0; i < parseInt(this.props.month); i++) {
      var monthNumber = i + 1;
      if (monthNumber == parseInt(this.props.month)) {
        calendarMonths.push(React.createElement(CalendarMonth, { key: i, year: this.props.year, month: monthNumber, url: "http://feecum.ca/dev/backend.php?year=" + this.props.year + "&month=" + monthNumber }));
      } else {
        //calendarMonths.push(<CalendarMonth key={i} year={this.props.year} month={monthNumber} url={"http://feecum.ca/dev/backend.php?year=" + this.props.year + "&month=" + monthNumber} isElementHidden={1} />);
      }
    }

    return React.createElement(
      "time",
      { dateTime: this.props.year, className: "year" },
      calendarMonths
    );
  }
});

var CalendarMonth = React.createClass({
  displayName: "CalendarMonth",

  loadEventsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      async: true,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        console.warn(xhr.responseText);
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    this.loadEventsFromServer();
    //setInterval(this.loadEventsFromServer, 5000); // Check for new events every 5 seconds
  },
  render: function () {

    console.log("this.state.data = ");
    console.log(this.state.data);

    var monthName = monthNumber(parseInt(this.props.month) - 1);
    var firstDay = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks = [];
    var displayClass = "";

    for (var i = 0; i < weeksInMonth; i++) {
      calendarWeeks.push(React.createElement(CalendarWeek, { key: i, year: this.props.year, month: this.props.month, week: indexOfFirstWeek + i, data: this.state.data }));
    }

    if (this.props.isElementHidden == 1) {
      displayClass += "hidden";
    }

    return React.createElement(
      "time",
      { dateTime: this.props.year + "-" + leadingZeros(this.props.month), className: "month " + displayClass },
      React.createElement(
        "span",
        { className: "month-label" },
        monthName
      ),
      calendarWeeks
    );
  }
});

var CalendarWeek = React.createClass({
  displayName: "CalendarWeek",

  render: function () {
    var firstDay = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var indexOfFirstDay = firstDay.getDay();
    var indexOfLastDay = new Date(this.props.year, this.props.month, 0).getDay();
    var lastMonthStart = new Date(this.props.year, this.props.month - 1, 0).getDate() - (indexOfFirstDay - 1);
    var weekDays = [];
    var dayNumber = 0;

    for (var i = 0; i <= 6; i++) {
      if (this.props.week - indexOfFirstWeek == 0 && i < indexOfFirstDay) {
        dayNumber = lastMonthStart + i;
        weekDays.push(React.createElement(CalendarDay, { key: i, year: previousMonthYearNumber(this.props.year, this.props.month), month: leadingZeros(previousMonthNumber(this.props.month)), day: leadingZeros(dayNumber), data: this.props.data, "class": "day previous-month" }));
      } else if (this.props.week - indexOfFirstWeek + 1 == weeksInMonth && i > indexOfLastDay) {
        dayNumber = i - indexOfLastDay;
        weekDays.push(React.createElement(CalendarDay, { key: i, year: nextMonthYearNumber(this.props.year, this.props.month), month: leadingZeros(nextMonthNumber(this.props.month)), day: leadingZeros(dayNumber), data: this.props.data, "class": "day next-month" }));
      } else {
        dayNumber = (this.props.week - indexOfFirstWeek) * 7 + (i + 1) - indexOfFirstDay;
        weekDays.push(React.createElement(CalendarDay, { key: i, year: this.props.year, month: leadingZeros(this.props.month), day: leadingZeros(dayNumber), data: this.props.data, "class": "day" }));
      }
    }

    return React.createElement(
      "time",
      { dateTime: this.props.year + "-W" + leadingZeros(this.props.week), className: "week" },
      weekDays
    );
  }
});

var CalendarDay = React.createClass({
  displayName: "CalendarDay",

  render: function () {

    // Don't forget month is zero-indexed for Date().
    var thisDate = new Date(this.props.year, this.props.month - 1, this.props.day);
    thisDate.setHours(0, 0, 0, 0);

    var eventsForThisDate = [];

    if ("events" in this.props.data) {
      $.each(this.props.data.events, function (i, item) {

        // Regular expressions are the best way to parse the date.
        // Otherwise, a different implementation of Date in Safari will
        // cause everything to fail silently.

        // For example, let's take the date string representation "2016-09-05 10:00:00".
        // /\s/ will match any whitespace.
        // Doing split(/\s/) results in this array: ["2016-09-05", "10:00:00"].
        // We're not interested in the time of day, so let's just keep the first element [0].
        var eventDateStr = item.t_start.split(/\s/)[0];

        // /\-/ will match the minus sign (used as a dash separator in "2016-09-05")
        // Thus split(/\-/) results in this array: ["2016", "09", "05"], which is
        // exactly what we're looking for! We use parseInt() with base 10 (decimal).
        var eventYearInt = parseInt(eventDateStr.split(/\-/)[0], 10);
        var eventMonthInt = parseInt(eventDateStr.split(/\-/)[1], 10);
        var eventDayInt = parseInt(eventDateStr.split(/\-/)[2], 10);

        // Don't forget month is zero-indexed for Date().
        var eventDate = new Date(eventYearInt, eventMonthInt - 1, eventDayInt);
        eventDate.setHours(0, 0, 0, 0);

        console.log(eventDate);

        if (eventDate.getTime() == thisDate.getTime()) {
          eventsForThisDate.push(item);
        }
      });
    }

    return React.createElement(
      "time",
      { dateTime: this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day), className: this.props.class },
      React.createElement(
        "span",
        { className: "day-label" },
        this.props.day
      ),
      React.createElement(
        "span",
        { className: "day-label" },
        JSON.stringify(eventsForThisDate)
      )
    );
  }
});

$(function () {
  var year = 2016;
  var month = 9;
  ReactDOM.render(React.createElement(CalendarYear, { year: year, month: leadingZeros(month) }), document.getElementById('calendarView'));
});