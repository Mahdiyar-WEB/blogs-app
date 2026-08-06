export const initialState = {
  error: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "signin":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "signup":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action!");
  }
};

export default userReducer;
