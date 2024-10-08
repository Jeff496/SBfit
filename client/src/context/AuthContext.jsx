import PropTypes from "prop-types";
import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { ACTION_TYPES } from "../reducers/actionTypes";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // check to see if user had already been logged in before, if yes update user's initial state
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: ACTION_TYPES.LOGIN, payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
