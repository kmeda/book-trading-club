import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import * as Redux from "react-redux";
var actions = require('../actions/actions.jsx');


class SignUp extends Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    var {dispatch} = this.props;
    dispatch(actions.clearErrorMsg());
  }

  handleSignUp(e){
    e.preventDefault();
    var {dispatch, auth} = this.props;

    var email = this.refs.userEmail.value;
    var password = this.refs.password.value;
    var passwordConfirm = this.refs.passwordConfirm.value;
    let credentials = {email, password};

    if (email === '' || password === '' || passwordConfirm === '') {
      if (email === '') {
        dispatch(actions.emailErrorMsg(true));
      }
      if (password === '') {
        dispatch(actions.passwordErrorMsg(true));
      }
      return;
    }
    // dispatch action to send credentials to server and receive token then redirect to app
    if (auth.signUp.emailValid && auth.signUp.passwordValid && auth.signUp.passwordConfirmed) {
      dispatch(actions.startSignUp(credentials));
    }

  }
  //

  handleFieldChange(){
    var {dispatch} = this.props;
    var email = this.refs.userEmail.value;
    var password = this.refs.password.value;
    var passwordConfirm = this.refs.passwordConfirm.value;

    if (email.length === 0 || password.length === 0) {
      if (email.length === 0) {
        dispatch(actions.emailValid(false));
      }
      if (password.length === 0) {
        dispatch(actions.passwordValid(false));
      }
      return;
    }

    if (passwordConfirm === password) {
      //success case
      dispatch(actions.passwordConfirmedInvalid(false));
      dispatch(actions.passwordConfirmed(true));
    }

  }

  handleEmailValidity(){
    var {dispatch} = this.props;
    var email = this.refs.userEmail.value;

    if (email.length === 0) {
      dispatch(actions.emailErrorMsg(false));
      dispatch(actions.emailValid(false));
      dispatch(actions.emailInValid(false));
      return;
    }

    if (email !== '' && !(/\S+@\S+\.\S+/.test(email))) {
      dispatch(actions.emailErrorMsg(false));
      dispatch(actions.emailInValid(true));
      dispatch(actions.emailValid(false));
    } else if(email !== '' && (/\S+@\S+\.\S+/.test(email))) {
      dispatch(actions.emailErrorMsg(false));
      dispatch(actions.emailValid(true));
      dispatch(actions.emailInValid(false));
    }



  }

  handlePasswordValidity(){
    var {dispatch} = this.props;
    var password = this.refs.password.value;

    if (password.length === 0) {
      dispatch(actions.passwordValid(false));
      return;
    }

    if (password.length !==0 && password.length < 6) {
      dispatch(actions.passwordErrorMsg(false));
      dispatch(actions.passwordInValid(true));
      dispatch(actions.passwordValid(false));
    } else if(password.length >= 6){
      dispatch(actions.passwordErrorMsg(false));
      dispatch(actions.passwordValid(true));
      dispatch(actions.passwordInValid(false));
    }
  }

  handlePasswordConfirmValidity(){
    //error case onBlur
    var {dispatch} = this.props;
    var password = this.refs.password.value;
    var passwordConfirm = this.refs.passwordConfirm.value;

    if (passwordConfirm !== password ) {
      dispatch(actions.passwordConfirmed(false));
      dispatch(actions.passwordConfirmedInvalid(true));
    }

  }


  render(){
    return (
      <div>
        <div className="bc-background"></div>
        <div className="bc-background-overlay">
          <div className="bc-auth-container">
            <div className="bc-auth-form">
              <div className="bc-auth-header">Sign Up</div>
              <form>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-user-circle">
                    {this.props.auth.signUp.noEmail ? <p className='bc-input-error'>Email Required</p> : null}
                    {this.props.auth.signUp.emailInValid ? <p className='bc-input-error'>Email Invalid</p> : null}
                    {this.props.auth.signUp.emailValid ? <i className="fa fa-check bc-input-valid"></i> : null}
                    {this.props.auth.signUp.emailInUse ? <p className='bc-input-error'>Email is in use</p> : null}
                  </div>
                  <input placeholder="Email" ref='userEmail'
                         onChange={this.handleFieldChange.bind(this)}
                         onBlur={this.handleEmailValidity.bind(this)} />
                </div>
                <br/>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-key">
                    {this.props.auth.signUp.noPassword ? <p className='bc-input-error'>Password minimun 6 characters</p> : null}
                    {this.props.auth.signUp.passwordInValid ? <p className='bc-input-error'>Password minimun 6 characters</p> : null}
                    {this.props.auth.signUp.passwordValid ? <i className="fa fa-check bc-input-valid"></i> : null}
                  </div>
                  <input placeholder="Password" type="password" ref='password'
                          onChange={this.handleFieldChange.bind(this)}
                          onBlur={this.handlePasswordValidity.bind(this)}/>


                </div>
                <br/>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-key">
                    {this.props.auth.signUp.passwordConfirmed ? <i className="fa fa-check bc-input-valid"></i> : null}
                    {this.props.auth.signUp.passwordConfirmedInvalid ? <i className="fa fa-times bc-input-invalid"></i> : null}
                  </div>
                  <input placeholder="Confirm Password" type="password" ref='passwordConfirm'
                         onChange={this.handleFieldChange.bind(this)}
                         onBlur={this.handlePasswordConfirmValidity.bind(this)}/>
                </div>
                <br />
                {
                  this.props.auth.signingUp ?
                  <button onClick={(e)=>e.preventDefault()}><i className="fa fa-spinner fa-pulse"></i></button> :
                  <button onClick={this.handleSignUp.bind(this)}>Sign Up</button>
                }

              </form>
            </div>
            <div className="bc-auth-bg">
              <div className="bc-auth-bg-overlay">
                <div className="bc-auth-bg-fcclogo"><div className="bc-auth-bg-logo"></div></div>
                <div className="bc-auth-signup">
                  <div className="bc-auth-signup-txt">Already a member ?</div>
                  <Link to={"/signin"}><div className="bc-auth-signup-lnk">Sign In</div></Link>
                  <div className="bc-auth-techstack"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Redux.connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(SignUp));
