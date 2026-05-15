import { useNavigate } from "react-router-dom";

function RecruiterJobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>

        <p className="text-gray-600 mt-3">{job.description}</p>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Experience:</span>{" "}
            {job.experienceLevel}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Skills:</span> {job.skills}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/recruiter/job/${job.id}/applications`)}
        className="mt-auto w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition text-sm font-medium"
      >
        View Applications
      </button>
    </div>
  );
}

export default RecruiterJobCard;
