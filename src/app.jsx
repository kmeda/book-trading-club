import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Redirect, Router, Route, Switch, Link} from 'react-router-dom';

import {Provider} from "react-redux";

import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import AllBooks from './components/AllBooks.jsx';

import '../styles/main.scss';

const actions = require('./actions/actions.jsx');

import * as Redux from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';


import {  authReducer
          } from './reducers/reducers.jsx';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = Redux.createStore(
  Redux.combineReducers({
    auth: authReducer,
    router: routerReducer
  }),
  Redux.compose(
    Redux.applyMiddleware(thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
    <Provider store={store}>

      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/allbooks" component={AllBooks}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route render={()=> <h1>Page not found.</h1>}/>
        </Switch>
      </Router>

    </Provider>,
  document.getElementById('root'));
