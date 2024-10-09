import PropTypes from "prop-types";
import { useState } from "react";
import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { ACTION_TYPES } from "../reducers/actionTypes";
import { format } from "date-fns";
import { useEffect } from "react";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useAllWorkoutsContext();
  const { user } = useAuthContext();
  const [changed, setChanged] = useState(false);
  const [tempUpdate, setTempUpdate] = useState({ ...workout });

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/record/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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

  const handleChange = (e) => {
    setTempUpdate({ ...tempUpdate, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setTempUpdate({ ...workout });
    setChanged(false);
  };

  const handleSave = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/record/${workout._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(tempUpdate),
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: ACTION_TYPES.UPDATE_WORKOUT,
        payload: { id: tempUpdate._id, update: json.update },
      });
      setChanged(false);
      console.log(json.update);
    }
  };

  useEffect(() => {
    let isChanged = false;
    if (workout.title !== tempUpdate.title) isChanged = true;
    if (workout.sets !== Number(tempUpdate.sets)) isChanged = true;
    if (workout.reps !== Number(tempUpdate.reps)) isChanged = true;
    setChanged(isChanged);
  }, [
    tempUpdate.title,
    tempUpdate.sets,
    tempUpdate.reps,
    workout.title,
    workout.sets,
    workout.reps,
  ]);

  return (
    <div className="workout-details">
      <input
        name="title"
        type="text"
        value={tempUpdate.title}
        onChange={handleChange}
      />
      <input
        name="sets"
        type="number"
        value={tempUpdate.sets}
        onChange={handleChange}
      />
      <input
        name="reps"
        type="number"
        value={tempUpdate.reps}
        onChange={handleChange}
      />
      <p>{format(new Date(workout.createdAt), "MM-dd-yyyy")}</p>
      {changed && (
        <div className="update buttons">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
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
