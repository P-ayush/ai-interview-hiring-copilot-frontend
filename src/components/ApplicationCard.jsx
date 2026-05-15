function ApplicationCard({ application, onUpdateStatus, onStartInterview }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
      <div>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {application.candidate?.user?.name || "Candidate"}
            </h2>

            <p className="text-gray-500 mt-1">{application.job?.title}</p>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold">
            {application.aiMatchScore}
            /100
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Application Status</p>

            <p className="font-semibold text-gray-800 capitalize mt-1">
              {application.status}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2">AI Feedback</p>

            <p className="text-gray-700 leading-6 text-sm">
              {application.aiFeedback}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <button
          onClick={() => onUpdateStatus(application.id, "shortlisted")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-sm font-medium"
        >
          Shortlist
        </button>

        <button
          onClick={() => onUpdateStatus(application.id, "rejected")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition text-sm font-medium"
        >
          Reject
        </button>

        <button
          onClick={() => onStartInterview(application.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium"
        >
          Interview
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
