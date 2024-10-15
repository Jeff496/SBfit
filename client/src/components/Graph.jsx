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

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const filteredWorkouts = workouts.filter((workout) =>
      workout.title.toLowerCase().startsWith(query.toLowerCase())
    );

    console.log("filtwork", filteredWorkouts);

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
            onChange={handleInput}
          />
          <div className="searchResults">
            {console.log("filt", filteredResults)}
            <ul>
              {filteredResults.map((workout, index) => (
                <li key={index}>{workout.title}</li>
              ))}
            </ul>
          </div>
          <button>Generate Graph</button>
        </form>
      </div>
      <div>{/* graph from python api */}</div>
    </>
  );
};

export default Graph;
