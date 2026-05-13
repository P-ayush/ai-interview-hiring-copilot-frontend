import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <h2>{interview.application?.candidate?.user?.name}</h2>

      <p>
        <strong>Job:</strong>

        {interview.application?.job?.title}
      </p>

      <p>
        <strong>Status:</strong>

        {interview.status}
      </p>

      <p>
        <strong>Created At:</strong>{" "}
        {new Date(interview.createdAt).toLocaleString()}
      </p>

      <button onClick={() => navigate(`/recruiter/interview/${interview.id}`)}>
        View Interview
      </button>
    </div>
  );
}

export default InterviewCard;
