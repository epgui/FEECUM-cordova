import React                          from 'react';
import { render }                     from 'react-dom';
import { connect }                    from 'react-redux';
import { loadData, goto, setViewDay } from './StateMachineDefinitions.js';
import { VIEW_STATE }                 from './StateMachineDefinitions.js';
import ViewCalendarDay                from './ViewCalendarDay.jsx';

// This generates ContainerApplication, which passes the store's state onto Application, its child component.

const mapStateToProps = function(state)
{
  return {
    data: state.data
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    viewEventsForThisDay: (thisDay) => {
      dispatch(setViewDay(thisDay));
      dispatch(goto(VIEW_STATE.CALENDAR_DAY));
    },
    exitDayMode: () => {
      dispatch(goto(VIEW_STATE.CALENDAR_MONTH));
    }
  }
}

const ContainerCalendarDay = connect(mapStateToProps, mapDispatchToProps)(ViewCalendarDay);

export default ContainerCalendarDay;
