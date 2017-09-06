import axios from 'axios';
import { push } from 'react-router-redux';

// SignIn Actions
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
    type: "EMPTY_EMAIL_ERROR"
  }
}

export var emptyPasswordError = () => {
  return {
    type: "EMPTY_PASSWORD_ERROR"
  }
}

export var clearErrorMsg = () => {
  return {
    type : "CLEAR_ERROR_MSG"
  }
}


export var setAuthenticated = (flag) => {
  return {
    type: "SET_AUTH_USER",
    flag
  }
}


export var startSignIn = (credentials) => {
  return (dispatch, getState) => {

    dispatch(signingInUser(true));

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/signin_user';
    } else {
      var url = 'http://localhost:3050/signin_user';
    }

    axios.post( url, JSON.stringify(credentials)).then((res)=>{
      if (res.data.token) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('token', res.data.token);
        axios.get(`http://localhost:3050/get_user?email=${credentials.email}`, {headers: {authorization: localStorage.getItem("token")}}).then((res) => {
          console.log(res);
          dispatch(setUserDetails(res.data));
          dispatch(signingInUser(false));
          dispatch(push('/'));
        });
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


// SignUp Actions

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

export var startSignUp = (credentials) => {
  return (dispatch, getState) => {
    dispatch(signingInUser(true));
    console.log(JSON.stringify(credentials));
    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/signup_user';
    } else {
      var url = 'http://localhost:3050/signup_user';
    }
    axios.post(url, JSON.stringify(credentials)).then((res)=>{

      if (res.data.token) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('token', res.data.token);
        axios.get(`http://localhost:3050/get_user?email=${credentials.email}`, {headers: {authorization: localStorage.getItem("token")}}).then((res) => {
          console.log(res);
          dispatch(setUserDetails(res.data));
          dispatch(signingInUser(false));
          dispatch(push('/'));
        });
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

export var fetchingUserDetails = (flag) => {
  return {
    type: "FETCHING_USER_DETAILS",
    flag
  }
}

export var fetchUserDetails = (email) => {
  return (dispatch, getState) => {

    if (process.env.NODE_ENV === 'production') {
      var url = 'https://fcc-booktrading-club.herokuapp.com/get_user';
    } else {
      var url = 'http://localhost:3050/get_user';
    }

    axios.get(`${url}?email=${email}`, {headers: {authorization: localStorage.getItem("token")}}).then((res) => {
      console.log(res);
      dispatch(setUserDetails(res.data));
      dispatch(fetchingUserDetails(false));
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
