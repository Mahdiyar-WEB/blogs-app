export const initialState = {
  error: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        error: null,
        user: null,
        isAuthenticated: false,
        isLoading: true,
      };
    case "rejected":
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "signin":
      return {
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "signup":
      return {
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        isLoading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
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
