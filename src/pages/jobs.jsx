import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { listJobs, applyJob } from "../api/job";
import Layout from "../components/Layout";
function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await listJobs();
      setJobs(response.jobs.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const applyForJob = async (jobId) => {
    try {
      setErrorMessage("");

      await applyJob(jobId);

      navigate("/applications");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  return (

    <Layout>
      <h1>Jobs</h1>
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
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <button onClick={() => applyForJob(job.id)}>Apply</button>
        </div>
      ))}
    </Layout>
  );
}

export default Jobs;
