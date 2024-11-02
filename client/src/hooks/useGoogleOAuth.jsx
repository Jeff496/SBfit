import { useAuthContext } from "./useAuthContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

export const useGoogleOAuth = () => {
  const { dispatch } = useAuthContext();

  const signInWithGoogle = async () => {
    const response = await fetch("http://localhost:3000/auth/google", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //   console.log(json);
    }
    if (response.ok) {
      //   localStorage.setItem("user", JSON.stringify(json));
      //   dispatch({ type: ACTION_TYPES.LOGIN, payload: json });
    }
  };

  return { signInWithGoogle };
};
