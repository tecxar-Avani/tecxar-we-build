// ** Redux Imports
import { combineReducers } from "redux";
// ** Reducers Imports
import { buildReducer } from "./build.reducer";
import { flashCardReducer } from "./flashCard.reducer";
import { videoCardReducer } from "./videoCard.reducer";

const rootReducer = combineReducers({
  builds: buildReducer,
  flashCards: flashCardReducer,
  VideoCards: videoCardReducer,
});

export default rootReducer;
