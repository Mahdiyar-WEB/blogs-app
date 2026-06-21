"use client";

import { createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import authentication from "api/authentication";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const router = useRouter();

  const signIn = async (inputs) => {
    try {
      const { data } = await authentication.signIn(inputs);
      toast.success(data.message);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signUp = async (inputs) => {
    try {
      const { data } = await authentication.signUp(inputs);
      toast.success(data.message);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const logout = async () => {
  //   try {
  //     await authentication.logout();

  //     router.refresh();

  //     router.push("/");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const value = useMemo(
    () => ({
      signIn,
      signUp,
    }),
    [],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserActions = () => useContext(UserContext);
