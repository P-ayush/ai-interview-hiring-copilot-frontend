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

      setTotalPages(response.totalPages);
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
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Applicants</h1>

              <p className="text-gray-500 mt-2">
                Manage candidate applications and interviews
              </p>
            </div>

            <button
              onClick={() => navigate("/recruiter/interviews")}
              className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"
            >
              View Interviews
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No applicants found
              </h2>

              <p className="text-gray-500 mt-2">
                Applications will appear here once candidates apply
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onUpdateStatus={handleUpdateStatus}
                  onStartInterview={handleStartInterview}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">Page {page}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterApplicants;
