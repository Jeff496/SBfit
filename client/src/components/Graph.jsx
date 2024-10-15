import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useState, useEffect } from "react";

const Graph = () => {
  const { workouts } = useAllWorkoutsContext();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedWorkout);
    setQuery("");
  };

  useEffect(() => {
    // set filtered workouts equal to something only if query isn't empty and get
    // all workouts that start with query
    let filteredWorkouts =
      query !== ""
        ? workouts.filter((workout) =>
            workout.title.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    // change workout objects to just their title
    filteredWorkouts = filteredWorkouts.map((workout) => {
      return workout.title;
    });

    // remove all duplicate names
    filteredWorkouts = [...new Set(filteredWorkouts)];

    setFilteredResults(filteredWorkouts);
  }, [query, workouts]);

  return (
    <>
      <div>
        {/* button */}
        <form onSubmit={handleSubmit}>
          {/* search function that shows you titles of workouts you have */}
          <input
            type="text"
            placeholder="Search workouts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="searchResults">
            {/* ternary operators for output depending on whether search is empty */}
            {filteredResults.length > 0 ? (
              filteredResults.map((workout, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="workoutTitle"
                    value={workout}
                    onChange={(e) => setSelectedWorkout(e.target.value)}
                  ></input>
                  <label>{workout}</label>
                </div>
              ))
            ) : query.length > 0 ? (
              <p>No matching results found</p>
            ) : null}
          </div>
          <button>Generate Graph</button>
        </form>
      </div>
      <div>{/* graph from python api */}</div>
    </>
  );
};

export default Graph;
