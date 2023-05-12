import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from '@redux-devtools/extension'; // Remove to production
import { actionCreators } from './index';  // Remove to production
import { ActionType } from "./action-types";

const composeEnhancers = composeWithDevTools({ actionCreators }); // Remove to production

export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))); //Remove composeEnhancers to Production

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
});