import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

const Graph = () => {
  const { user } = useAuthContext();
  const { workouts } = useAllWorkoutsContext();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery("");

    const allSelectedWorkouts = workouts.filter(
      (workout) => workout.title === selectedWorkout
    );

    console.log(allSelectedWorkouts);

    const response = await fetch("http://localhost:3000/userAnalytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(allSelectedWorkouts),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log(json);
    }

    setSelectedWorkout("");
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
