const Graph = () => {
  // on submit function, call python api, get graph
  const handleSubmit = () => {
    // access all the titles from user workouts, delete duplicates
  };

  return (
    <>
      <div>
        {/* button */}
        <form onSubmit={handleSubmit}>
          <button>Generate Graph</button>
        </form>
      </div>
      <div>{/* graph from python api */}</div>
    </>
  );
};

export default Graph;
