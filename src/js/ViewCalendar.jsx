import React                     from 'react';
import ContainerCalendarMonth    from './ContainerCalendarMonth.jsx';
import ContainerCalendarDay      from './ContainerCalendarDay.jsx';
import ContainerCalendarUpcoming from './ContainerCalendarUpcoming.jsx';
import { VIEW_STATE }            from './StateMachineDefinitions.js';

var ViewCalendar = React.createClass(
{
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
    this.touchControl.on("panend pancancel", this.panSpring)
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
      calendarPages.push(<ContainerCalendarMonth
                           key={1}
                           year={previousMonthYearNumber(year, month)}
                           month={previousMonthNumber(month)}
                           viewMode={this.props.viewMode}
                           displayMode={"previous-month"}
                         />);
      calendarPages.push(<ContainerCalendarMonth
                           key={2}
                           year={year}
                           month={month}
                           viewMode={this.props.viewMode}
                           displayMode={"current-month"}
                         />);
      calendarPages.push(<ContainerCalendarMonth
                           key={3}
                           year={nextMonthYearNumber(year, month)}
                           month={nextMonthNumber(month)}
                           viewMode={this.props.viewMode}
                           displayMode={"next-month"}
                         />);

      var title    = "Prochains évènements";
      var subtitle = "Plus tard aujourd'hui";

      upcomingEvents.push(<span key={1} className="title">{title}</span>);
      upcomingEvents.push(<span key={2} className="subtitle">{subtitle}</span>);

      upcomingEvents.push(<ContainerCalendarUpcoming
                            key={3}
                            year={year}
                            month={month}
                            day={leadingZeros(today)}
                            viewMode={VIEW_STATE.CALENDAR_DAY}
                            class="day"
                          />);
    }
    if (this.props.viewMode == 'calendar-day')
    {
      calendarPages.push(<ContainerCalendarDay
                           key={1}
                           year={this.props.year}
                           month={leadingZeros(this.props.month)}
                           day={leadingZeros(this.props.day)}
                           viewMode={this.props.viewMode}
                           class="day"
                         />);
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
