var CalendarYear = React.createClass({
  displayName: "CalendarYear",

  render: function () {
    return React.createElement(
      "time",
      { dateTime: this.props.year, className: "year" },
      React.createElement(CalendarMonth, { year: this.props.year, month: this.props.month })
    );
  }
});

var CalendarMonth = React.createClass({
  displayName: "CalendarMonth",

  render: function () {

    var monthName = monthNumber(parseInt(this.props.month) - 1);
    var firstDay = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks = [];

    for (let i = 0; i < weeksInMonth; i++) {
      calendarWeeks.push(React.createElement(CalendarWeek, { year: this.props.year, month: this.props.month, week: indexOfFirstWeek + i }));
    }
    return React.createElement(
      "time",
      { dateTime: "{this.props.year}-{this.props.month}", className: "month" },
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

    for (let i = 0; i <= 6; i++) {
      if (this.props.week - indexOfFirstWeek == 0 && i < indexOfFirstDay) {
        dayNumber = lastMonthStart + i;
        weekDays.push(React.createElement(CalendarDay, { year: this.props.year, month: this.props.month - 1, day: dayNumber, "class": "day previous-month" }));
      } else if (this.props.week - indexOfFirstWeek + 1 == weeksInMonth && i > indexOfLastDay) {
        dayNumber = i - indexOfLastDay;
        weekDays.push(React.createElement(CalendarDay, { year: this.props.year, month: this.props.month + 1, day: dayNumber, "class": "day next-month" }));
      } else {
        dayNumber = (this.props.week - indexOfFirstWeek) * 7 + (i + 1) - indexOfFirstDay;
        weekDays.push(React.createElement(CalendarDay, { year: this.props.year, month: this.props.month, day: dayNumber, "class": "day" }));
      }
    }

    return React.createElement(
      "time",
      { dateTime: this.props.year + "-W" + this.props.week, className: "week" },
      weekDays
    );
  }
});

var CalendarDay = React.createClass({
  displayName: "CalendarDay",

  render: function () {
    return React.createElement(
      "time",
      { dateTime: this.props.year + "-" + this.props.month + "-" + this.props.day, className: this.props.class },
      React.createElement(
        "span",
        { className: "day-label" },
        this.props.day
      )
    );
  }
});

$(function () {
  ReactDOM.render(React.createElement(CalendarYear, { year: "2016", month: "06" }), document.getElementById('calendarView'));
});