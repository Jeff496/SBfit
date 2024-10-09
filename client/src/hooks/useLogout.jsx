import { useAuthContext } from "./useAuthContext";
import { useAllWorkoutsContext } from "./useAllWorkoutsContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: allWorkoutsDispatch } = useAllWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: ACTION_TYPES.LOGOUT });
    // clear state when logged out
    allWorkoutsDispatch({ type: ACTION_TYPES.SET_WORKOUTS, payload: null });
  };

  return { logout };
};
