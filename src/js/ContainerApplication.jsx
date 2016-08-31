import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setCalendarPage } from './StateMachineDefinitions.js';
import ViewApplication from './ViewApplication.jsx';

// This generates ContainerApplication, which passes the store's state onto Application, its child component.

const mapStateToProps = function(state)
{
  return {
    error: state.error,
    view:  state.view,
    year:  state.setTime.calYear,
    month: state.setTime.calMonth
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    switchPage: (calYear, calMonth) => {
      dispatch(setCalendarPage(calYear, calMonth));
    }
  }
}

const ContainerApplication = connect(mapStateToProps, mapDispatchToProps)(ViewApplication);

export default ContainerApplication;
