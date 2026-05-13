import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications, updateApplicationStatus } from "../api/applications";
import { startInterview } from "../api/interview";
import ApplicationCard from "../components/ApplicationCard";
function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchApplications();
  }, [page]);

  const fetchApplications = async () => {
    try {
      setErrorMessage("");
      const response = await getApplications(page);
      setApplications(response.applications.rows);
      setTotalPages(Math.ceil(response.applications.count / 5));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartInterview = async (applicationId) => {
    try {
      await startInterview(applicationId);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Recruiter Dashboard</h1>

      {errorMessage && (
        <p
          style={{
            color: "red",
          }}
        >
          {errorMessage}
        </p>
      )}

      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onUpdateStatus={handleUpdateStatus}
          onStartInterview={handleStartInterview}
        />
      ))}
      <button onClick={() => navigate("/recruiter/interviews")}>
        View Interviews
      </button>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span
          style={{
            margin: "0 10px",
          }}
        >
          Page {page}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
