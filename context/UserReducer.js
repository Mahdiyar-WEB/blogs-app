import error from "next/dist/api/error";

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
        isAuthenticated: false,
      };
    }
    case "signUp": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case "signIn": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case "getUserData": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
