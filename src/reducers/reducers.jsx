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
          noEmail: true
        }
      };
    case "EMPTY_PASSWORD_ERROR":
      return {
        ...state,
        signIn: { ...state.signIn,
          noPassword: true
        }
      };
    case "CLEAR_ERROR_MSG":
      return {
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

   case "SET_USER_DETAILS":
      return {
        ...state,
        user: action.payload
      }
   case "NUKE_AUTH_DATA":
     return {
       signIn: '',
       signUp: ''
     };

    default:
      return state;
  }
}

var booksState = {
  myBooks:[],
  allBooks: [],
  searchResults:[],
  requestsSent: [],
  requestsReceived: []
}

export var booksReducer = (state= booksState, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload
      }
    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: []
      }
    case "SET_MY_BOOKS":
      return {
        ...state,
        myBooks: action.payload
      }
    case "NO_BOOKS_TO_SHOW":
      return {
        ...state,
        noBooksToShow: action.flag
      }
    case "ADDING_BOOK":
      return {
        ...state,
        addingBook: action.flag
      }
    case "SET_ALL_BOOKS":
      return {
        ...state,
        allBooks: action.payload
      }
    case "SET_TRADE_REQ_PROG":
      return {
        ...state,
        sendingTradeReq: action.flag
      }
    case "SET_REQUESTS_SENT":
      return {
        ...state,
        requestsSent: action.payload
      }
    case "SET_REQUESTS_RECEIVED":
      return {
        ...state,
        requestsReceived: action.payload
      }
    case "NUKE_BOOKS_STATE":
      return {
        myBooks: [],
        allBooks: [],
        searchResults:[],
        requestsSent: [],
        requestsReceived: []
      }
    default:
    return state;

  }
}

export var settingsReducer = (state={}, action) => {
  switch (action.type) {
    case "SHOW_SETTINGS":
      return {
        ...state,
        showSettings: action.flag
      }
    case "SAVE_SETTINGS":
      return {
        ...state,
        saveSettings: action.flag
      }
    default:
    return state;

  }
}
