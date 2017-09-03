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
        authorised: action.flag
      }
      case "SET_UNAUTH_USER":
        return {
          ...state,
          authorised: action.flag
        }
    default:
      return state;
  }
}
