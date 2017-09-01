import axios from 'axios';
import React from 'react';
import {BrowserRouter as Route, Redirect} from 'react-router-dom';
// Sign In Actions
export var signingInUser = () => {
  return {
    type: "SIGNING_IN_USER",
    signingIn: true
  }
}

export var invalidEmailandPasswordError = () => {
  return {
    type: "INVALID_EMAIL_PASSWORD_ERROR",
    error: "Invalid Credentials"
  }
}

export var emptyEmailError = () => {
  return {
    type: "EMPTY_EMAIL_ERROR",
    error: "Empty Email"
  }
}

export var emptyPasswordError = () => {
  return {
    type: "EMPTY_PASSWORD_ERROR",
    error: "Empty Password"
  }
}

export var clearErrorMsg = () => {
  return {
    type : "CLEAR_ERROR_MSG"
  }
}



export var emailErrorMsg = (flag) => {
  return {
    type: "EMAIL_ERROR_MSG",
    flag
  }
}

export var passwordErrorMsg = (flag) => {
  return {
    type: "PASSWORD_ERROR_MSG",
    flag
  }
}

export var emailInValid = (flag) => {
  return {
    type: "EMAIL_INVALID",
    flag
  }
}

export var emailValid = (flag) => {
  return {
    type: "EMAIL_VALID",
    flag
  }
}

export var passwordInValid = (flag) => {
  return {
    type: "PASSWORD_INVALID",
    flag
  }
}

export var passwordValid = (flag) => {
  return {
    type: "PASSWORD_VALID",
    flag
  }
}

export var passwordConfirmed = (flag) => {
  return {
    type: "PASSWORD_CONFIRMATION",
    flag
  }
}

export var passwordConfirmedInvalid = (flag) => {
  return {
    type: "PASSWORD_CONFIRMATION_INVALID",
    flag
  }
}

export var startSignIn = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    console.log(JSON.stringify(credentials));
    axios.post('http://localhost:3050/signin_user', JSON.stringify(credentials)).then((res)=>{
      console.log(res);
      <Redirect push to="/bookclub"/>

    }).catch((e) => console.log(e));


  }
}


export var startSignUp = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    console.log(JSON.stringify(credentials));
    axios.post('http://localhost:3050/signup_user', JSON.stringify(credentials)).then((res)=>{
      console.log(res);
    }).catch((e) => console.log(e));;


  }
}
