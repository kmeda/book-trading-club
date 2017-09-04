import React,{Component} from 'react';
import * as Redux from 'react-redux';
import {BrowserRouter as Redirect, Router, Route, Switch, Link} from 'react-router-dom';
import { push } from 'react-router-redux';
var actions = require('../../actions/actions.jsx');

class MenuBar extends Component {
  constructor(props){
    super(props);
  }

  signOutUser(){
    var {dispatch} = this.props;
    localStorage.removeItem('token');
    dispatch(actions.setUnauthUser(false));
    dispatch(push('/signin'));
  }

  render(){
    return (
      <div>
          <div className="bc-menu-bar">
          <div className="bc-mybooks"><Link to='/'>My Books</Link></div>
          <div className="bc-allbooks"><Link to='/allbooks'>All Books</Link></div>
          <div className="bc-profile">Karthik Meda</div>
          <div className="bc-notification"><i className="fa fa-bell" aria-hidden="true"></i></div>
          <div className="bc-settings"><i className="fa fa-cog" aria-hidden="true"></i></div>
          <div className="bc-signout" onClick={this.signOutUser.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i></div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(MenuBar);

// notifications for approvals
  // websocket - red indication - onclick display all requests - unless component mounted
// settings
  // dialog box with form - save to database and fetch user settings immediately after save
// logout
  // clear user state and localstorage token
