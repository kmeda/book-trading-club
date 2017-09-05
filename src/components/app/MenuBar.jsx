import React,{Component} from 'react';
import * as Redux from 'react-redux';
import {BrowserRouter as Redirect, Router, Route, Switch, Link} from 'react-router-dom';
import { push } from 'react-router-redux';
var actions = require('../../actions/actions.jsx');

class MenuBar extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    //request user details from server and update state
  }

  componentDidMount(){
    var {dispatch} = this.props;
    dispatch(actions.setSettingsOn(false));
  }

  updateSettings(){
    var {dispatch, settings} = this.props;
    settings.settingsOn ? dispatch(actions.setSettingsOn(false)) : dispatch(actions.setSettingsOn(true));
  }

  saveSettings(e){
    e.preventDefault();
    var {dispatch, auth} = this.props;

    var email = auth.userName;
    var firstName = this.refs.firstname.value;
    var lastName = this.refs.lastname.value;
    var location = this.refs.location.value;

    var settings = {email, firstName, lastName, location};

    dispatch(actions.saveUserSettings(settings));
  }

  signOutUser(){
    var {dispatch} = this.props;
    localStorage.removeItem('token');

    // on logout nuke everything except signin signup
    dispatch(actions.removeUserDetails());
    dispatch(actions.setUnauthUser(false));
    dispatch(push('/signin'));
  }

  render(){
    var renderSettingsBox = () => {
      return (
        <div className="bc-settings-box">
            <form className="bc-settings-form">
              <div>Profile Settings</div>
              <br/>
              <input className="bc-settings-input" type="text" placeholder="First Name" ref="firstname"/>
              <input className="bc-settings-input" type="text" placeholder="Last Name" ref="lastname"/>
              <input className="bc-settings-input" type="text" placeholder="Location" ref="location"/>
                <br/>
                {
                  this.props.settings.saveSettings ?
                  <button onClick={(e)=>e.preventDefault()}><i className="fa fa-spinner fa-pulse"></i></button> :
                  <button onClick={this.saveSettings.bind(this)}>Save</button>
                }
            </form>
        </div>
      )
    }

    return (
      <div>
          <div className="bc-menu-bar">
          <div className="bc-mybooks"><Link to='/'>My Books</Link></div>
          <div className="bc-allbooks"><Link to='/allbooks'>All Books</Link></div>

          <div className="bc-profile">
            {this.props.auth.user ? this.props.auth.user.firstName + " " + this.props.auth.user.lastName : null}
          </div>
          <div className="bc-notification">
            <i className="fa fa-bell" aria-hidden="true">
              {this.props.books.requestsPending ? null : <div className="bc-notification-alert"><i className="fa fa-circle" aria-hidden="true"></i></div>}
            </i>
          </div>

          <div className={this.props.settings.settingsOn ? "bc-settings bc-settings-clicked" : "bc-settings" }>
            <i className="fa fa-cog" aria-hidden="true" onClick={this.updateSettings.bind(this)}>
              {this.props.auth.user ? null : <div className="bc-settings-alert"><i className="fa fa-exclamation" aria-hidden="true"></i></div>}

            </i>
            {this.props.settings.settingsOn ? renderSettingsBox() : null}
          </div>

          <div className="bc-signout"><i className="bc-animate-logout fa fa-sign-out" aria-hidden="true" onClick={this.signOutUser.bind(this)}></i></div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      books: state.books,
      settings: state.settings
    }
  }
)(MenuBar);

// notifications for approvals
  // websocket - red indication - onclick display all requests - unless component mounted
// settings
  // dialog box with form - save to database and fetch user settings immediately after save
// logout
  // clear user state and localstorage token
