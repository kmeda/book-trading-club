import axios from 'axios';
import { push } from 'react-router-redux';
import _ from "lodash";

import openSocket from 'socket.io-client';

if (process.env.NODE_ENV === 'production') {
  var socket_url = 'https://fcc-booktrading-club.herokuapp.com';
} else {
  var socket_url = 'http://localhost:3050';
}

const socket = openSocket(socket_url);


if (process.env.NODE_ENV === 'production') {
  var base_url = 'https://fcc-booktrading-club.herokuapp.com';
} else {
  var base_url = 'http://localhost:3050';
}



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

export var nukeAuthData = () => {
  return {
    type: "NUKE_AUTH_DATA"
  }
}

export var startSignIn = (credentials) => {
  return (dispatch, getState) => {

    dispatch(signingInUser(true));


    axios.post(`${base_url}/signin_user`, JSON.stringify(credentials)).then((res)=>{
      if (res.data.token) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('token', res.data.token);
        dispatch(setAuthenticated(true));
        dispatch(signingInUser(false));
        dispatch(push('/'));
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
    axios.post(`${base_url}/signup_user`, JSON.stringify(credentials)).then((res)=>{

      if (res.data.token) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('token', res.data.token);
        dispatch(clearErrorMsg());
        dispatch(setAuthenticated(true));
        dispatch(push('/'));
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


// Settings Reducer
export var showSettings = (flag) => {
  return {
    type: "SHOW_SETTINGS",
    flag
  }
}

export var saveSettings = (flag) => {
  return {
    type: "SAVE_SETTINGS",
    flag
  }
}

export var setUserDetails = (payload) => {
  return {
    type: "SET_USER_DETAILS",
    payload
  }
}



export var fetchUserDetails = (email) => {
  return (dispatch, getState) => {

    axios.get(`${base_url}/get_user?email=${email}`).then((res) => {
      dispatch(setUserDetails(res.data));
    }).catch((e)=>console.log(e));
  }
}

export var saveUserSettings = (settings) => {
  return(dispatch, getState) => {

    //set save progress
    dispatch(saveSettings(true));


    var headers = {
           "Content-Type": "application/json",
           'Accept' : 'application/json',
           "authorization": localStorage.getItem('token')
       }


    axios.post(`${base_url}/update_user`, JSON.stringify(settings), headers).then((res)=>{
      // console.log(res);
        dispatch(setUserDetails(settings));
        dispatch(saveSettings(false));
        dispatch(showSettings(false));
      });
  }
}


// Books Reducer Actions

export var setSearchResults = (payload)=>{
  return {
    type: "SET_SEARCH_RESULTS",
    payload
  }
}

export var clearSearchResults = ()=>{
  return {
    type: "CLEAR_SEARCH_RESULTS"
  }
}

export var addingBook = (flag)=>{
  return {
    type: "ADDING_BOOK",
    flag
  }
}

export var addBooktoDatabase = (book) => {
  return (dispatch, getState) => {
    var email = localStorage.getItem("email");
    //disable add button here
    dispatch(addingBook(true));
    axios.post(`${base_url}/add_book`, {email, book}).then((res)=>{
      socket.emit("book_added");
      dispatch(fetchMyBooks());
    });
  }
}

export var setMyBooks = (payload)=> {
  return {
    type: "SET_MY_BOOKS",
    payload
  }
}

export var setAllBooks = (payload)=> {
    return {
      type: "SET_ALL_BOOKS",
      payload
    }
}

export var noBooksToShow = (flag) => {
  return {
    type: "NO_BOOKS_TO_SHOW",
    flag
  }
}

export var fetchMyBooks = ()=>{
  return (dispatch, getState) => {
    var email = localStorage.getItem("email");
    axios.get(`${base_url}/get_my_books?email=${email}`).then((res)=>{
      // console.log(res.data);
      var my_books = res.data[0].books;
      dispatch(setMyBooks(my_books));

      var requests = res.data[0].requests_received;
      dispatch(setRequestsReceived(requests));
      //enable button back
      dispatch(addingBook(false));

      if (my_books.length === 0) {
        dispatch(noBooksToShow(true));
      } else {
        dispatch(noBooksToShow(false));
      }
    }).catch((err) => {console.log(err)});
  }
}

export var fetchAllBooks = ()=>{
  return (dispatch, getState) => {
    var email = localStorage.getItem("email");
    axios.get(`${base_url}/get_all_books?email=${email}`).then((res)=>{

      // console.log(res.data);

      dispatch(setAllBooks(res.data.allBooks));
      dispatch(setRequestsSent(res.data.requestsSent));
    });
  }
}

export var nukeBooksState = () => {
  return {
    type: "NUKE_BOOKS_STATE"
  }
}

export var setTradeReqProg = (flag)=>{
  return {
    type: "SET_TRADE_REQ_PROG",
    flag
  }
}

export var setRequestsSent = (payload)=>{
  return {
    type: "SET_REQUESTS_SENT",
    payload
  }
}

export var setRequestsReceived = (payload) => {
  return {
    type: "SET_REQUESTS_RECEIVED",
    payload
  }
}

export var updateUserRequests = (payload) => {
  return (dispatch, getState) => {
    axios.post(`${base_url}/request_book`, payload).then((res)=>{
      // console.log(res);
      dispatch(setRequestsSent(res.data[0].requests_sent));
      dispatch(setTradeReqProg(false));
      socket.emit("request_sent");
    }).catch((e)=>console.log(e));
  }
}

export var fetchRequestsRecieved = () => {
  return (dispatch, getState) => {
    var email = getState().auth.user.email;
    // console.log(email);
    axios.get(`${base_url}/requests_received?email=${email}`).then((res)=>{
      console.log(res.data);
      var requests = res.data[0].requests_received;
      dispatch(setRequestsReceived(requests));
    })
  }
}

export var fetchRequestsSent = () => {
  return (dispatch, getState) => {
    var email = getState().auth.user.email;
    // console.log(email);
    axios.get(`${base_url}/requests_sent?email=${email}`).then((res)=>{
      console.log(res.data);
      var requests = res.data[0].requests_sent;
      dispatch(setRequestsSent(requests));
    })
  }
}

export var cancelRequest = (payload)=>{
  return (dispatch, getState) => {
    axios.post(`${base_url}/cancel_request`, payload).then((res)=>{
      console.log(res.data);
      if (res.data === "Request Cancelled") {
        socket.emit("request_cancelled");
      }
    }).catch((err) => {console.log(err);});
  }
}


export var approveRequest = (payload)=>{
  return (dispatch, getState) => {
    axios.post(`${base_url}/approve_request`, payload).then((res)=>{
      console.log(res.data);
      if (res.data === "Trade Successful") {
        socket.emit("request_approved");
      }
    }).catch((err) => {console.log(err);});
  }
}
