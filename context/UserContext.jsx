"use client";
import React, { createContext, useContext, useReducer } from "react";
import authentication from "services/authentication";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import reducer, { initialState } from "./UserReducer";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [{ user, isAuthenticated, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const signIn = async (inputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signIn(inputs);
      toast.success(data.message);
      dispatch({ type: "signIn", payload: data.user });
      router.push("/profile");
    } catch (error) {
      const { message } = error;
      dispatch({ type: "rejected", payload: message });
      toast.error(message);
    }
  };

  const signUp = async (inputs) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await authentication.signUp(inputs);
      toast.success(data.message);
      dispatch({ type: "signUp", payload: data.user });
      router.push("/profile");
    } catch (error) {
      const { message } = error;
      dispatch({ type: "rejected", payload: message });
      toast.error(message);
    }
  };

  const logOut = () => {};

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loading, error, signIn, signUp, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("not found user context");
  return context;
};

export default UserProvider;
