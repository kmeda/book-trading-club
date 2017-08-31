import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import * as Redux from "react-redux";
var actions = require('../actions/actions.jsx');


class SignUp extends Component {
  constructor(props){
    super(props);
  }

  handleSignUp(e){
    e.preventDefault();
    var username = this.refs.userEmail.value;
    var password = this.refs.password.value;
    var credentials = {username, password};

    // dispatch action to send credentials to server and receive token then redirect to app
  }

  handleEmailFormat(){
    var {dispatch} = this.props;
    var email = this.refs.userEmail.value;
    if (/\S+@\S+\.\S+/.test(email)) {
      dispatch(actions.emailValid());
      dispatch(actions.emailErrorMsg(false));
    }
    if (!(/\S+@\S+\.\S+/.test(email))) {
      dispatch(actions.emailInValid());
    }
  }

  handleEmailValidity(e){
    var {dispatch} = this.props;
    // dispatch(actions.clearErrorMsg());
    var email = this.refs.userEmail.value;
    if (!(/\S+@\S+\.\S+/.test(email))) {
      dispatch(actions.emailErrorMsg(true));
    } else {
      dispatch(actions.emailErrorMsg(false));
    }
  }

  handleEmailInput(){
    var {dispatch} = this.props;
    var email = this.refs.userEmail.value;
    if (!(/\S+@\S+\.\S+/.test(email))) {
      dispatch(actions.emailInValid());
    }
  }

  handlePWDLength(){

  }

  handlePWDLengthValidity(){

  }

  handlePWDConfirm(){

  }

  handlePWDConfirmValidity(){

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
                    {/* <i className="fa fa-check bc-input-valid"></i> */}
                    {/* <p className='bc-input-error'>Email Invalid</p> */}
                    {this.props.auth.signUp.invalidEmail ? <p className='bc-input-error'>Email Invalid</p> : null}
                    {this.props.auth.signUp.emailValid ? <i className="fa fa-check bc-input-valid"></i> : null}
                  </div>
                  <input placeholder="Email" ref='userEmail'
                         onChange={this.handleEmailFormat.bind(this)}
                         onBlur={this.handleEmailValidity.bind(this)}
                         onFocus={this.handleEmailInput.bind(this)} />
                </div>
                <br/>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-key">
                    <i className="fa fa-check bc-input-valid"></i>
                    <p className='bc-input-error'>Minimum 6 characters</p>
                  </div>
                  <input placeholder="Password" type="password" ref='password'
                         onChange={this.handlePWDLength.bind(this)}
                         onBlur={this.handlePWDLengthValidity.bind(this)} />

                    {this.props.auth.signUp.validPWDLength ? <i className="fa fa-check bc-input-valid"></i> : null}
                </div>
                <br/>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-key">
                    <i className="fa fa-times bc-input-invalid"></i>

                  </div>
                  <input placeholder="Confirm Password" type="password" ref='passwordConfirm'
                         onChange={this.handlePWDConfirm.bind(this)}
                         onBlur={this.handlePWDConfirmValidity.bind(this)}/>
                  {this.props.auth.signUp.validPWDS ? <i className="fa fa-times bc-input-invalid"></i> : null}
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
                  <Link to={"/"}><div className="bc-auth-signup-lnk">Sign In</div></Link>
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

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(SignUp);
