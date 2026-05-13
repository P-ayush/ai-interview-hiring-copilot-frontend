import { useEffect, useState } from "react";

import { getRecruiterInterviews } from "../api/interview";

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
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Recruiter Interviews</h1>
      {errorMessage && (
        <p
          style={{
            color: "red",
          }}
        >
          {errorMessage}
        </p>
      )}
      {interviews.length === 0 ? (
        <p>No interviews found</p>
      ) : (
        interviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))
      )}
    </div>
  );
}

export default RecruiterInterviews;
