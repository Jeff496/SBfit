import { useEffect } from "react";
import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { WorkoutContextProvider } from "../context/workoutContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Graph from "../components/Graph";

const Home = () => {
  const { workouts, dispatch: allWorkoutsDispatch } = useAllWorkoutsContext();
  const { user, dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3000/record/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        // sync jwt expired state with frontend, kick user out to login/signup
        authDispatch({ type: ACTION_TYPES.LOGOUT });
      }

      if (response.ok) {
        allWorkoutsDispatch({
          type: ACTION_TYPES.SET_WORKOUTS,
          payload: json.records,
        });
        console.log("fetch success");
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [allWorkoutsDispatch, user]);

  return (
    <div className="home">
      <div className="container">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <div className="graph">
          <Graph />
        </div>
      </div>
      <WorkoutContextProvider>
        <WorkoutForm />
      </WorkoutContextProvider>
    </div>
  );
};

export default Home;
