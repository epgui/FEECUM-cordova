import React from 'react';
import { render } from 'react-dom';
import ViewCalendar from './ViewCalendar.jsx';
import ViewEvent from './ViewEvent.jsx';
import ViewSettings from './ViewSettings.jsx';
import ViewControls from './ViewControls.jsx';

class ViewApplication extends React.Component
{
render()
  {
    var views = [];
    var controls = [];

    switch (this.props.view)
    {
      case 'calendar-month':
        views.push(<ViewCalendar
                     key={1}
                     year={this.props.year}
                     month={this.props.month}
                   />);
      case 'event-details':
        views.push(<ViewEvent
                     key={2}
                     eventData={null}
                     isElementHidden={(this.props.view != 'event-details')}
                   />);
      case 'settings-panel':
        views.push(<ViewSettings
                     key={3}
                     isElementHidden={(this.props.view != 'settings-panel')}
                   />);
    }

    controls.push(<ViewControls key={1} view={this.props.view} />);

    return (
      <div id="interface">
        {controls}
        <div id="views">
          {views}
        </div>
      </div>
    );
  }
}

export default ViewApplication;
