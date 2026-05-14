import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        padding: "15px",
        borderBottom: "1px solid gray",
        marginBottom: "20px",
      }}
    >
      {user?.role === "candidate" && (
        <>
          <Link to="/jobs">Jobs</Link>

          <Link to="/applications">Applications</Link>
        </>
      )}

      {user?.role === "recruiter" && (
        <>
          <Link to="/recruiter/jobs">Recruiter Jobs</Link>
          <Link to="/recruiter/interviews">Interviews</Link>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
