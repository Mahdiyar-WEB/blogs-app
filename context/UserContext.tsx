"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import authentication from "api/authentication";
import userReducer, { initialState } from "./userReducer";
import type { SigninInput, SignupInput } from "lib/validators/auth.schema";
import type { UserDocument } from "types/models";

export interface UserContextValue {
  signIn: (inputs: SigninInput) => Promise<void>;
  signUp: (inputs: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  user: UserDocument | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    userReducer,
    initialState,
  );

  const signIn = async (inputs: SigninInput) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signIn(inputs);
      dispatch({ type: "signin", payload: data!.user });
      toast.success(data!.message);
      router.refresh();
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error((error as Error).message);
    }
  };

  const signUp = async (inputs: SignupInput) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signUp(inputs);
      dispatch({ type: "signup", payload: data!.user });
      toast.success(data!.message);
      router.refresh();
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error((error as Error).message);
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
      dispatch({ type: "rejected", payload: error });
      toast.error((error as Error).message);
    }
  };

  const getUser = async () => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.getUser();
      dispatch({ type: "user/loaded", payload: data!.user });
    } catch (err) {
      const error = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
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
export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("not found Auth context");
  return context;
}
