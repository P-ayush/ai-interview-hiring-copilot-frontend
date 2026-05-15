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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Interview Review
            </h1>

            <p className="text-gray-500 mt-2">Review candidate performance</p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {interview && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {interview?.application?.candidate?.user?.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {interview?.application?.job?.title}
                  </p>
                </div>

                <div className="bg-black text-white px-5 py-3 rounded-xl font-semibold">
                  {interview.finalScore}
                  /100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Status</p>

                  <p className="font-semibold text-gray-800 capitalize mt-1">
                    {interview.status}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Final Score</p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {interview.finalScore}
                    /100
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="font-semibold text-gray-800 mb-2">AI Feedback</p>

                <p className="text-gray-600 leading-7">{interview.feedback}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Interview Conversation
            </h2>

            <div className="h-[500px] overflow-y-auto bg-gray-50 rounded-2xl p-5 space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                  No messages found
                </p>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    sender={message.sender}
                    message={message.message}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterInterview;
