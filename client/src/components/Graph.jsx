import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useState, useEffect } from "react";

const Graph = () => {
  const { workouts } = useAllWorkoutsContext();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSubmit = (e) => {
    // access all workouts with the chosen title from user workouts
    workoutsToGraph = workouts.filter(
      (workout) => workout.title === "get from e"
    );
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
            {filteredResults.map((workout, index) => (
              <div key={index}>
                <input type="radio" name="workoutTitle" value={workout}></input>
                <label>{workout}</label>
              </div>
            ))}
          </div>
          <button>Generate Graph</button>
        </form>
      </div>
      <div>{/* graph from python api */}</div>
    </>
  );
};

export default Graph;
