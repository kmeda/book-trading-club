import * as Redux from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';


import {  authReducer
          } from '../reducers/reducers.jsx';

const history = createHistory();
const middleware = routerMiddleware(history);

export var configure = (initialState = {}) => {

  var reducer = Redux.combineReducers({
    auth: authReducer,
    router: routerReducer
  });

  var store = Redux.createStore(
    reducer,
    initialState,
    Redux.compose(
      Redux.applyMiddleware(thunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}
