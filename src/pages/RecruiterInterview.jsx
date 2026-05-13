import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getInterviewMessages } from "../api/interview";

import ChatMessage from "../components/ChatMessage";

function RecruiterInterview() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setErrorMessage("");

      const response = await getInterviewMessages(id);

      setMessages(response.messages);
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
  );
}

export default RecruiterInterview;
