import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useWorkoutContext must be used in a WorkoutContext provider");
  }

  return context;
};
