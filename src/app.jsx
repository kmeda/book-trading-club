import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {Provider} from "react-redux";

import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx';
import BookClub from './components/BookClub.jsx';

import '../styles/main.scss';
const actions = require('./actions/actions.jsx');
var store = require('./store/configureStore.jsx').configure();

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/bookclub" component={BookClub}/>
          <Route render={()=> <h1>Page not found.</h1>}/>
        </Switch>
      </Router>

    </Provider>,
  document.getElementById('root'));
