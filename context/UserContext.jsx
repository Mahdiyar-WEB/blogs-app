"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import authentication from "api/authentication";
import userReducer, { initialState } from "./userReducer";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    userReducer,
    initialState,
  );

  const signIn = async (inputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signIn(inputs);
      dispatch({ type: "signin", payload: data.user });
      toast.success(data.message);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error(error.message);
    }
  };

  const signUp = async (inputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signUp(inputs);
      dispatch({ type: "signup", payload: data.user });
      toast.success(data.message);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    dispatch({ type: "loading" });
    await new Promise((res) =>
      setTimeout(() => {
        res();
      }, 500),
    );
    try {
      const { data } = await authentication.getUser();
      dispatch({ type: "user/loaded", payload: data.user });
    } catch (err) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);

  // const logout = async () => {
  //   try {
  //     await authentication.logout();

  //     router.refresh();

  //     router.push("/");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("not found Auth context");
  return useContext(UserContext);
}
