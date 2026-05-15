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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Job
            </h1>

            <p className="text-gray-500 mb-8">
              Add a new job posting for candidates
            </p>

            {errorMessage && (
              <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
                {errorMessage}
              </div>
            )}

            <form onSubmit={createJobHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  placeholder="Backend Developer"
                  value={job.title}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  placeholder="Write job description..."
                  value={job.description}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      description: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>

                <input
                  type="text"
                  placeholder="2+ Years"
                  value={job.experienceLevel}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      experienceLevel: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>

                <input
                  type="text"
                  placeholder="Node.js, React, MongoDB"
                  value={job.skills}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      skills: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition font-medium"
              >
                Create Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateJob;
