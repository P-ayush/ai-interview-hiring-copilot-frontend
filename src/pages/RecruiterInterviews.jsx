import { useEffect, useState } from "react";
import { getRecruiterInterviews } from "../api/interview";
import Layout from "../components/Layout";
import InterviewCard from "../components/InterviewCard";

function RecruiterInterviews() {
  const [interviews, setInterviews] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setErrorMessage("");

      const response = await getRecruiterInterviews();

      setInterviews(response.interviews);
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Recruiter Interviews
            </h1>

            <p className="text-gray-500 mt-2">
              Review completed and ongoing candidate interviews
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {interviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No interviews found
              </h2>

              <p className="text-gray-500 mt-2">
                Interviews will appear here once candidates start them
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterInterviews;
