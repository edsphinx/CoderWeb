import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";
// import { composeWithDevTools } from '@redux-devtools/extension'; // Remove to production
// import { actionCreators } from './index';  // Remove to production

// const composeEnhancers = composeWithDevTools({ actionCreators }); // Remove to production
// store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))); //Remove composeEnhancers to Production
export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));