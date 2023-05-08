// ** Redux Imports
import { combineReducers } from "redux";
// ** Reducers Imports
import { buildReducer } from "./build.reducer";
import { flashCardReducer } from "./flashCard.reducer";
import { videoCardReducer } from "./videoCard.reducer";
import { awarenessReducer } from "./awareness.reducer";
import { userReducer } from "./user.reducer";
import {groupReducer} from "./group.reducer";
const rootReducer = combineReducers({
  builds: buildReducer,
  flashCards: flashCardReducer,
  VideoCards: videoCardReducer,
  boxReviews: awarenessReducer,
  users: userReducer,
  groups:groupReducer,
});

export default rootReducer;
