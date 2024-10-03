import { useEffect, useState } from "react";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3000/record/all");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json.records);
        console.log("fetch success");
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <p key={workout._id}>{workout.name}</p>)}
      </div>
    </div>
  );
};

export default Home;
