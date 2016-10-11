import React                          from 'react';
import { render }                     from 'react-dom';
import { connect }                    from 'react-redux';
import { loadData, goto, setViewDay } from './StateMachineDefinitions.js';
import { VIEW_STATE }                 from './StateMachineDefinitions.js';
import ViewCalendarUpcoming           from './ViewCalendarUpcoming.jsx';

// This generates ContainerApplication, which passes the store's state onto Application, its child component.

const mapStateToProps = function(state)
{
  return {
    data: state.data
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    loadDataIntoStateMachine: (data) => {
      dispatch(loadData(data));
    }
  }
}

const ContainerCalendarUpcoming = connect(mapStateToProps, mapDispatchToProps)(ViewCalendarUpcoming);

export default ContainerCalendarUpcoming;