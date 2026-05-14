import { useNavigate } from "react-router-dom";

function RecruiterJobCard({ job }) {
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
      <h2>{job.title}</h2>

      <p>{job.description}</p>

      <p>
        <strong>Experience:</strong> {job.experienceLevel}
      </p>

      <p>
        <strong>Skills:</strong> {job.skills}
      </p>

      <button onClick={() => navigate(`/recruiter/job/${job.id}/applications`)}>
        View Applicants
      </button>
    </div>
  );
}

export default RecruiterJobCard;
