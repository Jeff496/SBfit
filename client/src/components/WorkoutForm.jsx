import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useState } from "react";
import { ACTION_TYPES } from "../reducers/actionTypes";

const WorkoutForm = () => {
  const { dispatch } = useAllWorkoutsContext();
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

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
      setError(json.err);
    }
    if (response.ok) {
      setTitle("");
      setSets("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
      dispatch({ type: ACTION_TYPES.CREATE_WORKOUT, payload: json.record });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
