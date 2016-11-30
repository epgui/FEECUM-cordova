import React                     from 'react';
import ContainerCalendarMonth    from './ContainerCalendarMonth.jsx';
import ContainerCalendarDay      from './ContainerCalendarDay.jsx';
import ContainerCalendarUpcoming from './ContainerCalendarUpcoming.jsx';
import { VIEW_STATE }            from './StateMachineDefinitions.js';

var ViewCalendar = React.createClass(
{
  componentWillMount: function()
  {
    this.storage = window.localStorage;
    if (this.storage.getItem("earliestMonthOnRecord") != null)
    {
      this.earliestMonthOnRecord = JSON.parse(this.storage.getItem("earliestMonthOnRecord"));
    }
    else
    {
      this.earliestMonthOnRecord = { "year" : this.props.year, "month" : this.props.month };
      this.storage.setItem("earliestMonthOnRecord", this.earliestMonthOnRecord);
    }
    if (this.storage.getItem("latestMonthOnRecord") != null)
    {
      this.latestMonthOnRecord = JSON.parse(this.storage.getItem("latestMonthOnRecord"));
    }
    else
    {
      this.latestMonthOnRecord = { "year" : this.props.year, "month" : this.props.month };
      this.storage.setItem("latestMonthOnRecord", this.latestMonthOnRecord);
    }
  },

  componentDidMount: function()
  {
    this.pannable = document.getElementById("spring-calendar");
    this.setupSpring();
    this.setupPan();
  },

  componentDidUpdate: function()
  {
    this.changePage = null;
    this.pannable.style.left = "0px";
    this.spring.setCurrentValue(0).setAtRest();
  },

  componentWillUnmount: function()
  {
    this.removeSpring();
    this.removePan();
  },

  getDeviceWidth: function()
  {
    return Math.max(document.documentElement["clientWidth"],
                    document.body["scrollWidth"],
                    document.documentElement["scrollWidth"],
                    document.body["offsetWidth"],
                    document.documentElement["offsetWidth"]);
  },

  setupSpring: function()
  {
    this.viewportWidth = this.getDeviceWidth();
    this.changePage = null;

    var springSystem = new rebound.SpringSystem();
    this.spring = springSystem.createSpring(100, 15);
    this.spring.setEndValue(0);

    this.spring.addListener(
    {
      onSpringUpdate: function(spring)
      {
        var val = spring.getCurrentValue();
        val = rebound.MathUtil.mapValueInRange(val, 0, 1, 0, this.viewportWidth);
        this.slideCalendar(val);
      }.bind(this),

      onSpringAtRest: function()
      {
        switch (this.changePage)
        {
          case "previous":
            var previousMonthYear = previousMonthYearNumber(this.props.year, this.props.month);
            var previousMonth = previousMonthNumber(this.props.month);
            this.props.switchPage(previousMonthYear, previousMonth);
            break;
          case "next":
            var nextMonthYear = nextMonthYearNumber(this.props.year, this.props.month);
            var nextMonth = nextMonthNumber(this.props.month);
            this.props.switchPage(nextMonthYear, nextMonth);
            break;
          default:
            break;
        }
      }.bind(this)
    });
  },

  slideCalendar: function(val)
  {
    this.pannable.style.left = val + "px";
  },

  removeSpring: function()
  {
    this.spring.destroy();
  },

  setupPan: function()
  {
    this.touchControl = new Hammer.Manager(this.pannable);

    var panOptions = {
      event: 'pan',
      pointers: 0,
      threshold: 0,
      direction: Hammer.DIRECTION_HORIZONTAL
    }

    this.touchControl.add(new Hammer.Pan(panOptions));
    this.touchControl.get('pan').set({ enable: true });
    this.touchControl.on("panleft panright", this.pan);
    this.touchControl.on("panend pancancel", this.panSpring);
  },

  removePan: function()
  {
    this.touchControl.off('pan', this.pan);
  },

  pan: function(event)
  {
    var panDistance = event.deltaX / this.viewportWidth;
    this.spring.setCurrentValue(panDistance).setAtRest();
    this.panDistance = this.pannable.style.left.slice(0, -2);
    event.srcEvent.preventDefault();
  },

  panSpring: function(event)
  {
    if (Math.abs(this.panDistance) / this.viewportWidth < 0.5)
    {
      this.spring.setEndValue(0);
      return false;
    }
    else
    {
      if (this.panDistance > 0)
      {
        this.spring.setEndValue(1);
        this.changePage = "previous";
        return false;
      }
      else
      {
        this.spring.setEndValue(-1);
        this.changePage = "next";
        return false;
      }
    }
  },

  getDisplayMode: function(year, month)
  {
    var calYear           = this.props.year;
    var calMonth          = this.props.month;
    var previousMonthYear = previousMonthYearNumber(calYear, calMonth);
    var nextMonthYear     = nextMonthYearNumber(calYear, calMonth);
    var previousMonth     = previousMonthNumber(calMonth);
    var nextMonth         = nextMonthNumber(calMonth);

    if ( (year == calYear) && (month == calMonth) )
    {
      return "current-month";
    }
    else if ( (year == previousMonthYear) && (month == previousMonth) )
    {
      return "previous-month";
    }
    else if ( (year == nextMonthYear) && (month == nextMonth) )
    {
      return "next-month";
    }
    else
    {
      return "hidden";
    }
  },

  needToLoadEarlierMonth: function(year, month)
  {
    return ( (this.isDisplayed(year, month)) &&
             (year == this.earliestMonthOnRecord.year) &&
             (month == this.earliestMonthOnRecord.month) ) ? true : false;
  },

  needToLoadLaterMonth: function(year, month)
  {
    return ( (this.isDisplayed(year, month)) &&
             (year == this.latestMonthOnRecord.year) &&
             (month == this.latestMonthOnRecord.month) ) ? true : false;
  },

  isDisplayed: function(year, month)
  {
    return ((year == this.props.year) && (month == this.props.month)) ? true : false;
  },

  render: function()
  {
    var year  = this.props.year;
    var month = this.props.month;
    var today = new Date();
    var today = today.getDate();

    var calendarPages = [];
    var upcomingEvents  = [];

    if (this.props.viewMode == 'calendar-month')
    {
      if (this.props.data.length < 3)
      {
        var previousKey = "" + previousMonthYearNumber(year, month) + leadingZeros(previousMonthNumber(month));
        var currentKey  = "" + year + leadingZeros(month);
        var nextKey     = "" + nextMonthYearNumber(year, month) + leadingZeros(nextMonthNumber(month));
        calendarPages.push([
          <ContainerCalendarMonth key={previousKey} year={previousMonthYearNumber(year)} month={leadingZeros(previousMonthNumber(month))} viewMode={this.props.viewMode} displayMode={'previous-month'} />,
          <ContainerCalendarMonth key={currentKey} year={year} month={month} viewMode={this.props.viewMode} displayMode={'current-month'} />,
          <ContainerCalendarMonth key={nextKey} year={nextMonthYearNumber(year)} month={leadingZeros(nextMonthNumber(month))} viewMode={this.props.viewMode} displayMode={'next-month'} />
        ]);
        this.earliestMonthOnRecord.year  = previousMonthYearNumber(year, month);
        this.earliestMonthOnRecord.month = previousMonthNumber(month);
        this.latestMonthOnRecord.year    = nextMonthYearNumber(year, month);
        this.latestMonthOnRecord.month   = nextMonthNumber(month);
        this.storage.setItem("earliestMonthOnRecord", JSON.stringify(this.earliestMonthOnRecord));
        this.storage.setItem("latestMonthOnRecord", JSON.stringify(this.latestMonthOnRecord));
      }
      else
      {
        var renderEarlierPage = false;
        var renderLaterPage = false;

        for (var i = 0; i < this.props.data.length; i++)
        {
          var keyYear  = this.props.data[i].year;
          var keyMonth = leadingZeros(this.props.data[i].month);
          var key      = "" + keyYear + keyMonth;
          var displayMode = this.getDisplayMode(keyYear, keyMonth);

          calendarPages.push(
            <ContainerCalendarMonth key={key} year={keyYear} month={keyMonth} viewMode={this.props.viewMode} displayMode={displayMode} />
          );

          if (this.needToLoadEarlierMonth(keyYear, keyMonth))
          {
            renderEarlierPage = {
              "year" : previousMonthYearNumber(keyYear, keyMonth),
              "month" : leadingZeros(previousMonthNumber(keyMonth)),
              "displayMode" : "previous-month"
            };
          }
          if (this.needToLoadLaterMonth(keyYear, keyMonth))
          {
            renderLaterPage = {
              "year" : nextMonthYearNumber(keyYear, keyMonth),
              "month" : leadingZeros(nextMonthNumber(keyMonth)),
              "displayMode" : "next-month"
            };
          }
        }

        if (renderEarlierPage != false)
        {
          this.earliestMonthOnRecord.year  = renderEarlierPage.year;
          this.earliestMonthOnRecord.month = renderEarlierPage.month;
          this.storage.setItem("earliestMonthOnRecord", JSON.stringify(this.earliestMonthOnRecord));

          calendarPages.push(
            <ContainerCalendarMonth
              key={"" + renderEarlierPage.year + renderEarlierPage.month}
              year={renderEarlierPage.year}
              month={renderEarlierPage.month}
              viewMode={this.props.viewMode}
              displayMode={renderEarlierPage.displayMode}
            />
          );
        }

        if (renderLaterPage != false)
        {
          this.latestMonthOnRecord.year  = renderLaterPage.year;
          this.latestMonthOnRecord.month = renderLaterPage.month;
          this.storage.setItem("latestMonthOnRecord", JSON.stringify(this.latestMonthOnRecord));

          calendarPages.push(
            <ContainerCalendarMonth
              key={"" + renderLaterPage.year + renderLaterPage.month}
              year={renderLaterPage.year}
              month={renderLaterPage.month}
              viewMode={this.props.viewMode}
              displayMode={renderLaterPage.displayMode}
            />
          );
        }
      }

      upcomingEvents.push(
        <ContainerCalendarUpcoming
          key={3}
          year={year}
          month={month}
          day={leadingZeros(today)}
          viewMode={VIEW_STATE.CALENDAR_DAY}
          class="day"
        />
      );
    }
    if (this.props.viewMode == 'calendar-day')
    {
      calendarPages.push(
        <ContainerCalendarDay
          key={1}
          year={this.props.year}
          month={leadingZeros(this.props.month)}
          day={leadingZeros(this.props.day)}
          viewMode={this.props.viewMode}
          class="day"
        />
      );
    }

    return (
      <div id="view-calendar-and-upcoming-events">
        <div id="view-calendar">
          <time id="spring-calendar" dateTime={year} className="year">
            {calendarPages}
          </time>
          <script type="text/javascript" src="js/calendarMotion.js" />
        </div>
        <div id="view-upcoming-events">
          {upcomingEvents}
        </div>
      </div>
    );
  }
});

export default ViewCalendar;
