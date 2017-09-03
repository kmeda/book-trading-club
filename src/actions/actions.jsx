import axios from 'axios';
import { push } from 'react-router-redux';

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

export var setAuthUser = (flag)=>{
  return {
    type: "SET_AUTH_USER",
    flag
  }
}

export var setUnauthUser = (flag)=>{
  return {
    type: "SET_UNAUTH_USER",
    flag
  }
}

export var startSignIn = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    console.log(JSON.stringify(credentials));

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/signin_user';
    } else {
      var url = 'http://localhost:3050/signin_user';
    }

    axios.post( url, JSON.stringify(credentials)).then((res)=>{
      console.log(res);
      if (res.data.token) {
        // set state to authorised
        dispatch(setAuthUser(true));
        // save to local storage
        localStorage.setItem('token', res.data.token);
        dispatch(push('/'));
      }
    }).catch((e) => {
      console.log(e);
    });
  }
}


export var startSignUp = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    console.log(JSON.stringify(credentials));
    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/signup_user';
    } else {
      var url = 'http://localhost:3050/signup_user'; 
    }
    axios.post(url, JSON.stringify(credentials)).then((res)=>{

      if (res.data.token) {
        // set state to authorised
        dispatch(setAuthUser(true));
        localStorage.setItem('token', res.data.token);
        dispatch(push('/'));
      } else if (res.data.error === "Email is in use") {
        console.log("Email is in use");
      }
    }).catch((e) => console.log(e));;
  }
}
