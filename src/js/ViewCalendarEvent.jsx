import React          from 'react';
import { VIEW_STATE } from './StateMachineDefinitions.js';
import DeviceCalendar from './DeviceCalendar.js';

var ViewCalendarEvent = React.createClass(
{

  addToCalendar: function(firstReminder = 60, secondReminder = null)
  {

    event = DeviceCalendar.constructEvent(this.props.title,
                                          this.props.tStart,
                                          this.props.tEnd,
                                          this.props.description);

    DeviceCalendar.add(event, firstReminder, secondReminder);

  },


  findEvent: function()
  {
    event = DeviceCalendar.constructEvent(this.props.title,
                                          this.props.tStart,
                                          this.props.tEnd,
                                          this.props.description);

    return DeviceCalendar.find(event) ? true : false;
  },


  deleteEvent: function()
  {

    event = DeviceCalendar.constructEvent(this.props.title,
                                          this.props.tStart,
                                          this.props.tEnd,
                                          this.props.description);
    DeviceCalendar.find(event);

  },


  openCalendar: function()
  {

    var year  = this.props.tStart.getYear();
    var month = this.props.tStart.getMonth();
    var day   = this.props.tStart.getDay();

    DeviceCalendar.openDeviceCalendar(year, month, day);

  },


  formatHTML: function(htmlString)
  {
    return { __html: htmlString };
  },


  render: function()
  {
    var eventStartTime = this.props.tStart.getHours() + "h" + leadingZeros(this.props.tStart.getMinutes());
    var eventEndTime   = this.props.tEnd.getHours()   + "h" + leadingZeros(this.props.tEnd.getMinutes());

    var addToCalendar = () => this.addToCalendar();
    var deleteEvent = () => this.deleteEvent();

    if (this.findEvent())
    {
      return(
        <li className="event-container" id={"eventID-" + this.props.id}>
          <span className="event-time">
            <span>{eventStartTime}</span> - <span>{eventEndTime}</span>
          </span>
          <span className="event-title">{this.props.title}</span>
          <span className="event-category">{this.props.category}</span>
          <p className="event-description" dangerouslySetInnerHTML={this.formatHTML(this.props.description)}></p>
          <span className="button remove-event" onClick={deleteEvent}>Retirer</span>
        </li>
      );
    }
    else
    {
      return(
        <li className="event-container" id={"eventID-" + this.props.id}>
          <span className="event-time">
            <span>{eventStartTime}</span> - <span>{eventEndTime}</span>
          </span>
          <span className="event-title">{this.props.title}</span>
          <span className="event-category">{this.props.category}</span>
          <p className="event-description" dangerouslySetInnerHTML={this.formatHTML(this.props.description)}></p>
          <span className="button add-event" onClick={addToCalendar}>Ajouter</span>
        </li>
      );
    }
  }
});

export default ViewCalendarEvent;
