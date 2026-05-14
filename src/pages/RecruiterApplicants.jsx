import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { updateApplicationStatus } from "../api/applications";

import { startInterview } from "../api/interview";

import { getApplicants } from "../api/job";
import Layout from "../components/Layout";
import ApplicationCard from "../components/ApplicationCard";

function RecruiterApplicants() {
  const { jobId } = useParams();

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

      const response = await getApplicants(jobId, page);

      setApplications(response.applications);

      setTotalPages(Math.ceil(response.applications.count / 5));
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleUpdateStatus = async (
    applicationId,

    status,
  ) => {
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
    <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Applicants</h1>

      {errorMessage && (
        <p
          style={{
            color: "red",
          }}
        >
          {errorMessage}
        </p>
      )}

      {applications.length === 0 ? (
        <p>No applicants found</p>
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onUpdateStatus={handleUpdateStatus}
            onStartInterview={handleStartInterview}
          />
        ))
      )}

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
    </Layout>
  );
}

export default RecruiterApplicants;
