import { User } from "lib/models/User";

type UserContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: null | string;
  user: User | null;
};

type UserContextAction =
  | { type: "loading" }
  | { type: "rejected"; payload: string }
  | { type: "signin"; payload: User }
  | { type: "signup"; payload: User }
  | { type: "user/loaded"; payload: User }
  | { type: "logout" };

export const initialState: UserContextState = {
  error: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const userReducer = (state: UserContextState, action: UserContextAction) => {
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
