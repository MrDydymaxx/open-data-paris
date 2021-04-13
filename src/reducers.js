import { combineReducers } from 'redux';

import tasks from './components/home/tasks/reducer';
import inputAdd from './components/home/input-add/reducer';

export default combineReducers({
  tasks,
  inputAdd,
});
