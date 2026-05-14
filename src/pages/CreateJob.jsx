import { useState } from "react";
import { createJob } from "../api/job";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
const CreateJob = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    skills: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createJobHandler = async (e) => {
    try {
      e.preventDefault();

      await createJob(job);
      navigate("/recruiter/jobs");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <Layout>
    <div>
      <h1>Create Job</h1>
      <form onSubmit={createJobHandler}>
        <input
          type="text"
          placeholder="Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Experience Level"
          value={job.experienceLevel}
          onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills"
          value={job.skills}
          onChange={(e) => setJob({ ...job, skills: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
    </Layout>
  );
};
export default CreateJob; 