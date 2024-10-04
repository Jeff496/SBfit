import PropTypes from "prop-types";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>Sets: {workout.sets}</p>
      <p>Reps: {workout.reps}</p>
      <p>Workout created at: {workout.createdAt || "no date created"}</p>
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
