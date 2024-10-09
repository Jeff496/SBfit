import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { workoutReducer } from "../reducers/workoutReducer";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    title: "",
    sets: "",
    reps: "",
    weight: "",
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

WorkoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
