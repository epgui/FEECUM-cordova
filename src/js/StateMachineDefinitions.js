// Define all possible view states
export const VIEW_STATE = {
  CALENDAR_MONTH: 'calendar-month',
  CALENDAR_DAY:   'calendar-day',
  EVENT_DETAILS:  'event-details',
  SETTINGS_PANEL: 'settings-panel'
};


// Define all possible action types
export const LOAD_DATA         = 'load-data';
export const GOTO_VIEW         = 'goto-view';
export const SET_CALENDAR_PAGE = 'set-calendar-page';
export const SET_VIEW_DAY      = 'set-view-day';
export const SET_VIEW_EVENT_ID = 'set-view-event-id';


// Define action creators
export function loadData(data) {
  return { type: LOAD_DATA, data };
}

export function goto(viewState) {
  return { type: GOTO_VIEW, viewState };
}

export function setCalendarPage(calYear, calMonth) {
  return { type: SET_CALENDAR_PAGE, calYear, calMonth };
}

export function setViewDay(viewDay) {
  return { type: SET_VIEW_DAY, viewDay };
}

export function setViewEventID(viewEventID) {
  return { type: SET_VIEW_EVENT_ID, viewEventID };
}
