import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>SBfit prototype</h1>
        </Link>
        <nav>
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
