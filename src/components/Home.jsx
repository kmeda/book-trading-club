import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div className="bc-background"></div>
        <div className="bc-background-overlay">
          <div className="bc-auth-container">

            <div className="bc-auth-form">
              <div className="bc-auth-header">
                Already a member?
                <br/>
                <br/>
                Sign In
              </div>

              <form>
                <div className="bc-input-style">
                  <div className="bc-input-icon fa fa-user-circle"></div>
                  <input placeholder="Email"/>
                </div>

                <br/>

              <div className="bc-input-style">
                <div className="bc-input-icon fa fa-key"></div>
                  <input placeholder="Password" type="password"/>
              </div>
              <br/>
              <button onClick={(e)=> preventDefault(e)}>Sign In</button>
              </form>
            </div>

            <div className="bc-auth-bg">
              <div className="bc-auth-bg-overlay">
                <div className="bc-auth-bg-fcclogo">
                  <div className="bc-auth-bg-logo"></div>
                </div>
                <div className="bc-auth-signup">
                  <h3>Not a member yet ?</h3>
                  <Link to={"/signup"}><button className="bc-auth-signup-btn">Sign Up</button></Link>
                </div>
                <div className="bc-auth-techstack">

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Home;
