import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allWashingMachineReducer, washingMachineDetailsReducer, washingMachineReducer } from "./reducers/washingM_Reducers,";

const reducer = combineReducers({
  allWashingMachine: allWashingMachineReducer,
  washingMachineDetail: washingMachineDetailsReducer,
  washingMachine: washingMachineReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;