// Import state machine components
import { ViewStateMachine, DataStateMachine, TimeStateMachine, SavedEventsRegister } from './StateMachineComponents.js';
// Import state machine actions
import { LOAD_DATA, GOTO_VIEW, SET_CALENDAR_PAGE, SET_VIEW_DAY, SET_VIEW_EVENT_ID } from './StateMachineDefinitions.js';
// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';


// Get current date
var today = new Date();


// Initialize application state
export const initialState = {
  error: false,
  view: VIEW_STATE.CALENDAR_MONTH,
  setTime: {
    calYear: today.getFullYear(),
    calMonth: today.getMonth() + 1,
    viewDay: 1,
    viewEventID: null
  },
  data: [],
  savedEventsRegister: []
};


// The state machines are just Redux reducers
export function StateMachine(state = initialState, action)
{
  return {
    error:               false,
    view:                ViewStateMachine(state.view, action),
    setTime:             TimeStateMachine(state.setTime, action),
    data:                DataStateMachine(state.data, action),
    savedEventsRegister: SavedEventsRegister(state.savedEventsRegister, action)
  }
}
