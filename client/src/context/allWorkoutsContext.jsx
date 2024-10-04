import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { allWorkoutsReducer } from "../reducers/allWorkoutsReducer";

export const AllWorkoutsContext = createContext();

export const AllWorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(allWorkoutsReducer, {
    workouts: [],
  });

  return (
    <AllWorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AllWorkoutsContext.Provider>
  );
};

AllWorkoutsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
