import axios from 'axios';
import { push } from 'react-router-redux';

// Sign In Actions
export var signingInUser = (flag) => {
  return {
    type: "SIGNING_IN_USER",
    flag
  }
}

export var invalidEmailorPasswordError = (alert) => {
  return {
    type: "INVALID_EMAIL_PASSWORD_ERROR",
    alert
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

export var setUserName = (email)=>{
  return {
    type: "SET_USER_NAME",
    email
  }
}

export var removeUserName = ()=>{
  return {
    type: "REMOVE_USER_NAME"
  }
}

export var startSignIn = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    dispatch(signingInUser(true));
    console.log(JSON.stringify(credentials));

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/signin_user';
    } else {
      var url = 'http://localhost:3050/signin_user';
    }

    axios.post( url, JSON.stringify(credentials)).then((res)=>{
      if (res.data.token) {
        // set state to authorised
        dispatch(setAuthUser(true));
        dispatch(setUserName(credentials.email));
        // dispatch(fetchUserDetails(auth.userName));
        // save to local storage
        localStorage.setItem('token', res.data.token);
        dispatch(push('/'));

        dispatch(signingInUser(false));
      }
    }).catch((e) => {
      dispatch(signingInUser(false));

      if (e.response) {
        console.log(e);
        if (e.response.data === "Unauthorized") {
          dispatch(invalidEmailorPasswordError("Invalid Email or Password"));
        }
      } else {
        dispatch(invalidEmailorPasswordError("Server unreachable :("));
      }


    });
  }
}


export var startSignUp = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
    dispatch(signingInUser(true));
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
        dispatch(signingInUser(false));
      } else if (res.data.error === "Email is in use") {
        console.log("Email is in use");
        dispatch(signingInUser(false));
        dispatch(invalidEmailorPasswordError(res.data.error));
      }
    }).catch((e) => {
      // handle dispatch error state
      dispatch(signingInUser(false));
      dispatch(invalidEmailorPasswordError("Server unreachable :("));
      console.log(e);
    });
  }
}


// Books Reducer Actions

// Settings Reducer
export var setSettingsOn = (flag) => {
  return {
    type: "SET_SETTINGS_ON",
    flag
  }
}

export var onSaveSettings = (flag) => {
  return {
    type: "ON_SAVE_SETTINGS",
    flag
  }
}

export var setUserDetails = (payload) => {
  return {
    type: "SET_USER_DETAILS",
    payload
  }
}

export var removeUserDetails = () => {
  return {
    type: "REMOVE_USER_DETAILS"
  }
}

export var fetchUserDetails = (email) => {
  return (dispatch, getState) => {

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/get_user';
    } else {
      var url = 'http://localhost:3050/get_user';
    }

    axios.get(`${url}?email=${email}`, {}).then((res) => {
      console.log(res);
      dispatch(setUserDetails(res.data));
    });
  }
}

export var saveUserSettings = (settings) => {
  return(dispatch, getState) => {

    //set save progress
    dispatch(onSaveSettings(true));

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/update_user';
    } else {
      var url = 'http://localhost:3050/update_user';
    }
    var headers = {
           "Content-Type": "application/json",
           'Accept' : 'application/json',
           "authorization": localStorage.getItem('token')
       }


    axios.post(url, JSON.stringify(settings), headers).then((res)=>{
      console.log(res);
        dispatch(setUserDetails(settings));
        dispatch(onSaveSettings(false));
        dispatch(setSettingsOn(false));
      });
  }
}
