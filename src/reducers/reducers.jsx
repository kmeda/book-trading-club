export var authReducer = (state={signIn: '', signUp: ''}, action) => {
  switch (action.type) {
    case "SIGNING_IN_USER":
      return {
        ...state,
        signingIn: action.flag
      };
    case "INVALID_EMAIL_PASSWORD_ERROR":
      return {
        ...state,
        signIn: { ...state.signIn,
          invalidCredentials: action.alert
        }
      };
    case "EMPTY_EMAIL_ERROR":
      return {
        ...state,
        signIn: { ...state.signIn,
          noEmail: action.error
        }
      };
    case "EMPTY_PASSWORD_ERROR":
      return {
        ...state,
        signIn: { ...state.signIn,
          noPassword: action.error
        }
      };
    case "CLEAR_ERROR_MSG":
      return {
        ...state,
        signIn: '',
        signUp: ''
      }
    case "EMAIL_ERROR_MSG":
      return {
        ...state,
        signUp: { ...state.signUp,
          noEmail: action.flag
        }
      };
    case "PASSWORD_ERROR_MSG":
      return {
        ...state,
        signUp: { ...state.signUp,
          noPassword: action.flag
        }
      };
    case "EMAIL_VALID":
      return {
        ...state,
        signUp: { ...state.signUp,
          emailValid: action.flag
        }
      };
    case "EMAIL_INVALID":
      return {
        ...state,
        signUp: { ...state.signUp,
          emailInValid: action.flag
        }
      };
    case "PASSWORD_VALID":
      return {
        ...state,
        signUp: { ...state.signUp,
          passwordValid: action.flag
        }
      };
    case "PASSWORD_INVALID":
      return {
        ...state,
        signUp: { ...state.signUp,
          passwordInValid: action.flag
        }
      };
    case "PASSWORD_CONFIRMATION":
      return {
        ...state,
        signUp: { ...state.signUp,
          passwordConfirmed: action.flag
        }
      }
    case "PASSWORD_CONFIRMATION_INVALID":
      return {
        ...state,
        signUp: { ...state.signUp,
          passwordConfirmedInvalid: action.flag
        }
      }
    case "SET_AUTH_USER":
      return {
        ...state,
        authenticated: action.flag
      }
    case "SET_UNAUTH_USER":
      return {
        ...state,
        authenticated: action.flag
      }
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.email
      }
    case "SET_USER_DETAILS":
      return {
        ...state,
        user: action.payload
      }
    case "REMOVE_USER_DETAILS":
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export var booksReducer = (state={}, action) => {
  switch (action.type) {
    case "REQUESTS_PENDING":
      return {
        ...state,
        requestsPending: action.payload
      }

    default:
    return state;

  }
}

export var settingsReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_SETTINGS_ON":
      return {
        ...state,
        settingsOn: action.flag
      }
    case "ON_SAVE_SETTINGS":
      return {
        ...state,
        saveSettings: action.flag
      }
    default:
    return state;

  }
}
