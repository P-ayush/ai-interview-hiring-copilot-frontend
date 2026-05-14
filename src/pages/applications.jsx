import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../api/applications";
import Layout from "../components/Layout";
function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
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
  const joinInterview = (interviewId) => {
    navigate(`/interview/${interviewId}`);
  };

  return (
    <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>My Applications</h1>

      {errorMessage && (
        <p
          style={{
            color: "red",
            marginBottom: "10px",
          }}
        >
          {errorMessage}
        </p>
      )}
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h2>{application.job.title}</h2>
            <p>
              <strong>Application Status:</strong>
              {application.status}
            </p>

            <p>
              <strong>AI Match Score:</strong>
              {application.aiMatchScore}
            </p>

            <p>
              <strong>AI Feedback:</strong>
              {application.aiFeedback}
            </p>
            {application.status === "interview" ? (
              <div>
                <p>
                  <strong>Interview Status:</strong>
                  {application.interview?.status || "started"}
                </p>

                <button onClick={() => joinInterview(application.interview.id)}>
                  Join Interview
                </button>
              </div>
            ) : (
              <p>Interview not started yet</p>
            )}
          </div>
        ))
      )}
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
    </Layout>
  );
}

export default Applications;
