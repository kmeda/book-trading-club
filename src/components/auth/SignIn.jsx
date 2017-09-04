import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import * as Redux from "react-redux";
var actions = require('../../actions/actions.jsx');

class SignIn extends Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    var {dispatch} = this.props;
    dispatch(actions.clearErrorMsg());
  }

  handleSignIn(e){
    e.preventDefault();
    var {dispatch} = this.props;

    dispatch(actions.clearErrorMsg());

    let email = this.refs.username.value;
    let password = this.refs.password.value;

    let credentials = {email, password};



    if (email === '' || password === '') {
      if (email === '') {
        dispatch(actions.emptyEmailError());
      }
      if (password === '') {
        dispatch(actions.emptyPasswordError());
      }
      return;
    }

    //dispatch async action with credentials
      dispatch(actions.startSignIn(credentials));

  }

  handleChange(e){
    //dispatch action to update auth.username
    var {dispatch, auth} = this.props;
    if (!(auth.signIn === '')) {
      dispatch(actions.clearErrorMsg());
    }
  }



  render(){

    return (
      <div>
        <div className="bc-background"></div>
        <div className="bc-background-overlay">
          <div className="bc-auth-container">
            <div className="bc-auth-form">

              <div className="bc-auth-header">Already a member?<br/><br/>Sign In</div>

              <form>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-user-circle">
                    {this.props.auth.signIn.noEmail ? <p className='bc-input-error'>Email Required</p> : null}

                  </div>
                  <input placeholder="Email" ref="username"
                         onChange={this.handleChange.bind(this)} />
                </div>

                <br/>

                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-key">
                    {this.props.auth.signIn.invalidCredentials ? <p className='bc-auth-error'>Invalid Email or Password</p> : null}
                    {this.props.auth.signIn.noPassword ? <p className='bc-input-error'>Password Required</p> : null}
                  </div>
                    <input placeholder="Password" type="password" ref="password" />
                </div>

                <br/>

                {
                  this.props.auth.signingIn ?
                  <button onClick={(e)=>e.preventDefault()}><i className="fa fa-spinner fa-pulse"></i></button> :
                  <button onClick={this.handleSignIn.bind(this)}>Sign In</button>
                }

              </form>

            </div>

            <div className="bc-auth-bg">
              <div className="bc-auth-bg-overlay">
                <div className="bc-auth-bg-fcclogo"><div className="bc-auth-bg-logo"></div></div>
                <div className="bc-auth-signup">
                  <div className="bc-auth-signup-txt">Not a member yet ?</div>
                  <Link to={"/signup"}><div className="bc-auth-signup-lnk">Sign Up</div></Link>
                </div>

              </div>
            </div>

          </div>
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
)(SignIn);
