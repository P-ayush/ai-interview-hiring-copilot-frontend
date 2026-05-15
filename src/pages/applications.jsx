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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Track your applications and interviews
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No applications found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {application.job.title}
                    </h2>

                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Status:</span>{" "}
                        {application.status}
                      </p>

                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">AI Match Score:</span>{" "}
                        {application.aiMatchScore}
                        /100
                      </p>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          AI Feedback
                        </p>

                        <p className="text-sm text-gray-600 leading-6">
                          {application.aiFeedback}
                        </p>
                      </div>

                      {application.interview ? (
                        <div>
                          <p className="text-sm text-gray-700 mb-4">
                            <span className="font-semibold">
                              Interview Status:
                            </span>{" "}
                            {application.interview?.status || "started"}
                          </p>

                          <button
                            onClick={() =>
                              joinInterview(application.interview.id)
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium"
                          >
                            Join Interview
                          </button>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-600 text-sm p-3 rounded-lg mt-4">
                          Interview not started yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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

export default Applications;
