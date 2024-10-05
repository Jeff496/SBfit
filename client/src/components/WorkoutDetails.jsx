import PropTypes from "prop-types";
import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { ACTION_TYPES } from "../reducers/actionTypes";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useAllWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3000/record/${workout._id}`,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log(json);
      dispatch({
        type: ACTION_TYPES.DELETE_WORKOUT,
        payload: json.deleted,
      });
    }
  };

  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>Sets: {workout.sets}</p>
      <p>Reps: {workout.reps}</p>
      <p>Workout created at: {workout.createdAt || "no date created"}</p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

WorkoutDetails.propTypes = {
  workout: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default WorkoutDetails;
