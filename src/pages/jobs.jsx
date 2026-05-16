import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listJobs, applyJob } from "../api/job";
import Layout from "../components/Layout";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingJobId, setLoadingJobId] = useState(null);
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
      setLoadingJobId(jobId);
      setErrorMessage("");

      await applyJob(jobId);

      navigate("/applications");
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Available Jobs</h1>

            <p className="text-gray-500 mt-2">
              Explore opportunities and apply
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">
                No jobs found
              </h2>

              <p className="text-gray-500 mt-2">Please check again later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {job.title}
                    </h2>

                    <p className="text-gray-600 mt-3">{job.description}</p>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Experience:</span>{" "}
                        {job.experienceLevel}
                      </p>

                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Skills:</span>{" "}
                        {job.skills}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={loadingJobId === job.id}
                    className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingJobId === job.id && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}

                    {loadingJobId === job.id ? "Applying..." : "Apply"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Jobs;
