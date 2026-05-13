function ChatMessage({ sender, message }) {
  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <strong>{sender}:</strong> {message}
    </div>
  );
}

export default ChatMessage;
