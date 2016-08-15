var CalendarYear = React.createClass({
  render: function(){
    var calendarMonths = [];

    for (var i = 0; i < parseInt(this.props.month); i++ ){
      var monthNumber = i + 1;
      if (monthNumber == parseInt(this.props.month))
      {
        calendarMonths.push(<CalendarMonth key={i} year={this.props.year} month={monthNumber} url={"http://feecum.ca/dev/backend.php?year=" + this.props.year + "&month=" + monthNumber} />);
      }
      else
      {
        //calendarMonths.push(<CalendarMonth key={i} year={this.props.year} month={monthNumber} url={"http://feecum.ca/dev/backend.php?year=" + this.props.year + "&month=" + monthNumber} isElementHidden={1} />);
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
  loadEventsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
        console.warn(xhr.responseText);
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadEventsFromServer();
    //setInterval(this.loadEventsFromServer, 5000); // Check for new events every 5 seconds
  },
  render: function(){
    var monthName        = monthNumber(parseInt(this.props.month) - 1)
    var firstDay         = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var calendarWeeks    = [];
    var displayClass     = "";

    for (var i = 0; i < weeksInMonth; i++){
      calendarWeeks.push(<CalendarWeek key={i} year={this.props.year} month={this.props.month} week={indexOfFirstWeek + i} data={this.state.data} />);
    }

    if (this.props.isElementHidden == 1){
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
  render: function(){
    var firstDay         = new Date(this.props.year, this.props.month - 1, 1);
    var weeksInMonth     = firstDay.countWeeksOfMonth();
    var indexOfFirstWeek = firstDay.getWeekNumber();
    var indexOfFirstDay  = firstDay.getDay();
    var indexOfLastDay   = new Date(this.props.year, this.props.month, 0).getDay();
    var lastMonthStart   = new Date(this.props.year, this.props.month - 1, 0).getDate() - (indexOfFirstDay - 1);
    var weekDays         = [];
    var dayNumber        = 0;

    for (var i = 0; i <= 6; i++) {
      if (((this.props.week - indexOfFirstWeek) == 0) && (i < (indexOfFirstDay))) {
        dayNumber = lastMonthStart + i;
        weekDays.push(<CalendarDay key={i} year={previousMonthYearNumber(this.props.year, this.props.month)} month={leadingZeros(previousMonthNumber(this.props.month))} day={leadingZeros(dayNumber)} data={this.props.data} class="day previous-month" />);
      }
      else if ((this.props.week - indexOfFirstWeek + 1) == weeksInMonth && i > indexOfLastDay) {
        dayNumber = i - indexOfLastDay;
        weekDays.push(<CalendarDay key={i} year={nextMonthYearNumber(this.props.year, this.props.month)} month={leadingZeros(nextMonthNumber(this.props.month))} day={leadingZeros(dayNumber)} data={this.props.data} class="day next-month" />);
      }
      else {
        dayNumber = ((this.props.week - indexOfFirstWeek) * 7) + (i + 1) - indexOfFirstDay;
        weekDays.push(<CalendarDay key={i} year={this.props.year} month={leadingZeros(this.props.month)} day={leadingZeros(dayNumber)} data={this.props.data} class="day" />);
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
  render: function(){

    var thisDate = new Date(this.props.year, this.props.month - 1, this.props.day);
    thisDate.setHours(0, 0, 0, 0);

    var eventsForThisDate = [];

    if ("events" in this.props.data)
    {
      $.each(this.props.data.events, function(i, item) {

        var eventDate = new Date(item.t_start);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate.getTime() == thisDate.getTime())
        {
          eventsForThisDate.push(item);
        }
      });
    }

    return (
      <time dateTime={this.props.year + "-" + leadingZeros(this.props.month) + "-" + leadingZeros(this.props.day)} className={this.props.class}>
          <span className="day-label">{this.props.day}</span>
          <span className="day-label">{JSON.stringify(eventsForThisDate)}</span>
      </time>
    );
  }
});

$(function(){
  var year  = 2016;
  var month = 9;
  ReactDOM.render(
    <CalendarYear year={year} month={leadingZeros(month)} />,
    document.getElementById('calendarView')
  );
});
