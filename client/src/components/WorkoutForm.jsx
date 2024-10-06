import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useState } from "react";
import { ACTION_TYPES } from "../reducers/actionTypes";

const WorkoutForm = () => {
  const { dispatch: allWorkoutsDispatch } = useAllWorkoutsContext();
  const { title, sets, reps, dispatch: workoutDispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, sets, reps };

    const response = await fetch("http://localhost:3000/record", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
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

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
