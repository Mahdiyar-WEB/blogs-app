export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "rejected": {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case "signUp": {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    }
    case "signIn": {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    }
    default:
      break;
  }
};

export default reducer;
