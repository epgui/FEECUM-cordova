// Import state machine actions
import { LOAD_DATA,
         GOTO_VIEW,
         SET_CALENDAR_PAGE,
         SET_VIEW_DAY,
         SET_VIEW_EVENT_ID,
         SAVE_EVENT_TO_DEVICE_CALENDAR,
         REMOVE_EVENT_FROM_DEVICE_CALENDAR } from './StateMachineDefinitions.js';
// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';


export function ViewStateMachine(state = VIEW_STATE.CALENDAR_MONTH, action)
{
  switch (action.type)
  {
    case GOTO_VIEW:
      return action.viewState;
    default:
      return state;
  }
}

export function TimeStateMachine(state = {}, action)
{
  switch (action.type)
  {
    case SET_CALENDAR_PAGE:
      return {
        ...state,
        calYear: action.calYear,
        calMonth: action.calMonth
      };
    case SET_VIEW_DAY:
      return {
        ...state,
        viewDay: action.viewDay
      };
    case SET_VIEW_EVENT_ID:
      return {
        ...state,
        viewEventID: action.viewEventID
      };
    default:
      return state;
  }
}

export function DataStateMachine(state = [], action)
{
  switch (action.type)
  {
    case LOAD_DATA:
      return [
        ...state,
        {
          events: action.data.events,
          year: action.data.calYear,
          month: action.data.calMonth
        }
      ];
    default:
      return state;
  }
}

export function SavedEventsRegister(state = [], action)
{
  switch(action.type)
  {
    case SAVE_EVENT_TO_DEVICE_CALENDAR:
      return [
        ...state,
        action.eventID
      ];
    case REMOVE_EVENT_FROM_DEVICE_CALENDAR:
      return state.filter(id => id !== action.eventID);
    default:
      return state;
  }
}
