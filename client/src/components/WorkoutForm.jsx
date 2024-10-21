import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { ACTION_TYPES } from "../reducers/actionTypes";

const WorkoutForm = () => {
  const { dispatch: allWorkoutsDispatch } = useAllWorkoutsContext();
  const {
    title,
    sets,
    reps,
    weight,
    dispatch: workoutDispatch,
  } = useWorkoutContext();
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create and read workouts");
      return;
    }

    const workout = { title, sets, reps, weight };

    const response = await fetch("http://localhost:3000/record", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      // if emptyFields is null, likely means token expired, kick user out to login/signup
      if (!json.emptyFields) {
        dispatch({ type: ACTION_TYPES.LOGOUT });
      } else {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
    }
    if (response.ok) {
      workoutDispatch({
        type: ACTION_TYPES.SET_INPUTS,
        payload: { name: "title", value: "" },
      });
      workoutDispatch({
        type: ACTION_TYPES.SET_INPUTS,
        payload: { name: "sets", value: "" },
      });
      workoutDispatch({
        type: ACTION_TYPES.SET_INPUTS,
        payload: { name: "reps", value: "" },
      });
      workoutDispatch({
        type: ACTION_TYPES.SET_INPUTS,
        payload: { name: "weight", value: "" },
      });
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      allWorkoutsDispatch({
        type: ACTION_TYPES.CREATE_WORKOUT,
        payload: json.record,
      });
    }
  };

  const handleChange = (e) => {
    workoutDispatch({
      type: ACTION_TYPES.SET_INPUTS,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a workout</h3>

      <label>Exercise Title:</label>
      <input
        name="title"
        type="text"
        onChange={handleChange}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Sets:</label>
      <input
        name="sets"
        type="number"
        onChange={handleChange}
        value={sets}
        className={emptyFields.includes("sets") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        name="reps"
        type="number"
        onChange={handleChange}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Weight:</label>
      <input
        name="weight"
        type="number"
        onChange={handleChange}
        value={weight}
        className={emptyFields.includes("weight") ? "error" : ""}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
