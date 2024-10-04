import { AllWorkoutsContext } from "../context/allWorkoutsContext";
import { useContext } from "react";

export const useAllWorkoutsContext = () => {
  const context = useContext(AllWorkoutsContext);

  if (!context) {
    throw Error(
      "useAllWorkoutsContext must be used in an AllWorkoutsContext provider"
    );
  }

  return context;
};
