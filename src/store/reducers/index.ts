// ** Redux Imports
import { combineReducers } from 'redux';
// ** Reducers Imports
import {buildReducer} from './build.reducer'

const rootReducer = combineReducers({
  builds: buildReducer,
});

export default rootReducer;
