import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import { getInterviewMessages, getInterview } from "../api/interview";

import ChatMessage from "../components/ChatMessage";

function RecruiterInterview() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [interview, setInterview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const fetchInterviewData = async () => {
    try {
      setErrorMessage("");

      const messageResponse = await getInterviewMessages(id);

      setMessages(messageResponse.messages);

      const interviewResponse = await getInterview(id);

      setInterview(interviewResponse.interview);
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>Interview Review</h1>

        {errorMessage && (
          <p
            style={{
              color: "red",
            }}
          >
            {errorMessage}
          </p>
        )}

        {interview && (
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid gray",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <p>
              <strong>Candidate:</strong>{" "}
              {interview?.application?.candidate?.user?.name}
            </p>

            <p>
              <strong>Job:</strong> {interview?.application?.job?.title}
            </p>

            <p>
              <strong>Status:</strong> {interview.status}
            </p>

            <p>
              <strong>Final Score:</strong> {interview.finalScore}
            </p>

            <p>
              <strong>AI Feedback:</strong>
            </p>

            <p>{interview.feedback}</p>
          </div>
        )}

        <div
          style={{
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "10px",
            height: "500px",
            overflowY: "scroll",
          }}
        >
          {messages.length === 0 ? (
            <p>No messages found</p>
          ) : (
            messages.map(
              (
                message,

                index,
              ) => (
                <ChatMessage
                  key={index}
                  sender={message.sender}
                  message={message.message}
                />
              ),
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterInterview;
