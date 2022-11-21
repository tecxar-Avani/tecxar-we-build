// ** Redux Imports
import { combineReducers } from 'redux';
// ** Reducers Imports
import {buildReducer} from './build.reducer'
import { flashCardReducer } from './flashCard.reducer';

const rootReducer = combineReducers({
  builds: buildReducer,
  flashCards: flashCardReducer,
});

export default rootReducer;
