function ApplicationCard({ application, onUpdateStatus, onStartInterview }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <h2>{application.candidate?.user?.name || "Candidate"}</h2>

      <p>
        <strong>Job:</strong>

        {application.job?.title}
      </p>

      <p>
        <strong>Status:</strong>

        {application.status}
      </p>

      <p>
        <strong>AI Match Score:</strong>

        {application.aiMatchScore}
      </p>

      <p>
        <strong>AI Feedback:</strong>

        {application.aiFeedback}
      </p>

      <div
        style={{
          marginTop: "10px",
        }}
      >
        <button
          onClick={() =>
            onUpdateStatus(
              application.id,

              "shortlisted",
            )
          }
        >
          Shortlist
        </button>

        <button
          onClick={() =>
            onUpdateStatus(
              application.id,

              "rejected",
            )
          }
          style={{
            marginLeft: "10px",
          }}
        >
          Reject
        </button>

        <button
          onClick={() => onStartInterview(application.id)}
          style={{
            marginLeft: "10px",
          }}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
