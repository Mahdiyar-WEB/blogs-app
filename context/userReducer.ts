import type { UserDocument } from "types/models";

export interface UserState {
  error: unknown;
  user: UserDocument | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type UserAction =
  | { type: "loading" }
  | { type: "rejected"; payload: unknown }
  | { type: "signin"; payload: UserDocument }
  | { type: "signup"; payload: UserDocument }
  | { type: "user/loaded"; payload: UserDocument }
  | { type: "logout" };

export const initialState: UserState = {
  error: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
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
