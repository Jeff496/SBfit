import { useAuthContext } from "./useAuthContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  return { logout };
};
