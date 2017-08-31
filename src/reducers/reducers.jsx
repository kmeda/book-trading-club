export var authReducer = (state={signIn: '', signUp: ''}, action) => {
  switch (action.type) {
    case "SIGNING_IN_USER":
      return {
        ...state,
        signingIn: true
      };
    case "INVALID_EMAIL_PASSWORD_ERROR":
      return {
        ...state,
        signIn: { ...state.signIn,
          invalidCredentials: action.error
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
          emailValid: action.flag
        }
      };
    case "EMAIL_ERROR_MSG":
      return {
        ...state,
        signUp: { ...state.signUp,
          invalidEmail: action.flag
        }
      };
    default:
      return state;
  }
}
