import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import createSocket from "../socket/socket";
import ChatMessage from "../components/chatMessage";
import { getInterviewMessages, completeInterview } from "../api/interview";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Interview() {
  const { id } = useParams();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    socketRef.current = createSocket();
    socketRef.current.emit("join_interview", id);

    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.off("receive_message");
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const fetchMessages = async () => {
    try {
      const response = await getInterviewMessages(id);

      setMessages(response.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socketRef.current.emit("send_message", {
      interviewId: id,
      message,
    });
    setMessage("");
  };
  const handleCompleteInterview = async () => {
    try {
      await completeInterview(id);
      alert("Interview completed successfully");
      navigate("/applications");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>AI Interview</h1>

        <div
          style={{
            border: "1px solid gray",
            height: "400px",
            overflowY: "scroll",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "80%",

            padding: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px",

            marginLeft: "10px",
          }}
        >
          Send
        </button>
        <button
          onClick={handleCompleteInterview}
          style={{
            padding: "10px",
            marginLeft: "10px",
          }}
        >
          Complete Interview
        </button>
      </div>
    </Layout>
  );
}

export default Interview;
