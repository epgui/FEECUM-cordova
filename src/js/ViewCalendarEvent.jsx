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

    DeviceCalendar.add(event, firstReminder, secondReminder, this.props.saveEventToRegister(this.props.id));

  },


  findEvent: function(callback)
  {
    event = DeviceCalendar.constructEvent(this.props.title,
                                          this.props.tStart,
                                          this.props.tEnd,
                                          this.props.description);

    DeviceCalendar.find(event, callback);

  },


  deleteEvent: function()
  {

    event = DeviceCalendar.constructEvent(this.props.title,
                                          this.props.tStart,
                                          this.props.tEnd,
                                          this.props.description);

    DeviceCalendar.remove(event);
    this.props.removeEventFromRegister(this.props.id);

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

    if ((eventStartTime == "0h00") && (eventEndTime == "23h59"))
    {
      var eventTime = <span className="event-time">{"Toute la journée"}</span>;
    }
    else
    {
      var eventTime = <span className="event-time"><span>{eventStartTime}</span>{" - "}<span>{eventEndTime}</span></span>;
    }


    var addToCalendar = () => this.addToCalendar();
    var deleteEvent = () => this.deleteEvent();

    var button = null;

    if (this.props.eventSaved === true) {
      button = <span className="button remove-event" onClick={deleteEvent}>Retirer</span>;
    }
    else
    {
      button = <span className="button add-event" onClick={addToCalendar}>Ajouter</span>;
    }

    /*
    this.findEvent(function(foundEvent) {
      if ((foundEvent.length > 0) && (this.props.eventSaved == false))
      {
        this.props.saveEventToRegister(this.props.id);
      }
    }.bind(this)); */

    return(
      <li className="event-container" id={"eventID-" + this.props.id}>
        {eventTime}
        <span className="event-title">{this.props.title}</span>
        <span className="event-category">{this.props.category}</span>
        <p className="event-description" dangerouslySetInnerHTML={this.formatHTML(this.props.description)}></p>
        {button}
      </li>
    );
  }
});

export default ViewCalendarEvent;
