import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from '@redux-devtools/extension'; // Remove to production
import * as actionCreators from './action-creators';  // Remove to production

const composeEnhancers = composeWithDevTools({ actionCreators }); // Remove to production

export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))); //Remove composeEnhancers to Production
