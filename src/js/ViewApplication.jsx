import React          from 'react';
import { render }     from 'react-dom';
import ViewCalendar   from './ViewCalendar.jsx';
import ViewEvent      from './ViewEvent.jsx';
import ViewSettings   from './ViewSettings.jsx';
import ViewControls   from './ViewControls.jsx';
import { VIEW_STATE } from './StateMachineDefinitions.js';

class ViewApplication extends React.Component
{
render()
  {
    var views = [];
    var controls = [];

    switch (this.props.view)
    {
      case VIEW_STATE.CALENDAR_MONTH:
        views.push(<ViewCalendar
                     key={1}
                     year={this.props.setTime.calYear}
                     month={this.props.setTime.calMonth}
                     viewMode={this.props.view}
                   />);
        break;
      case VIEW_STATE.CALENDAR_DAY:
        views.push(<ViewCalendar
                     key={2}
                     year={this.props.setTime.calYear}
                     month={this.props.setTime.calMonth}
                     day={this.props.setTime.viewDay}
                     viewMode={this.props.view}
                   />);
        break;
      case VIEW_STATE.EVENT_DETAILS:
        views.push(<ViewEvent
                     key={3}
                     eventData={null}
                     isElementHidden={true}
                   />);
        break;
      case VIEW_STATE.SETTINGS_PANEL:
        views.push(<ViewSettings
                     key={4}
                     isElementHidden={true}
                   />);
    }

    controls.push(<ViewControls
                    key={1}
                    year={this.props.setTime.calYear}
                    month={this.props.setTime.calMonth}
                    viewMode={this.props.view}
                    switchPage={this.props.switchPage}
                    exitDayMode={this.props.exitDayMode}
                  />);

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
