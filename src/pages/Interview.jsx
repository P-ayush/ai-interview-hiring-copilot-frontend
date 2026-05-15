import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import createSocket from "../socket/socket";

import ChatMessage from "../components/ChatMessage";

import { getInterviewMessages, completeInterview } from "../api/interview";

import Layout from "../components/Layout";

function Interview() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);

  const messagesEndRef = useRef(null);

  const socketRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    socketRef.current = createSocket();

    socketRef.current.emit("join_interview", id);

    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socketRef.current.on("interview_completed", () => {
      setIsCompleted(true);

      alert("Interview already completed");

      navigate("/applications");
    });

    socketRef.current.on("error_message", (data) => {
      alert(data.message || data);
    });

    return () => {
      socketRef.current.off("receive_message");

      socketRef.current.off("interview_completed");

      socketRef.current.off("error_message");

      socketRef.current.disconnect();
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
    if (!message.trim() || isCompleted) return;

    socketRef.current.emit("send_message", {
      interviewId: id,
      message,
    });

    setMessage("");
  };

  const handleCompleteInterview = async () => {
    try {
      await completeInterview(id);

      setIsCompleted(true);

      socketRef.current.disconnect();

      navigate("/applications");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  AI Interview
                </h1>

                <p className="text-gray-500 mt-1">
                  Answer questions and complete your interview
                </p>
              </div>

              <button
                onClick={handleCompleteInterview}
                disabled={isCompleted}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {isCompleted ? "Completed" : "Complete Interview"}
              </button>
            </div>

            <div className="border border-gray-200 rounded-2xl h-[500px] overflow-y-auto p-5 bg-gray-50 space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  No messages yet
                </p>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    sender={msg.sender}
                    message={msg.message}
                  />
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <input
                type="text"
                placeholder={
                  isCompleted ? "Interview completed" : "Enter message"
                }
                value={message}
                disabled={isCompleted}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

              <button
                onClick={sendMessage}
                disabled={isCompleted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Interview;
