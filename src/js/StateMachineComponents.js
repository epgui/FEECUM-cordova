// Import state machine actions
import { LOAD_DATA, GOTO_VIEW, SET_CALENDAR_PAGE, SET_VIEW_DAY, SET_VIEW_EVENT_ID } from './StateMachineDefinitions.js';
// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';


export function ViewStateMachine(state = VIEW_STATE.CALENDAR_MONTH, action)
{
  switch (action.type)
  {
    case GOTO_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    default:
      return state;
  }
}

export function DataStateMachine(state = {}, action)
{
  switch (action.type)
  {
    case LOAD_DATA:
      return [
        ...state.data,
        {
          events: action.data.events,
          year: state.setTime.calYear,
          month: state.setTime.calMonth
        }
      ];
    default:
      return state;
  }
}

export function TimeStateMachine(state = {}, action)
{
  switch (action.type)
  {
    case SET_CALENDAR_PAGE:
      return Object.assign({}, state, {
        calYear: action.calYear,
        calMonth: action.calMonth
      });
    case SET_VIEW_DAY:
      return Object.assign({}, state, {
        viewDay: action.calDay
      });
    case SET_VIEW_EVENT_ID:
      return Object.assign({}, state, {
        viewEventID: action.viewEventID
      });
    default:
      return state;
  }
}
