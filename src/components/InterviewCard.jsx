import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {interview.application?.candidate?.user?.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {interview.application?.job?.title}
        </p>

        <div className="mt-5 space-y-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-500">Interview Status</p>

            <p className="font-semibold text-gray-800 capitalize mt-1">
              {interview.status}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-500">Created At</p>

            <p className="font-semibold text-gray-800 mt-1">
              {new Date(interview.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/recruiter/interview/${interview.id}`)}
        className="mt-auto w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition text-sm font-medium mt-6"
      >
        View Interview
      </button>
    </div>
  );
}

export default InterviewCard;
