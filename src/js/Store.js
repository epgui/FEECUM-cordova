import { createStore } from 'redux';
import { StateMachine } from './StateMachine.js';

export const store = createStore(StateMachine);
