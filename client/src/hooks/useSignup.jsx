import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
    }
    if (response.ok) {
      // store jwt in browser
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: ACTION_TYPES.LOGIN, payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
