import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterJobs } from "../api/job";

import Layout from "../components/Layout";

import RecruiterJobCard from "../components/RecruiterJobCard";

function RecruiterJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setErrorMessage("");

      const response = await getRecruiterJobs();

      setJobs(response.jobs);
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Recruiter Jobs</h1>

      {errorMessage && (
        <p
          style={{
            color: "red",
          }}
        >
          {errorMessage}
        </p>
      )}

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => <RecruiterJobCard key={job.id} job={job} />)
      )}
      <button onClick={() => navigate("/recruiter/jobs/create")}>
        Create Job
      </button>
    </div>
    </Layout>
  );
}

export default RecruiterJobs;
