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
    <nav className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">AI Hiring Platform</h1>

        <div className="flex items-center gap-6">
          {user?.role === "candidate" && (
            <>
              <Link
                to="/jobs"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Jobs
              </Link>

              <Link
                to="/applications"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Applications
              </Link>

              <Link
                to="/upload-resume"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Upload Resume
              </Link>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/jobs"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Jobs
              </Link>

              <Link
                to="/recruiter/interviews"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Interviews
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
