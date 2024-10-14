import { useAllWorkoutsContext } from "../hooks/useAllWorkoutsContext";

const Graph = () => {
  const { workouts } = useAllWorkoutsContext();

  const handleSubmit = (e) => {
    // access all workouts with the chosen title from user workouts
    workoutsToGraph = workouts.filter(
      (workout) => workout.title === "get from e"
    );
  };

  return (
    <>
      <div>
        {/* button */}
        <form onSubmit={handleSubmit}>
          {/* search function that shows you titles of workouts you have */}
          <button>Generate Graph</button>
        </form>
      </div>
      <div>{/* graph from python api */}</div>
    </>
  );
};

export default Graph;
