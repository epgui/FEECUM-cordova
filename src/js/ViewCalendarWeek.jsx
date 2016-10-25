import React                from 'react';
import ContainerCalendarDay from './ContainerCalendarDay.jsx';

var ViewCalendarWeek = React.createClass(
{
  render: function()
  {
    var weekdayClass     = ["weekend", "weekday", "weekday", "weekday", "weekday", "weekday", "weekend"];
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
      // For the first calendar week of the month
      if (((this.props.week - indexOfFirstWeek) == 0) && (i < (indexOfFirstDay)))
      {
        dayNumber = lastMonthStart + i;

        weekDays.push(<ContainerCalendarDay
                        key={i}
                        year={previousMonthYearNumber(this.props.year, this.props.month)}
                        month={leadingZeros(previousMonthNumber(this.props.month))}
                        day={leadingZeros(dayNumber)}
                        viewMode={this.props.viewMode}
                        class={"day previous-month " + weekdayClass[i]}
                      />);
      }
      // For the last calendar weeks of the month
      else if (((this.props.week - indexOfFirstWeek + 1) == weeksInMonth && i > indexOfLastDay) ||
               ((this.props.week - indexOfFirstWeek + 1) > weeksInMonth))
      {
        if ((this.props.week - indexOfFirstWeek + 1) == weeksInMonth)
        {
          dayNumber = i - indexOfLastDay;
        }
        else
        {
          dayNumber = i - indexOfLastDay + 7;
        }

        weekDays.push(<ContainerCalendarDay
                        key={i}
                        year={nextMonthYearNumber(this.props.year, this.props.month)}
                        month={leadingZeros(nextMonthNumber(this.props.month))}
                        day={leadingZeros(dayNumber)}
                        viewMode={this.props.viewMode}
                        class={"day next-month " + weekdayClass[i]}
                      />);
      }
      // For all other weeks of the month
      else
      {
        dayNumber = ((this.props.week - indexOfFirstWeek) * 7) + (i + 1) - indexOfFirstDay;

        weekDays.push(<ContainerCalendarDay
                        key={i}
                        year={this.props.year}
                        month={leadingZeros(this.props.month)}
                        day={leadingZeros(dayNumber)}
                        viewMode={this.props.viewMode}
                        class={"day " + weekdayClass[i]}
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

export default ViewCalendarWeek;
