
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

export var signInUser = (credentials) => {
  return (dispatch, getState) => {
    //call server and update auth state
      //error or token
  }
}


// Sign Up Actions

export var emailValid = () => {
  return {
    type: "EMAIL_VALID",
    flag: true
  }
}

export var emailInValid = () => {
  return {
    type: "EMAIL_INVALID",
    flag: false
  }
}

export var emailErrorMsg = (flag) => {
  return {
    type: "EMAIL_ERROR_MSG",
    flag
  }
}
