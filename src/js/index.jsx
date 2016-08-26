import React from 'react';
import {render} from 'react-dom';

import ViewCalendar from './ViewCalendar.jsx';
import ViewEvent from './ViewEvent.jsx';
import ViewSettings from './ViewSettings.jsx';

class CalendarApplication extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      error: false,
      view: 'calendar-month' // Possible values for view: ['calendar-month', 'event-details', 'settings-panel']
    };
  }

  render()
  {
    var views = [];
    var controls = [];

    views.push(<ViewCalendar
                 year={this.props.year}
                 month={this.props.month}
                 isElementHidden={(this.state.view != 'calendar-month')}
               />);

    views.push(<ViewEvent
                 eventData={null}
                 isElementHidden={(this.state.view != 'event-details')}
               />);

    views.push(<ViewSettings
                 isElementHidden={(this.state.view != 'settings-panel')}
               />);

    return (
      <div>
      <div id="controls">
        <h1>Calendrier de la FÉÉCUM</h1>
      </div>
      <div id="views">
        {views}
      </div>
      </div>
    );
  }
}

$(function()
{
  var year  = 2016;
  var month = 9;
  render(
    <CalendarApplication year={year} month={leadingZeros(month)} />,
    document.getElementById('app')
  );
});
