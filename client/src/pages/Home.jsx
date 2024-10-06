import { useEffect } from "react";
import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { WorkoutContextProvider } from "../context/workoutContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useAllWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3000/record/all");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: ACTION_TYPES.SET_WORKOUTS, payload: json.records });
        console.log("fetch success");
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutContextProvider>
        <WorkoutForm />
      </WorkoutContextProvider>
    </div>
  );
};

export default Home;
