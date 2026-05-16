import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { uploadResume, getProfile } from "../api/candidate";

function UploadResume() {
  const [resume, setResume] = useState(null);

  const [profile, setProfile] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (!resume) {
        return setErrorMessage("Please select a resume");
      }

      const formData = new FormData();

      formData.append("resume", resume);

      const response = await uploadResume(formData);

      setSuccessMessage(response.message);

      fetchProfile();

      setTimeout(() => {
        navigate("/jobs");
      }, 1500);
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Upload Resume
            </h1>

            {errorMessage && (
              <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-4">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-4">
                {successMessage}
              </div>
            )}

            {profile?.resumeUrl && (
              <div className="border border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Resume Analysis
                  </h2>

                  <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium">
                    Score: {profile.aiScore}/100
                  </div>
                </div>

                <p className="text-sm text-gray-500 break-all mb-4">
                  {profile.resumeUrl}
                </p>

                <div>
                  <p className="font-semibold text-gray-700 mb-2">AI Summary</p>

                  <p className="text-gray-600 leading-7">{profile.aiSummary}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleUpload} className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}

                {loading
                  ? "Analyzing Resume..."
                  : profile?.resumeUrl
                    ? "Replace Resume"
                    : "Upload Resume"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UploadResume;
