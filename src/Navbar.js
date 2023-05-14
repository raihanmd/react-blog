import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Lynx Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "var(--main-color)",
            borderRadius: "10px",
          }}
        >
          Add
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
