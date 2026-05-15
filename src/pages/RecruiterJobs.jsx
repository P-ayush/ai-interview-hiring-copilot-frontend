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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Recruiter Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your jobs and applicants
              </p>
            </div>

            <button
              onClick={() => navigate("/recruiter/jobs/create")}
              className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
            >
              Create Job
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No jobs yet
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first job posting
              </p>

              <button
                onClick={() => navigate("/recruiter/jobs/create")}
                className="mt-6 bg-black text-white px-5 py-3 rounded-xl"
              >
                Create Job
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <RecruiterJobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterJobs;
