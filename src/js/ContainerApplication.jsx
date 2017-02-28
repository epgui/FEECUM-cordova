import React                             from 'react';
import { render }                        from 'react-dom';
import { connect }                       from 'react-redux';
import { setCalendarPage,
         goto,
         setViewDay,
         saveEventToDeviceCalendar,
         removeEventFromDeviceCalendar } from './StateMachineDefinitions.js';
import { VIEW_STATE }                    from './StateMachineDefinitions.js';
import ViewApplication                   from './ViewApplication.jsx';

// This generates ContainerApplication, which passes the store's state onto Application, its child component.

const mapStateToProps = function(state)
{
  return {
    error:               state.error,
    view:                state.view,
    data:                state.data,
    savedEventsRegister: state.savedEventsRegister,
    setTime: {
      calYear:           state.setTime.calYear,
      calMonth:          state.setTime.calMonth,
      viewDay:           state.setTime.viewDay
    }
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    switchPage: (calYear, calMonth) => {
      dispatch(setCalendarPage(calYear, calMonth));
    },
    exitDayMode: () => {
      dispatch(goto(VIEW_STATE.CALENDAR_MONTH));
    },
    saveEventToRegister: (eventID) => {
      dispatch(saveEventToDeviceCalendar(eventID));
    },
    removeEventFromRegister: (eventID) => {
      dispatch(removeEventFromDeviceCalendar(eventID));
    }
  }
}

const ContainerApplication = connect(mapStateToProps, mapDispatchToProps)(ViewApplication);

export default ContainerApplication;
