"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import authentication from "api/authentication";
import userReducer, { initialState } from "./userReducer";
import { User } from "lib/models/User";
import { SigninInputs, SignupInputs } from "types/authentication/auth";

type UserContextValues = {
  user: User | null;
  signIn: (inputs: SigninInputs) => void;
  signUp: (inputs: SignupInputs) => void;
  logout: () => void;
  getUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const UserContext = createContext<UserContextValues | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    userReducer,
    initialState,
  );

  const signIn = async (inputs: SigninInputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signIn(inputs);
      dispatch({ type: "signin", payload: data.user });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "متاسفانه خطایی رخ داد بعدا تلاش کنید";
      dispatch({ type: "rejected", payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const signUp = async (inputs: SignupInputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signUp(inputs);
      dispatch({ type: "signup", payload: data.user });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "متاسفانه خطایی رخ داد بعدا تلاش کنید";
      dispatch({ type: "rejected", payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      await authentication.logout();
      dispatch({ type: "logout" });
      router.refresh();
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "متاسفانه خطایی رخ داد بعدا تلاش کنید";

      dispatch({ type: "rejected", payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const getUser = async () => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.getUser();
      dispatch({ type: "user/loaded", payload: data.user });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "متاسفانه خطایی رخ داد بعدا تلاش کنید";

      dispatch({ type: "rejected", payload: errorMessage });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        logout,
        getUser,
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export function useUser(): UserContextValues {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
