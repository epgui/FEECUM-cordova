import React                     from 'react';
import ContainerCalendarMonth    from './ContainerCalendarMonth.jsx';
import ContainerCalendarDay      from './ContainerCalendarDay.jsx';
import ContainerCalendarUpcoming from './ContainerCalendarUpcoming.jsx';
import { VIEW_STATE }            from './StateMachineDefinitions.js';

var ViewCalendar = React.createClass(
{
  pan: function(event)
  {
    var elementToPan = document.getElementById("view-calendar");

    elementToPan.style.left = event.deltaX + "px";
    event.srcEvent.preventDefault();
  },

  componentDidMount: function()
  {
    this.touchControl = new Hammer.Manager(document.getElementById("view-calendar"));

    var panOptions = {
      event: 'pan',
      pointers: 0,
      threshold: 0,
      direction: Hammer.DIRECTION_HORIZONTAL
    }

    this.touchControl.add(new Hammer.Pan(panOptions));
    this.touchControl.get('pan').set({ enable: true });
    this.touchControl.on("panleft panright", this.pan);
  },

  componentWillUnmount: function()
  {
    console.log("unmounted");
    this.touchControl.off('pan', this.pan);
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
                           year={year}
                           month={month}
                           viewMode={this.props.viewMode}
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
          <time dateTime={year} className="year">
            {calendarPages}
          </time>
        </div>
        <div id="view-upcoming-events">
          {upcomingEvents}
        </div>
      </div>
    );
  }
});

export default ViewCalendar;
