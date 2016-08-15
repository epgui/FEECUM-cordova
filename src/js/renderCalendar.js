var CalendarYear = React.createClass({
  render: function() {

    var calendarMonths = [];

    for (var i = 0; i < parseInt(this.props.month); i++ )
    {
      if (i + 1 == parseInt(this.props.month))
      {
        calendarMonths.push(<CalendarMonth year={this.props.year} month={i + 1} />);
      }
      else
      {
        calendarMonths.push(<CalendarMonth year={this.props.year} month={i + 1} isElementHidden={1} />);
      }
    }

    return (
      <time dateTime={this.props.year} className="year">
        {calendarMonths}
      </time>
    );
  }
});

var CalendarMonth = React.createClass({
  render: function() {

    var monthName        = monthNumber(parseInt(this.props.month) - 1)
    var firstDay         = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks    = [];
    var displayClass     = "";

    for (var i = 0; i < weeksInMonth; i++)
    {
      calendarWeeks.push(<CalendarWeek year={this.props.year} month={this.props.month} week={indexOfFirstWeek + i} />);
    }

    if (this.props.isElementHidden == 1)
    {
      displayClass += "hidden";
    }

    return (
      <time dateTime={this.props.year + "-" + leadingZeros(this.props.month)} className={"month " + displayClass}>
        <span className="month-label">{monthName}</span>
        {calendarWeeks}
      </time>
    );
  }
});

var CalendarWeek = React.createClass({
  render: function() {

    var firstDay            = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth        = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek    = firstDay.getWeekNumber();
    var indexOfFirstDay     = firstDay.getDay();
    var indexOfLastDay      = new Date(this.props.year, this.props.month, 0).getDay();
    var lastMonthStart      = new Date(this.props.year, this.props.month - 1, 0).getDate() - (indexOfFirstDay - 1);
    var weekDays            = [];
    var dayNumber           = 0;

    for (var i = 0; i <= 6; i++)
    {
      if (((this.props.week - indexOfFirstWeek) == 0) && (i < (indexOfFirstDay)))
      {
        dayNumber = lastMonthStart + i;
        weekDays.push(<CalendarDay year={previousMonthYearNumber(this.props.year, this.props.month)} month={leadingZeros(previousMonthNumber(this.props.month))} day={leadingZeros(dayNumber)} class="day previous-month" />);
      }
      else if ((this.props.week - indexOfFirstWeek + 1) == weeksInMonth && i > indexOfLastDay)
      {
        dayNumber = i - indexOfLastDay;
        weekDays.push(<CalendarDay year={nextMonthYearNumber(this.props.year, this.props.month)} month={leadingZeros(nextMonthNumber(this.props.month))} day={leadingZeros(dayNumber)} class="day next-month" />);
      }
      else {
        dayNumber = ((this.props.week - indexOfFirstWeek) * 7) + (i + 1) - indexOfFirstDay;
        weekDays.push(<CalendarDay year={this.props.year} month={leadingZeros(this.props.month)} day={leadingZeros(dayNumber)} class="day" />);
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
  render: function() {
    return (
      <time dateTime={this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day)} className={this.props.class}>
          <span className="day-label">{this.props.day}</span>
      </time>
    );
  }
});

$(function() {
  ReactDOM.render(
    <CalendarYear year="2016" month="06" />,
    document.getElementById('calendarView')
  );
});
